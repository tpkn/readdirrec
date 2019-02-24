/*!
 * readdirrec, http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

function escapeRegex(str) {
   return str.replace(/[.*+?^${}()]/g, '\\$&');
}

async function ReadDirRec(folder, options = {}){
   async function loopThrough(dir, results = []){
      try {
         let content = await readdir(dir);

         for(let i = 0, len = content.length; i < len; i++){
            let file = path.join(dir, content[i]);

            let stat = await lstat(file);
            if(stat.isDirectory()){
               if(folders){
                  results.push(file);
               }
               if(recursive){
                  await loopThrough(file, results);
               }
            }else{
               if(files){
                  results.push(file);
               }
            }
         }

      }catch(err){
         console.log(err);
      }

      return results;
   }


   /**
    * Options
    */
   let { 
      folders = false, 
      files = true, 
      recursive = true, 
      relative = false, 
      filter 
   } = options;
   
   
   let results = await loopThrough(folder);


   // Filter using Array.filter()
   if(typeof filter === 'function'){
      results = results.filter(filter);
   }

   // Filter by extension
   if(typeof filter === 'object' && typeof filter.ext !== 'undefined'){
      if(Array.isArray(filter.ext)){
         results = results.filter(item => new RegExp('(' + escapeRegex(filter.ext.join('|')) + ')$', 'i').test(item));
      }

      if(typeof filter.ext === 'string'){
         results = results.filter(item => new RegExp(escapeRegex(filter.ext) + '$', 'i').test(item));
      }
   }

   // Make relative path
   if(relative){
      results = results.map(item => item.replace(folder, ''));
   }

   return results;
}

function ReadDirRecSync(folder, options = {}){
   function loopThrough(dir, results = []){
      try {
         if(fs.existsSync(dir)){
            let content = fs.readdirSync(dir);

            for(let i = 0, len = content.length; i < len; i++){
               let file = path.join(dir, content[i]);

               if(fs.lstatSync(file).isDirectory()){
                  if(folders){
                     results.push(file);
                  }
                  if(recursive){
                     loopThrough(file, results);
                  }
               }else{
                  if(files){
                     results.push(file);
                  }
               }
            }
         }
      }catch(err){
         console.log(err);
      }

      return results;
   }


   /**
    * Options
    */
   let { 
      folders = false, 
      files = true, 
      recursive = true, 
      relative = false, 
      filter 
   } = options;
   
   
   let results = loopThrough(folder);


   // Filter using Array.filter()
   if(typeof filter === 'function'){
      results = results.filter(filter);
   }

   // Filter by extension
   if(typeof filter === 'object' && typeof filter.ext !== 'undefined'){
      if(Array.isArray(filter.ext)){
         results = results.filter(item => new RegExp('(' + escapeRegex(filter.ext.join('|')) + ')$', 'i').test(item));
      }

      if(typeof filter.ext === 'string'){
         results = results.filter(item => new RegExp(escapeRegex(filter.ext) + '$', 'i').test(item));
      }
   }

   // Make relative path
   if(relative){
      results = results.map(item => item.replace(folder, ''));
   }

   return results;
}

module.exports = ReadDirRec;
module.exports.sync = ReadDirRecSync;
