function saveGruntfile(modName, modRepo, modTopSort) {
    var fs = require('fs');
    var path = require('path');
    var mod = modRepo.getModule(modName);

    var gruntFilePath = path.join(mod.dirAbsPath, path.sep, 'Gruntfile.js');
    var gruntFileContent = fs.readFileSync('src/gruntfile_template.txt', 'utf8');
    var srcListJSON = JSON.stringify(genSrcList(), null, '    ');
    gruntFileContent =
        gruntFileContent.replace('<SRC_FILES_PLACEHOLDER>', '\n' + srcListJSON);
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
