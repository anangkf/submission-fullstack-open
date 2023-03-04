import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteServices = {
  getAll: async () => {
    try {
      const res = await axios.get(baseUrl)
      return res
    } catch (error) {
      return error
    }
  },
  create: async (payload) => {
    try {
      const res = await axios.post(baseUrl, payload)
      return res
    } catch (error) {
      return error
    }
  },
  vote: async (anecdote) => {
    const { id, votes } = anecdote
    try {
      const res = await axios.patch(`${baseUrl}/${id}`, { votes: votes + 1 })
      return res
    } catch (error) {
      return error
    }
  },
}

export default anecdoteServices
