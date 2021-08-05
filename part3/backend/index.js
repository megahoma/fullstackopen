const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(
  morgan(function (tokens, req, res) {
    if (req.method === 'POST') {
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(() => {
      Person.find({}).then((persons) => {
        response.json(persons)
      })
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((persons) => {
      console.log('delete', persons)
      Person.find({}).then((persons) => {
        response.json(persons).status(204).end()
      })
    })
    .catch((error) => next(error))
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson)
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
