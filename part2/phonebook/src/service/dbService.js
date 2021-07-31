import axios from 'axios'

const baseUrl = 'http://localhost:3001/db'

const getAll = () => axios.get(baseUrl)

const create = (newObj) => {
  axios.post(baseUrl, newObj)
}

const update = (id, setName, setNumber) => {
  axios.put(`${baseUrl}/${id}`, {
    name: setName,
    number: setNumber,
  })
}

const remove = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove, update }
