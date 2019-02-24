# readdirrec   
Module for deep directory listing  

- Choose if it should be just files, or folders, or both
- Turn off recursion if needed
- Return results with relative path
- Use it both synchronous or asynchronous version


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


### options.folders
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

await ReadDirRec(folder, { filter: file => /config\.js/.test(file) })
// => ['config.js']

await ReadDirRec(folder, { filter: { ext: '.js' } })
// => ['file1.js', 'file2.js']

await ReadDirRec(folder, { filter: { ext: ['.js', '.zip'] } })
// => ['file1.js', 'file2.js', 'archive.zip']


// Synchronous version
ReadDirRec.sync(folder, {})
// => [ ... ]
```


## Related
More advanced modules:
* [glob](https://github.com/isaacs/node-glob)
* [globby](https://github.com/sindresorhus/globby)

