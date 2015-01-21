var assert = require('./assert');
var path = require('path');

function ModuleDependency(modName) {
    this.modName = modName;
    this.options = {};
}

ModuleDependency.prototype.addOpts = function(depModOpts) {
    depModOpts.forEach(function(depModOpt) {
        this.options[depModOpt] = true;
    }, this);
};

function Module(name, allSrc, allDeps, dirAbsPath, description, outDirPath, outFileName) {
    assert(name, "module name is defined");
    assert(allSrc, "module " + name + " sources are defined");

    this.dirAbsPath = dirAbsPath;
    this.name = name;
    this.description = description || "";
    this.outDirPath = outDirPath ? path.resolve(dirAbsPath, outDirPath) : undefined;
    this.outFileName = outFileName || undefined;

    this.allSrc = srcPathPrepare(this.dirAbsPath, allSrc);
    this.allDeps = createAllDeps(allDeps);
    this.buildSrc = [];
    this.buildDeps = [];
    this.buildOptions = {};

    this.addBuildOpts({ 'base' : true });

    function srcPathPrepare(baseDir, relSrc) {
        var path = require('path');
        var glob = require('glob');

        var prepOptSrcPaths = {};
        Object.keys(relSrc).forEach(function(optName) {
            var optRelSrc = relSrc[optName];


            //Rel paths to abs paths
            var optAbsSrcPaths = optRelSrc.map(function(relSrcPath) {
                return path.join(baseDir, relSrcPath);
            });
            //Expand glob patterns
            optAbsSrcPathsUnGlobbed = [];
            for (var i = 0; i < optAbsSrcPaths.length; ++i) {
                var unGlobbedPathEntries = glob.sync(optAbsSrcPaths[i]);
                for (var j = 0; j < unGlobbedPathEntries.length; ++j) {
                    optAbsSrcPathsUnGlobbed.push(unGlobbedPathEntries[j]);
                }
            }
            //Put to result
            prepOptSrcPaths[optName] = optAbsSrcPathsUnGlobbed;
        });

        return prepOptSrcPaths;
    }

    function createAllDeps(allDepsJSON) {
        var allDeps = {};
        Object.keys(allDepsJSON).forEach(function(optName) {
            allDeps[optName] = {};

            Object.keys(allDepsJSON[optName]).forEach(function(depModName) {
                var dep = new ModuleDependency(depModName);
                dep.addOpts(allDepsJSON[optName][depModName]);
                allDeps[optName][depModName] = dep;
            });

        });
        return allDeps;
    }
}

Module.prototype.addBuildOpts = function(optNames) {
    Object.keys(optNames).forEach(function(optName) {
        if (this.buildOptions[optName])
            return;
        this.buildOptions[optName] = true;

        if (this.allSrc[optName]) {
            Array.prototype.push.apply(
                this.buildSrc,
                this.allSrc[optName]
            );
        }

        if (this.allDeps[optName]) {
            Object.keys(this.allDeps[optName]).forEach(function(depModName) {
                var dep = this.allDeps[optName][depModName];
                this.buildDeps.push(dep);
            }, this);
        }

    }, this);
};

Module.fromJSON = function(modJSON, modDirAbsPath) {
    var mod = new Module(
        modJSON.name,
        modJSON.src,
        modJSON.dependencies,
        modDirAbsPath,
        modJSON.description,
        modJSON.outDir,
        modJSON.outFile
    );

    return mod;
};

module.exports = Module;
