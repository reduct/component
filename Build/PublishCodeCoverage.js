var glob = require('glob');
var fs = require('fs');
var exec = require('child_process').exec;

glob('coverage/**/lcov.info', function (er, files) {
    moveFile(files[0], 'lcov.info');
});

function moveFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, function read(err) {
        if (err) {
            throw err;
        }

        publishToCodeClimate(newPath);
    });
}

function publishToCodeClimate(filePath) {
    exec('cat ' + filePath + ' | codeclimate', function (err, stdout) {
        if (err) {
          throw err;
        }

        console.log(stdout);
    });
}