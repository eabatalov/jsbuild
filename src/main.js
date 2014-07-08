var buildConfig = {
    moduleLookuFilePaths : null,
    jsBuildFilePath : null
};

//Simple list of strings
var globalBuildOptions = [];

(function() {
    var program = require('commander');

    var collectList = function(val, memo) { memo.push(val); return memo; };

    program
        .version('0.0.1')
        .usage('[options] <mlookup> <jsbuild file>')
        .option('-m, --mlookup <value>',
            'Module lookup (module.json) file to use (>1 can be used)', collectList, [])
        .option('-o, --option <value>',
            'Each option will be passed to each module compilation', collectList, [])
        .parse(process.argv);

    globalBuildOptions = program.option;
    buildConfig.jsBuildFilePath = program.args[0];
    buildConfig.moduleLookuFilePaths = program.mlookup;

    console.log('Working with settings:');
    console.log('global options: %j', globalBuildOptions);
    console.log('buildConfig: %j', buildConfig);
})();
