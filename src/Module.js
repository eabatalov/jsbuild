/*
 * @module: Module object
 * @options: {String}
 */
function ModuleDependency(modName) {
    this.modName = modName;
    this.options = {};
}

ModuleDependency.prototype.addOpts = function(depModOpts) {
    depModOpts.forEach(function(depModOp) {
        this.options[depModOp] = true;
    }, this);
};

function Module(name, allSrc, dirAbsPath, description) {
    assert(name);
    assert(allSrc)

    this.dirAbsPath = dirAbsPath;
    this.name = name;
    this.description = description || "";


    this.allSrc = srcAbsPaths(this.dirAbsPath, allSrc);
    this.buildSrc = [];

    this.dependencies = {};
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
}

Module.prototype.addDep = function(depModName, depModOpts) {
    if (!this.dependencies[depModName])
        this.dependencies[depModName] = new ModuleDependency(depModName);
    this.dependencies[depModName].addOpts(depModOpts);
};

Module.prototype.addBuildOpts = function(optNames) {
    Object.keys(optNames).forEach(function(optName) {
        this.buildOptions[optName] = true;
        Array.prototype.push.apply(
            this.buildSrc,
            this.allSrc[optName]
        );
    }, this);
};

Module.fromJSON = function(modJSON, modDirAbsPath) {
    var mod = new Module(
        modJSON.name,
        modJSON.src,
        modDirAbsPath,
        modJSON.description
    );

    Object.keys(modJSON.dependencies).forEach(function(depModName) {
        var depModOpts = modJSON.dependencies[depModName];
        mod.addDep(depModName, depModOpts);
    });

    return mod;
};
