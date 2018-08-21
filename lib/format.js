const pd = require('pretty-data').pd;
const {extname} = require('path');

module.exports = function(file, data) {
    const extension = extname(file);
    return new Promise((resolve, reject) => {
        switch (extension) {
            case '.xml': 
                return resolve(pd.xml(data));
            case '.json':
                return resolve(pd.json(data));
            default:
                return reject(new Error('This file type is not supported'));
        }
    });
}