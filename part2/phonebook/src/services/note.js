import axios from "axios";

const baseURL = '/api/persons';

const noteServices = {
  getAll: async () => {
    try {
      const res = await axios.get(baseURL)
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  create: async (data) => {
    try {
      const res = await axios.post(baseURL, data)
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (id) => {
    try {
      const res = await axios.delete(`${baseURL}/${id}`)
      return res;
    } catch (err) {
      throw err;
    }
  },

  update: async (data) => {
    const {id} = data;
    delete data.id
    try {
      const res = await axios.put(`${baseURL}/${id}`, data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default noteServices;