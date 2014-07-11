function saveGruntfile(modName, modRepo, modTopSort) {
    var fs = require('fs');
    var path = require('path');
    var mod = modRepo.getModule(modName);

    var gruntFilePath = path.join(mod.dirAbsPath, path.sep, 'Gruntfile.js');
    var gruntFileTemplatePath = path.join(__dirname, 'gruntfile_template.txt');
    var gruntFileContent = fs.readFileSync(gruntFileTemplatePath, 'utf8');

    var srcListJSON = JSON.stringify(genSrcList(), null, '    ');
    gruntFileContent =
        gruntFileContent.replace('<SRC_FILES_PLACEHOLDER>', '\n' + srcListJSON);

    gruntFileContent =
        gruntFileContent.replace('<OUT_FILE_NAME_PLACEHOLDER>', JSON.stringify(mod.outFileName));

    gruntFileContent =
        gruntFileContent.replace('<OUT_DIR_PATH_PLACEHOLDER>', JSON.stringify(mod.outDirPath));

    fs.writeFileSync(gruntFilePath, gruntFileContent);

    //console.log('Generated Gruntfile for module', mod.name);
    //console.log(gruntFileContent);

    function genSrcList() {
        var srcList = [];
        modTopSort.forEach(function(depMod) {
            Array.prototype.push.apply(srcList, depMod.buildSrc);
        });
        return srcList;
    }
}

module.exports = saveGruntfile;
