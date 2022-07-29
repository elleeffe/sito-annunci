import React, {PropsWithChildren} from 'react';
import {styled, Box, Container} from '@mui/material';

const PageIntro = ({children}: PropsWithChildren<{}>) => {
  return (
    <>
      <Wrap>
        <Inner>{children}</Inner>
      </Wrap>
    </>
  );
};

export default PageIntro;

const Wrap = styled(Box)(({theme}) => ({
  background: theme.palette.primary.main,
  height: '250px',
  marginTop: '60px',
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
}));
