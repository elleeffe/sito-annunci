import React, {useCallback} from 'react';
import type {NextPage} from 'next';
import {Box, Paper, styled} from '@mui/material';
import Layout from '../components/Layout';
import PublishForm from '../components/Forms/PublishForm';

const Publish: NextPage = () => {
  const handleSubmit = useCallback(
    async (values: any) => console.log(values),
    []
  );

  return (
    <Layout hidePublish>
      <Wrap>
        <StyledPaper>
          <PublishForm handleSubmit={handleSubmit} />
        </StyledPaper>
      </Wrap>
    </Layout>
  );
};

export default Publish;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  paddingTop: '100px',
  background: theme.palette.primary.main,
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '25px',
}));
