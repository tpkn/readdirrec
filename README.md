# readdirrec   
Module for deep directory listing  

Straightforward deep directory listing without async stuff, regular expressions and rest of bells and whistles. 
- Choose if it should be just files, or folders, or both in the results list
- Apply native `map` and `filter` methods to the results
- Turn off recursion if needed



## Installation
```bash
npm install readdirrec
```


## API

### readdirRec(path[, options])

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


### options.map
**Type**: _Function_   


### options.filter
**Type**: _Function_ | _String_  
String argument interprets as a filter by extension    
```javascript
readdirRec(folder, { filter: 'js' });
// => ['file.js', 'file2.js']

readdirRec(folder, { filter: '(js|zip)' });
// => ['file.js', 'file2.js', 'archive1.zip']
```



## Usage
```javascript
const readdirRec = require('readdirrec');

let list = readdirRec(folder, { filter: item => /\.js$/.test(item) });
// => ['file.js', 'file2.js']
```

Async version:    
```javascript
readdirRec.async(folder).then(list => {
	// => ['file.js', 'file2.js']
})
```

## Related
More advanced modules:
* [glob](https://github.com/isaacs/node-glob)
* [globby](https://github.com/sindresorhus/globby)