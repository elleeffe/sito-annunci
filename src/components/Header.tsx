import React from 'react';
import {Box, Button, Container, styled, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';

const Header = () => {
  return (
    <Wrap>
      <Inner>
        <Typography variant="h6">Logo</Typography>
        <Button variant="outlined" endIcon={<Add />}>
          Inserisci annuncio
        </Button>
      </Inner>
    </Wrap>
  );
};

export default Header;

const Wrap = styled(Box)(() => ({
  height: '60px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  height: '100%',
}));
