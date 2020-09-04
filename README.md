# readdirrec [![npm Package](https://img.shields.io/npm/v/readdirrec.svg)](https://www.npmjs.org/package/readdirrec)
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
await rdr(path[, options])
```


### path
**Type**: _String_


### options.files_only
**Type**: _Boolean_  
**Default**: `true`  
Find files only


### options.folders_only
**Type**: _Boolean_  
**Default**: `false`  
Find folders only


### options.recursive
**Type**: _Boolean_  
**Default**: `true`  
If `false` then `path` would be the only level for search


### options.relative
**Type**: _Boolean_   
**Default**: `false`  
Cut the `path` from the results


### options.filter
**Type**: _Function_ | _Object_  


## Usage
```javascript
const rdr = require('readdirrec');

// Cut root_dir part from path of each file/folder
await rdr(folder, { relative: true })

// Get folders only
await rdr(folder, { folders_only: true })

// Get both files ond folder
await rdr(folder, { files_only: false, folders_only: false })


// Different filters
await rdr(folder, { filter: file => /config\.js/.test(file) })
// => ['config.js']

await rdr(folder, { filter: { ext: '.js' } })
// => ['file1.js', 'file2.js']

await rdr(folder, { filter: { ext: ['.js', '.zip'] } })
// => ['file1.js', 'file2.js', 'archive.zip']
```



## Changelog 
#### v3.0.0 (2020-09-04):
- removed synchronous version
- removed `try/catch` wrapper, so now module throws all exceptions as it should be
- fixed a bunch of different bugs





## Related
More advanced modules:
* [glob](https://github.com/isaacs/node-glob)
* [globby](https://github.com/sindresorhus/globby)

