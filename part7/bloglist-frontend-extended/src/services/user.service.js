import axios from "axios"

const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

const getById = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  getAll, getById
}