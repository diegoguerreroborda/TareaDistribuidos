const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/list', (req, res) => {
  res.send('Diego, Guerrero, Borda, Lalala')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).send("ok")
})