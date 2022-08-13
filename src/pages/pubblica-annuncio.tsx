import React from 'react';
import type {NextPage} from 'next';
import {Box, Paper, styled} from '@mui/material';
import Layout from '../components/Layout';
import PublishForm from '../components/Forms/PublishForm';
import {useAdsContext} from '../contexts/AdsContext';

const Publish: NextPage = () => {
  const {ads} = useAdsContext();

  return (
    <Layout hidePublish>
      <Wrap>
        <StyledPaper>
          <PublishForm initialAds={ads} />
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
  display: 'flex',
  flexDirection: 'column',
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '25px',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
}));
