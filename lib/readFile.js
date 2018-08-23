const {readFile} = require('fs');

module.exports = function(file, encoding) {
    return new Promise((resolve, reject) => {
        readFile(file, encoding, (readErr, readData) => {
            if (readErr) return reject(readErr); 
            if (!readData) return reject(new Error('No data to read'));
            return resolve(readData);
        });
    });
}