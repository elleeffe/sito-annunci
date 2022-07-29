import React from 'react';
import type {NextPage} from 'next';
import {Box, Paper, styled} from '@mui/material';
import Layout from '../components/Layout';
import PublishForm from '../components/Forms/PublishForm';

const Publish: NextPage = () => {
  return (
    <Layout hidePublish>
      <Wrap>
        <StyledPaper>
          <PublishForm />
        </StyledPaper>
      </Wrap>
    </Layout>
  );
};

export default Publish;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  minHeight: '100vh',
  paddingTop: '100px',
  paddingBottom: '50px',
  background: theme.palette.primary.main,
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '25px',

  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
}));
