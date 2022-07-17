import React from 'react';
import {Box, Button, Container, styled} from '@mui/material';
import {Add, Login} from '@mui/icons-material';
import {TitleH6} from './MyTypography';

const Header = () => {
  return (
    <Wrap>
      <Inner>
        <TitleH6>Logo</TitleH6>
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
  zIndex: 100,
  boxShadow: '0 18px 40px -30px rgba(35, 38, 58, 0.2)',
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  height: '100%',
}));
