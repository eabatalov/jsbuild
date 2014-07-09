/*
 * @module: Module object
 * @options: [String]
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

function Module(name, src) {
    assert(name);
    assert(src)

    this.name = name;
    this.src = src;
    this.dependencies = {};
    this.buildOptions = {};
}

Module.prototype.addDep = function(depModName, depModOpts) {
    if (!this.dependencies[depModName])
        this.dependencies[depModName] = new ModuleDependency(depModName);
    this.dependencies[depModName].addOpts(depModOpts);
};

Module.prototype.addBuildOpts = function(optNames) {
    for (var optName in optNames) {
        this.buildOptions[optName] = true;
    }
};

Module.fromJSON = function(modJSON) {
    var mod = new Module(modJSON.module.name, modJSON.module.src);

    Object.keys(modJSON.module.dependencies).forEach(function(depModName) {
        var depModOpts = modJSON.module.dependencies[depModName];
        mod.addDep(depModName, depModOpts);
    });

    return mod;
};
