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
    assert(name);
    assert(allSrc)

    this.dirAbsPath = dirAbsPath;
    this.name = name;
    this.description = description || "";
    this.outDirPath = outDirPath ? path.resolve(dirAbsPath, outDirPath) : undefined;
    this.outFileName = outFileName || undefined;

    this.allSrc = srcAbsPaths(this.dirAbsPath, allSrc);
    this.allDeps = createAllDeps(allDeps);
    this.buildSrc = [];
    this.buildDeps = [];
    this.buildOptions = {};

    this.addBuildOpts({ 'base' : true });

    function srcAbsPaths(baseDir, relSrc) {
        var path = require('path');

        var absSrc = {};
        Object.keys(relSrc).forEach(function(optName) {
            var optRelSrc = relSrc[optName];
            absSrc[optName] = optRelSrc.map(function(relSrcPath) {
                return path.join(baseDir, relSrcPath);
            });
        });

        return absSrc;
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
