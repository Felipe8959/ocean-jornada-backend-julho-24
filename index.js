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

  const db = client.db(dbName)
  const collection = db.collection('item')

  // read all
  app.get('/item', async function (req, res) {
    const documentos = await collection.find().toArray()
    res.send(documentos)
  })

  // sinalizamos para o express que iremos utilizar json no body
  app.use(express.json())

  // create
  app.post('/item', async function (req, res) {
    const item = req.body

    await collection.insertOne(item)

    res.send(item)
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