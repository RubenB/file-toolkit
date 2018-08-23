# file-toolkit
A toolkit to manipulate XML and JSON files

## How to use
You can run `ftk` or `file-toolkit` to execute the cli toolkit. 
```zsh
#install file-toolkit
npm intall -g file-toolkit

#minify a xml or json file 
ftk m example.xml
ftk m otherexample.json

#format a xml or json file
ftk f example.xml
ftk f otherexample.json

#parse a xml or json file
ftk p example.xml
ftk p otherexample.json
```

## Release steps
1. Update the version with `npm version [patch,minor,major]`
2. Publish the package with `npm publish`
3. Push develop to origin
4. Merge develop into master
