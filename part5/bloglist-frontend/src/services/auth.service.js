import axios from 'axios';

const baseURL = '/api/users';
const baseURLLogin = '/api/login';

const authService = {
  login: async (data) => {
    try {
      const res = await axios.post(baseURLLogin, data);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default authService;
