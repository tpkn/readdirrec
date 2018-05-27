/*!
 * readdirrec, http://tpkn.me/
 */

const fs = require('fs');
const path = require('path');

function readdirRec(folder, options = {}, cb){
   let list = [];

   let dirs = typeof options.dirs === 'undefined' ? false : options.dirs;
   let files = typeof options.files === 'undefined' ? true : options.files;
   let recursive = typeof options.recursive === 'undefined' ? true : options.recursive;
   
   let map = typeof options.map !== 'function' ? null : options.map;
   let filter = typeof options.filter !== 'function' ? null : options.filter;
   let filter_ext = typeof options.filter !== 'string' ? null : options.filter;


   function loop(dir){
      try {
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
      } catch(err) {
         console.log(err);
      }
   }

   loop(folder);


   if(filter_ext){
      list = list.filter(item => new RegExp('\\.' + filter_ext + '$', 'i').test(item));
   }

   if(filter){
      list = list.filter(filter);
   }

   if(map){
      list = list.map(map);
   }

   if(typeof cb === 'function'){
   	cb(list);
   }else{
   	return list;
   }
}


module.exports = readdirRec;
module.exports.async = (folder, options = {}) => {
	return new Promise((resolve, reject) => {
		readdirRec(folder, options, resolve);
	})
};
