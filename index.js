const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const port = process.argv[2];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors())

var dataClient = "";

app.get('/', (req, res) => {
  res.send('ok')
})  

app.post('/data_client', (req, res) => {
  console.log(`Entrante es ${req.body}.`)
  dataClient = req.body;
  res.status(200);
});

app.get('/info_client', (req, res) => {
  console.log(`Dataclient es ${dataClient.img}.`);
  res.send(dataClient);
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})