function saveNPMFile(modName, modRepo) {
    var fs = require('fs');
    var path = require('path');
    var mod = modRepo.getModule(modName);

    var packageObj = {
        'name': mod.name,
        'description': mod.description || 'no description',
        'devDependencies': {
            'grunt': 'latest',
            'grunt-contrib-concat': 'latest',
            'grunt-contrib-uglify': 'latest'
        },
        'repository': {
            'type': 'file',
            'url': 'file://' + mod.dirAbsPath
        },
        //This package file is only for usage in module development
        'private': true
    };
    var packageObjJSON = JSON.stringify(packageObj, null, '    ');
    var packageFilePath = path.join(mod.dirAbsPath, path.sep, 'package.json');
    fs.writeFileSync(packageFilePath, packageObjJSON);

    //console.log('Module ', mod.name, ' npm package file:');
    //console.log(packageObjJSON);
}
