import type {NextPage} from 'next';
import Layout from '../components/Layout';
import {Typography} from '@mui/material';

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1">Hello world!</Typography>
    </Layout>
  );
};

export default Home;
