/*!
 * readdirrec, http://tpkn.me/
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const Lstat = util.promisify(fs.lstat);
const ReadDir = util.promisify(fs.readdir);

function escapeRegex(str) {
   return str.replace(/[.*+?^${}()]/g, '\\$&');
}

async function loop(root_dir, options = {}, cache = []){
   let { 
      files_only = true, 
      folders_only = false, 
      relative = false, 
      recursive = true,
      filter = {},
   } = options;

   if(folders_only){
      files_only = false;
   }


   /**
    * Directory listing
    */
   let listing = await ReadDir(root_dir);

   for(let i = 0, len = listing.length; i < len; i++){
      let item = path.join(root_dir, listing[i]);

      let stat = await Lstat(item);
      let is_dir = stat.isDirectory();
      if(is_dir){
         if(!files_only){
            cache.push(item);
         }
         if(recursive){
            await loop(item, { files_only, folders_only, relative, recursive, filter }, cache);
         }
      }else{
         if(!folders_only){
            cache.push(item);
         }
      }
   }

   
   /**
    * Modify results
    */
   // Filter using Array.filter()
   if(typeof filter === 'function'){
      cache = cache.filter(filter);
   }

   // Filter by extension
   if(typeof filter.ext !== 'undefined'){
      if(typeof filter.ext === 'string'){
         cache = cache.filter(item => new RegExp(escapeRegex(filter.ext) + '$', 'i').test(item));
      }

      if(Array.isArray(filter.ext)){
         cache = cache.filter(item => new RegExp('(' + escapeRegex(filter.ext.join('|')) + ')$', 'i').test(item));
      }
   }

   // Make relative path
   if(relative){
      cache = cache.map(item => item.replace(root_dir, ''));
   }


   return cache;
}

module.exports = async (root_dir, options = {}) => {
   return await loop(root_dir, options);
}
