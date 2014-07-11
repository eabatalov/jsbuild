/*
 * Assign global options to all the modules and
 * push options specified in deps to all the modules
 * reachable by this options.
 * Use BFS.
 */
function fillModsOpts(rootModName, modRepo, globalBuildOpts) {
    var modVisited = {};
    var modQueue = [modRepo.getModule(rootModName)];

    while(modQueue.length !== 0)
        visit();

    function visit() {
        var mod = modQueue.shift();

        if (modVisited[mod.name]) {
            return;
        }
        modVisited[mod.name] = true;

        mod.addBuildOpts(globalBuildOpts);
        mod.buildDeps.forEach(function(dep) {
            var depMod = modRepo.getModule(dep.modName);
            depMod.addBuildOpts(dep.options);
            modQueue.push(depMod);
        });
    }
}

module.exports = fillModsOpts;
