function fillModsOpts(rootModName, modRepo, globalBuildOpts) {
    var modVisited = {};

    function visit(modName) {
        if (modVisited[modName])
            return;
        modVisited[modName] = true;

        var mod = modRepo.getModule(modName);
        mod.addBuildOpts(globalBuildOpts);
        Object.keys(mod.dependencies).forEach(function(depModName) {
            var dep = mod.dependencies[depModName];
            var depMod = modRepo.getModule(depModName);
            depMod.addBuildOpts(dep.options);
            visit(depMod.name);
        });
    }

    visit(rootModName);
}

module.exports = fillModsOpts;
