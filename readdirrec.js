/*!
 * readdirrec (v2.0.0.20180422), http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');

function readdirrec(folder, options = {}){
   let list = [];

   let dirs = typeof options.dirs === 'undefined' ? false : options.dirs;
   let files = typeof options.files === 'undefined' ? true : options.files;
   let recursive = typeof options.recursive === 'undefined' ? true : options.recursive;
   
   let map = typeof options.map !== 'function' ? null : options.map;
   let filter = typeof options.filter !== 'function' ? null : options.filter;


   function loop(dir){
      if(fs.existsSync(dir)){
         let content = fs.readdirSync(dir);

         for(let i = 0, len = content.length; i < len; i++){
            let file = path.join(dir, content[i]);

            if(fs.lstatSync(file).isDirectory()){
               if(dirs){
                  list.push(file);
               }
               if(recursive){
                  loop(file);
               }
            }else{
               if(files){
                  list.push(file);
               }
            }
         }
      }
   }

   loop(folder);


   if(filter){
      list = list.filter(filter);
   }

   if(map){
      list = list.map(map);
   }

   return list;
}

module.exports = readdirrec;
