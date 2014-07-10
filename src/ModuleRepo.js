/*
 * Module name => Module
 */
function ModuleRepo() {
    this.modules = {};
}

ModuleRepo.prototype.procModuleLookupFiles = function(moduleLookupFilePaths) {
    var fs = require('fs');
    var path = require('path');

    moduleLookupFilePaths.forEach(function(moduleLookupFilePath) {
        var modLookupFileDir = path.dirname(moduleLookupFilePath);
        var modLookupStr = fs.readFileSync(moduleLookupFilePath, "utf8");
        var modLookup = JSON.parse(modLookupStr);

        Object.keys(modLookup).forEach(function(modName) {
            var modRelPath = modLookup[modName];
            modDirAbsPath = path.resolve(modLookupFileDir, modRelPath);
            this.addModule(modName, modDirAbsPath);
        }, this);

    }, this);
};

ModuleRepo.prototype.addModule = function(modName, modDirAbsPath) {
    var fs = require('fs');
    var path = require('path');

    var modDefFilePath = path.join(modDirAbsPath, path.sep, MODULE_DEFINITION_FILE_NAME);
    var modJSON = jsonParseSafe(fs.readFileSync(modDefFilePath, "utf8"));
    if (modJSON.err) {
        console.error('Malformed ', MODULE_DEFINITION_FILE_NAME, ' file of module',
            modName);
        throw modJSON.err;
    }
    var mod = Module.fromJSON(modJSON.data.module, modDirAbsPath);

    assert(modName === mod.name);
    this.modules[modName] = mod;
};

ModuleRepo.prototype.getModule = function(modName) {
    var mod = this.modules[modName];
    assert(mod, modName);
    return mod;
};
