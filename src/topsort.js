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
        Object.keys(mod.dependencies).forEach(function(depModName) {
            visit(depModName);
        });
        modSorted[modName] = true;
        topSort.push(mod);
    }

    function validateTopOrder() {
        //Very straightforward
        for(var i = 0; i < topSort.length; ++i) {
            var validatedMod = topSort[i];
            Object.keys(validatedMod.dependencies).forEach(function(depModName) {
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
