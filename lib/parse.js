const Parser = require('xml2js').Parser;
const Builder = require('xml2js').Builder;
const parser = new Parser();
const builder = new Builder();

const {extname} = require('path');

module.exports = function(file, data) {
    const extension = extname(file);
    return new Promise((resolve, reject) => {
        switch (extension) {
            case '.xml': 
                return resolve(xmlToJson(data));
            case '.json':
                return resolve(jsonToXML(data));
            default:   
                return reject(new Error('This file type is not supported'));
        }
    });
}

function xmlToJson(data) {
    return new Promise((resolve, reject) => {
        if (!data) return reject(new Error('No xml data to parse'));
        parser.parseString(data, function (parseErr, parseData) {
            if (parseErr) return reject(parseErr);
            if (!parseData) return reject(new Error('Failed to retrieve parsed json data'));
            return resolve(JSON.stringify(parseData));
        });
    });
}

function jsonToXML(data) {
    return new Promise((resolve, reject) => {
        if (!data) return reject(new Error('No json data to parse'));
        let xml = builder.buildObject(JSON.parse(data));
        if (!xml) return reject(new Error('Failed to retrieve parsed xml data'));
        resolve(xml)
    });
}