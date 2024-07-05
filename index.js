const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:fbJkGwsGu8uMmb2m@cluster0.sicvr2n.mongodb.net'
const dbName = 'ocean-jornada-backend'
const client = new MongoClient(dbUrl)


async function main() {
  console.log('Conectando ao banco de dados...')
  client.connect()
  console.log('Conexão realizada')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
      res.send('Olá, mundo!')
    })
    

  // lista de personangens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']


  // read all
  app.get('/item', function (req, res) {
    res.send(lista)
  })

  // sinalizamos para o express que iremos utilizar json no body
  app.use(express.json())

  // create
  app.post('/item', function (req, res) {
    console.log(req.body)
    const item = req.body.nome
    console.log(item)

    lista.push(item)

    res.send(lista)
  })


  // Read by id [GET]
  app.get('/item/:id', function (req, res) {
    const id = req.params.id
    const item = lista[id - 1]
    res.send(item)
  })


  // Update [PUT]
  app.put('/item/:id', function (req, res) {
    const id = req.params.id
    const novoItem = req.body.nome

    lista[id - 1] = novoItem

    res.send('Item atualizado ' + id)
  })


  app.listen(3000)
}

main()