const {writeFile} = require('fs');

module.exports = function(file, writeData) {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error('File required')); 
        if (!writeData) return reject(new Error('WriteData required')); 
        writeFile(file, writeData, (writeErr) => {
            if (writeErr) return reject(writeErr);
            return resolve();
        });
    });
}