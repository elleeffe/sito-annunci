import React, {useCallback} from 'react';
import type {NextPage} from 'next';
import {Box, styled} from '@mui/material';
import Layout from '../components/Layout';
import PublishForm from '../components/Forms/PublishForm';
import {useAdsContext} from '../contexts/AdsContext';

const Publish: NextPage = () => {
  const {ads} = useAdsContext();

  const handleChangeStep = useCallback(
    () => window.scrollTo({top: 0, behavior: 'smooth'}),
    []
  );

  return (
    <Layout hidePublish>
      <Wrap>
        <PublishForm
          initialAds={ads}
          onChangeStep={handleChangeStep}
          finalVariant="create"
        />
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
