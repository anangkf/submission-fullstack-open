import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async ({ data, token }) => {
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(baseUrl, data, reqConfig);
    return res.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
