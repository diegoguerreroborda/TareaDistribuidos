const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.get('/', (req, res) => {
  res.send('Hello World!')
})      

app.post('/myheaders', (req, res) => {
  var id = req.headers.id
  var name = req.headers.name
  console.log('ID:  '+ id + '  NAME:  ' + name)
  res.send('ID:  '+ id + '  NAME:  ' + name)
});

app.post('/mybody', (req, res) => {
  console.log(req.body)
  res.status(200).send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})