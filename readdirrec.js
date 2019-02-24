/*!
 * readdirrec, http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');

function escapeRegex(str) {
   return str.replace(/[.*+?^${}()]/g, '\\$&');
}

function ReadDirRec(folder, options = {}){
   function loop(dir){
      try {
         if(fs.existsSync(dir)){
            let content = fs.readdirSync(dir);

            for(let i = 0, len = content.length; i < len; i++){
               let file = path.join(dir, content[i]);

               if(fs.lstatSync(file).isDirectory()){
                  if(dirs){
                     results.push(file);
                  }
                  if(recursive){
                     loop(file);
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
   }


   /**
    * Options
    */
   let results = [];
   let { 
      dirs = false, 
      files = true, 
      recursive = true, 
      relative = false, 
      filter 
   } = options;
   
   
   loop(folder);


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
