const fs = require('fs');
const path = require('path');
const glob = require("glob")

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (path) => {
        return fs.existsSync(path);
    },
    fileExists: (path) => {
        try {
            return fs.lstatSync(path).isFile();
        } catch (e) {
            return false;
        }
    },
    readFileContent: (path) => {
        return fs.readFileSync(path, "utf8")
    },
    getFilePath: (directoryPath, filePath) => {
        return directoryPath.replace(/\/$/, '') + '/' + filePath;
    },
    getFileName: (filePath) => {
        return filePath.replace(/^.*[\\\/]/, '');
    },
    checkFileExtension: (filePath, extension) => {
        return filePath.match('\.' + extension + '$');
    },
    countNumberOfLines: (fileContent) => {
        return fileContent.split("\n").length;
    }
};