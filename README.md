# readdirrec   
Module for deep directory listing  

Straightforward deep directory listing without async stuff, regular expressions and rest of bells and whistles. 
- Choose if it should be just files, or folders, or both
- Turn off recursion if needed
- Return results with relative path


## Installation
```bash
npm install readdirrec
```


## API

```javascript
ReadDirRec(path[, options])
```


### path
**Type**: _String_


### options.dirs
**Type**: _Boolean_  
**Default**: `false`  
Include folders in results list


### options.files
**Type**: _Boolean_  
**Default**: `true`  
Include files in results list


### options.recursive
**Type**: _Boolean_  
**Default**: `true`  
If `false` then `path` would be the only level for search


### options.relative
**Type**: _Boolean_   
**Default**: `false`  
Cut the input folder path from the results path


### options.filter
**Type**: _Function_ | _Object_  


## Usage
```javascript
const ReadDirRec = require('readdirrec');

ReadDirRec(folder, { filter: file => /config\.js/.test(file) });
// => ['config.js']

ReadDirRec(folder, { filter: { ext: '.js' } });
// => ['file1.js', 'file2.js']

ReadDirRec(folder, { filter: { ext: ['.js', '.zip'] } });
// => ['file1.js', 'file2.js', 'archive.zip']
```


## Related
More advanced modules:
* [glob](https://github.com/isaacs/node-glob)
* [globby](https://github.com/sindresorhus/globby)

