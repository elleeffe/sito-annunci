import React from 'react';
import {Box, Button, Container, styled, Typography} from '@mui/material';
import {Add, Login} from '@mui/icons-material';

const Header = () => {
  return (
    <Wrap>
      <Inner>
        <Typography variant="h6">Logo</Typography>
        <Box display="flex" alignItems="center">
          <Button endIcon={<Login />}>Accedi</Button>
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{marginLeft: '10px'}}
          >
            Inserisci annuncio
          </Button>
        </Box>
      </Inner>
    </Wrap>
  );
};

export default Header;

const Wrap = styled(Box)(({theme}) => ({
  height: '80px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: theme.palette.background.default,
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  height: '100%',
}));
