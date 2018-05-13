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

### readdirrec(path[, options])]

### path
Type: _String_


### options
#### dirs
Type: _Boolean_  
Default: `false`

#### files
Type: _Boolean_  
Default: `true`

#### recursive
Type: _Boolean_  
Default: `true`

#### map
Type: _Function_  

#### filter
Type: _Function_




## Usage
```javascript
const readdirRec = require('readdirrec');

let list = readdirRec(folder, { filter: item => /\.js$/.test(item) });
//=> ['file.js', 'file2.js']
```

## Related
More advanced modules:
* [glob](https://github.com/isaacs/node-glob)
* [globby](https://github.com/sindresorhus/globby)