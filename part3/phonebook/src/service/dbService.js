import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObj) => {
  return axios.post(baseUrl, newObj)
}

const update = (id, setName, setNumber) => {
  return axios.put(`${baseUrl}/${id}`, {
    id: id,
    name: setName,
    number: setNumber,
  })
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove, update }
