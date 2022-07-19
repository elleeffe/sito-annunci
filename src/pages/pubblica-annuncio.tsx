import React from 'react';
import type {NextPage} from 'next';
import {Box, styled} from '@mui/material';
import Layout from '../components/Layout';

const Publish: NextPage = () => {
  return (
    <Layout hidePublish>
      <Wrap></Wrap>
    </Layout>
  );
};

export default Publish;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  background: theme.palette.primary.main,
}));
