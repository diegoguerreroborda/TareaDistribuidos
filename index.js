const express = require('express')
const bodyParser = require('body-parser');
const app = express()
//const cors = require('cors')
const Fs = require('fs')
var Jimp = require('jimp');
const port = process.argv[2];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
//app.use(cors())

let pathImg = "";
let textList = ['La que puede, puede y la que no, critica1', 'La que puede, puede y la que no, critica2', 'La que puede, puede y la que no, critica3'];
let countText = 0;

function chooseText(){
  if(countText < textList.length-1){
    countText++;
  }else{
    countText = 0;
  }
}

function randomText(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function base64_decode(base64str, file) {
  var bitmap = new Buffer(base64str, 'base64');
  Fs.writeFileSync(file, bitmap);
  console.log('Image convertida con exito');
}

function base64_encode(file) {
  var bitmap = Fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

function edit_image(file) {
  var fileName = file;
  var loadedImage;
  let text = textList[randomText(0,textList.length)];
  let imageWidth = 0;
  let imageHeight = 0; 
  
  Jimp.read(fileName)
  .then(function (image) {
      loadedImage = image;
      imageWidth = loadedImage.getWidth();
      imageHeight = loadedImage.getHeight();
      return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  })
.then(function (font) {
      loadedImage.print(font, 0, -70, {text: text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM},
          imageWidth,
          imageHeight)
          .write('copy_image.png');
      })
          .catch(function (err) {
              console.error(err);
          });
}

app.get('/', (req, res) => {
  res.send('ok')
})  

app.post('/data_img', (req, res) => {
  //console.log('Entrante es: ', req.body.img)
  base64_decode(req.body.img, 'holas.png')
  edit_image("holas.png")
  pathImg = req.body;
  res.status(200);
});

app.get('/info_img', (req, res) => {
  pathImg.img = base64_encode('copy_image.png');
  //console.log(`PathImg es ${pathImg.img}.`);
  res.send(pathImg);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})