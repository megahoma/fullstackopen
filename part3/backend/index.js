const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(
  morgan(function (tokens, req, res) {
    if (req.method == 'POST') {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ')
    }
  })
)

let person = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(person).status(200)
})

app.get('/info', (request, response) => {
  response.send(`
        <p>Phonebook has info for ${person.length} people</p>
        <p>${new Date()}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const data = person.find((v) => v.id === id)
  if (data) {
    response.json(data)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const id = Number(body.id)
  console.log(body)

  const data = person.findIndex((v) => v.id === id)
  person[data].number = body.number

  response.json(person).status(200)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const data = person.find((v) => v.id === id)
  if (data) {
    person = person.filter((v) => v.id !== id)
    response.json(person).status(204)
  } else {
    response.status(400).json({
      error: 'wrong id',
    })
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined) {
    response.status(400).json({
      error: 'name missing',
    })
  }
  if (body.number === undefined) {
    response.status(400).json({
      error: 'number missing',
    })
  }

  if (person.find((v) => v.name === body.name)) {
    response.status(400).json({
      error: 'name must be unique',
    })
  }

  const data = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000),
  }

  person = person.concat(data)

  response.json(data)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
