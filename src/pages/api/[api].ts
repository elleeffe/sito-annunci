/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const http = axios.create({
  baseURL: `${process.env.BACKEND_URI}`,
});

http.interceptors.request.use(function (config) {
  const currentToken = localStorage.getItem('TOKEN');

  if (currentToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${currentToken}`;
  }

  return config;
});

// TODO
const decrypter = (value: any) => {
  const decryptedValue = value;
  return decryptedValue;
};

// TODO
const encrypter = (value: any) => {
  const decryptedValue = value;
  return decryptedValue;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.status(404).json({message: 'Controllare metodo richiesta'});
  }

  try {
    // check session
    if (req.body.destination === '/api/check-session') {
      const response = await axios.post(`/check-session`);
      return res.status(response.status).json(response.data);
    }

    // login
    if (req.body.destination === '/api/login') {
      const response = await axios.post(
        '/login',
        {...req.body.data} // se è login non allego il cookie esistente
      );
      return res.status(response.status).json(response.data);
    }

    // signup
    if (req.body.destination === '/api/signup') {
      const response = await axios.post(
        '/signup',
        {...req.body.data} // se è login non allego il cookie esistente
      );
      return res.status(response.status).json(response.data);
    }

    // other
    const response = await axios.post('/others', {...req.body.data});
    return res.status(response.status).json(response.data);
  } catch (e: any) {
    // server response with specific error
    if (e.response && e.response.data) {
      return res.status(e.response.status).json(e.response.data);
    }

    // generic
    return res.status(e.response.status).json(e);
  }
};
