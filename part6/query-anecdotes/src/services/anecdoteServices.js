import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const service = {
  getAll: async () => {
    try {
      const res = await axios.get(baseUrl);
      return res.data
    } catch (error) {
      throw new Error(error.message)
    }
  },
  create: async (data) => {
    try {
      const res = await axios.post(baseUrl, data)
      return res.data
    } catch (error) {
      throw new Error(error.message)
    }
  }
};

export default service;