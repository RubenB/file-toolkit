const {readFile} = require('fs');

module.exports = function(file) {
    return new Promise((resolve, reject) => {
        readFile(file, 'utf8', (readErr, readData) => {
            if (readErr) return reject(readErr); 
            if (!readData) return reject(new Error('No data to read'));
            return resolve(readData);
        });
    });
}