import {useState, useEffect} from 'react';
import {useUser} from '../context/UserContext';
import {CircularProgress, Box} from '@mui/material';

import {fetchUser} from '../utils/api';
import Layout from './Layout';
import axios from 'axios';

interface Props {
  children: React.ReactElement;
}

const AuthLoading = ({children}: Props) => {
  const [loading, setLoading] = useState(true);
  const {setUser} = useUser();

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/check-session');
        // setUser(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [setUser]);

  if (loading) {
    return (
      <Layout hideHeader>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'background.default',
          }}
        >
          <CircularProgress color="primary" size={50} />
        </Box>
      </Layout>
    );
  }

  return children;
};

export default AuthLoading;
