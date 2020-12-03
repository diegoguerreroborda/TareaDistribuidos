const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors())

var dataClient = "";

app.get('/', (req, res) => {
  res.send('ok Server')
})      

app.post('/myheaders', (req, res) => {
  var id = req.headers.id
  var name = req.headers.name
  console.log('ID:  '+ id + '  NAME:  ' + name)
  res.send('ID:  '+ id + '  NAME:  ' + name)
});

app.post('/data_client', (req, res) => {
  console.log(req.body)
  dataClient = req.body
  //console.log('Nombre:  '+ name + '  Apellidos:  ' + surname)
});

app.get('/client_info', (req, res) => {
  console.log("Is dataClient " + dataClient)
  res.send(dataClient)
})

app.get('/first_service', (req, res) => {
  res.status(200).json({"list" : [{ username: 'Flavio'}, 
                                  {username : 'Diego', age: 32}, 
                                  {username : 'Jason', age : 12 }],
                      "numberList": 3,
                      "Hola" : "Mundo"
  })
})

app.get('/second_service', (req, res) => {
    res.json({"pilotos" : [{nombre: "Loius Hamilton"}, {nombre: "Juan Pablo Montoya"}, {nombre: "Yesion"}]})
})    

app.get('/third_service', (req, res) => {
    res.json([
        {
          "name": "Diego",
          "age": 25,
          "driving_license": true
        },
        {
          "name": "Guerrero",
          "age": 90,
          "driving_license": true
        },
        {
           "name": "Salinas",
           "age": 22,
           "driving_license": false
        }
      ])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})