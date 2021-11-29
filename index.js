const createCollage = require("photo-collage")
const Folder = require("./Folder.js")
const fs = require("fs")
const folderFullOfPhotos = process.env.PHOTOS_PATH || process.argv.pop() || null
const fileName = process.argv.pop() || 'myCollage'
const Fs = fs.promises
const readFile = async filePath => {
  if(filePath.indexOf(".DS_Store") > -1) return null;
  let data = null;
  try{
    data = await Fs.readFile(filePath);
  }catch(e){}
  return data;
};

if(folderFullOfPhotos === null) throw new Error("Try starting it like PHOTOS_PATH=/Users/you/path node index.js")
async function main(){
  let files = await Folder.read(folderFullOfPhotos, readFile);
  files = files.filter(f => f !== null && f.indexOf(".DS_Store") == -1);
  const options = {
    sources: files,
    imageType: "png",
    width: 6, // number of images per row
    height: 3, // number of images per column
    imageWidth: 100, // width of each image
    imageHeight: 100, // height of each image
    // backgroundColor: "#cccccc", // optional, defaults to #eeeeee.
    spacing: 5, // optional: pixels between each image
    // lines: [
    //   {font: "", color: "", text: "Sometimes we want to find out when a single one time event has"},
    //   {font: "", color: "", text: "Sometimes we want to find out when a single one time event has"},
    //   {font: "", color: "", text: "Sometimes we want to find out when a single one time event has"},
    //   {font: "", color: "", text: "Sometimes we want to find out when a single one time event has"},
    //   {font: "", color: "", text: "Sometimes we want to find out when a single one time event has"},
    // ],
    //textStyle: {color: "#fff", fontSize: 20, font: "Arial", height: 300},
    //text: "Sometimes we want to find out when a single one time event has finished. For example - a stream is done. For this we can use new Promise. Note that this option should be considered only if automatic conversion isn't possible.Note that promises model a single value through time, they only resolve once - so while they're a good fit for a single event, they are not recommended for multiple event APIs."
    // we can use either lines or text (text will be warped)
  }
  let canvas = null
  try{
    canvas = await createCollage(options)
    const src = canvas.jpegStream()
    const dest = fs.createWriteStream(`${fileName}.${options.imageType}`)
    src.pipe(dest)
  } catch(e) {
      console.error(e)
  }
}

main()

