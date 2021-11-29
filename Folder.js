const fs = require("fs")
const path = require("path")
const pFs = fs.promises

const readdir = async (folder)=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(folder, (err, files) => {
            if(err) return reject(err)
            resolve(files)
        })
    })
}
const rmdir = async folder => {
    return new Promise((resolve, reject)=>{
        fs.rmdir(folder, err => {
            if(err) return reject(err)
            resolve()
        })
    })

}
const Folder = {
    async read(folder, delegate){
        delegate = delegate || async function(filePath){return filePath}
        let files = await readdir(folder)
        let justFiles = []
        let upper = files.length
        for(let i = 0; i < upper; i++){
            let f = path.join(folder, files[i])
            let handle = null
            let stat = null
            try{
              handle = await pFs.open(f, "r")
              stat = await handle.stat()
            }catch(e){
              console.error(e)
            } finally {
              if(handle) handle.close()
            }
            if(stat && stat.isDirectory()){
              justFiles = justFiles.concat(await Folder.read(f))
            } else {
              justFiles.push(await delegate(f))
            }
        }
        return justFiles
    },
    async delete(folderPathName){
        let files = await this.read(folderPathName)
        let upper = files.length
        for(let i = 0; i < upper; i++){
            await File.unlink(files[i])
        }
        let folders = await readdir(folderPathName)
        let foldersMax = folders.length
        for(let i = 0; i < foldersMax; i++){
            try{
                await rmdir(`${folderPathName}/${folders[i]}`)
            }catch(e){console.log(e)}
        }
    },
    async create(folder){
        return new Promise((resolve, reject)=>{
            fs.mkdir(folder, (err)=>{
                if(err) return reject(err)
                resolve(folder)
            })
        })
    }
}

module.exports = Folder