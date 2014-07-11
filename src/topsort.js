//From modules with no deps to modules with many deps
function topSortModules(rootModName, modRepo) {

    var modVisited = {};
    var modSorted = {};
    var topSort = [];

    function visit(modName) {
        if (modVisited[modName])
            return;
        modVisited[modName] = true;

        var mod = modRepo.getModule(modName);
        mod.buildDeps.forEach(function(dep) {
            visit(dep.modName);
        });
        modSorted[modName] = true;
        topSort.push(mod);
    }

    function validateTopOrder() {
        //Very straightforward
        for(var i = 0; i < topSort.length; ++i) {
            var validatedMod = topSort[i];
            validatedMod.buildDeps.forEach(function(dep) {
                var depModName = dep.modName;
                for(var j = i + 1; j < topSort.length; ++j) {
                    if (depModName === topSort[j].name) {
                        throw new Error('Cyclic dependence between '
                            + depModName + ' and ' + validatedMod.name
                            + ' detected');
                    }
                } 
            });
        }
    }

    visit(rootModName);
    validateTopOrder();
    return topSort;
}

module.exports = topSortModules;
