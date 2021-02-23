const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const port = process.argv[2];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors())

var pathImg = "";

app.get('/', (req, res) => {
  res.send('ok')
})  

app.post('/data_client', (req, res) => {
  console.log('Entrante es: ', req.body)
  pathImg = req.body;
  res.status(200);
});

app.get('/info_client', (req, res) => {
  console.log(`PathImg es ${pathImg.img}.`);
  res.send(pathImg);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})