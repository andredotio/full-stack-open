import axios from 'axios'

const base = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(base)

    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(base, newPerson)

    return request.then(response => response.data)
}

const update = (newPerson) => {
    const request = axios.put(`${base}/${newPerson.id}`, newPerson)

    return request.then(request => request.data)
}

const remove = (id) => {
    const request = axios.delete(`${base}/${id}`)

    return request.then(response => response.data)
}

export default { getAll, create, update, remove }