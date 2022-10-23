import React, {useCallback} from 'react';
import type {NextPage} from 'next';
import {Box, Container, styled} from '@mui/material';
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
        <StyledContainer>
          <PublishForm
            initialAds={ads}
            onChangeStep={handleChangeStep}
            finalVariant="create"
          />
        </StyledContainer>
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

const StyledContainer = styled(Container)(({theme}) => ({
  borderRadius: '4px',
  background: theme.palette.background.default,
  padding: '25px 15px',
  maxWidth: '95vw',
}));
