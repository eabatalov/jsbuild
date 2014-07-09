var buildConfig = {
    moduleLookupFilePaths : [],
    moduleToBuildName : null
};

//Simple list of strings
var globalBuildOptions = {};

var modRepo = null;

var modTopSort = [];

function parseArgs() {
    var program = require('commander');

    var collectList = function(val, list) { list.push(val); return list; };
    var collectSet = function(val, set) { set[val] = true; return set; };

    program
        .version('0.0.1')
        .usage('[options] <mlookup> <module to build name>')
        .option('-m, --mlookup <value>',
            'module lookup (module.json) file to use (>1 can be used)', collectList, [])
        .option('-o, --option [value]',
            'specifies global compilation option', collectSet, {})
        .parse(process.argv);

    globalBuildOptions = program.option;
    buildConfig.moduleToBuildName = program.args[0];
    buildConfig.moduleLookupFilePaths = program.mlookup;

    if (!buildConfig.moduleToBuildName || !buildConfig.moduleLookupFilePaths.length) {
        console.log(program.usage());
        console.log(program.help());
        throw new Error("Invalid arguments");
    }

    console.log('Working with settings:');
    console.log('global options: %j', globalBuildOptions);
    console.log('buildConfig: \n', JSON.stringify(buildConfig, null, '    '));
}

function createModuleRepo() {
    modRepo = new ModuleRepo();
    modRepo.procModuleLookupFiles(buildConfig.moduleLookupFilePaths);

    //console.log('Modules repo:');
    //console.log(JSON.stringify(modRepo, null, '   '));
}

function createTopSortModules() {
    modTopSort = topSortModules(buildConfig.moduleToBuildName, modRepo);

    //console.log('Modules top sort:');
    //console.log(JSON.stringify(modTopSort, null, '   '));
}

function main() {
    try {
        parseArgs();
        createModuleRepo();
        fillModsOpts(buildConfig.moduleToBuildName, modRepo, globalBuildOptions);
        createTopSortModules();
        saveNPMFile(buildConfig.moduleToBuildName, modRepo);
        saveGruntfile(buildConfig.moduleToBuildName, modRepo, modTopSort);

        console.log('Generation is successful!');
    } catch(error) {
        console.log(error);
        console.log(error.stack);
    }
}

main();
