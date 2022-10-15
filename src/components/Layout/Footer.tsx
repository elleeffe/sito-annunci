import React from 'react';
import {Container, Grid, styled, Box} from '@mui/material';
import {TitleH4, TitleH5, TitleH6} from '../MyTypography';

const Footer = () => {
  return (
    <Wrap>
      <Container
        sx={{
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item sm={12} md={5} sx={{marginBottom: '50px'}}>
            <TitleH4 gutterBottom>Logo</TitleH4>
            <TitleH4 gutterBottom>
              328 Queensberry Street, North Melbourne VIC 3051, Australia.
            </TitleH4>
            <TitleH5 sx={{marginTop: '50px'}} gutterBottom>
              Supporto
            </TitleH5>
            <TitleH4 gutterBottom>support@prolancer.com</TitleH4>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12}>
                <TitleH6 gutterBottom sx={{marginTop: '10px'}}>
                  Categorie
                </TitleH6>
              </Grid>
              <Grid item xs={6} sm={4} md={6}>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
              </Grid>
              <Grid item xs={6} sm={4} md={6}>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
                <TitleH4 gutterBottom>Categoria</TitleH4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <BottomWrap>
        <TitleH6>Copyright © 2022 ProLancer All Rights Reserved.</TitleH6>
      </BottomWrap>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled(Box)(({theme}) => ({
  borderTop: '1px solid rgba(0,0,0,0.1)',
  marginTop: '100px',

  [theme.breakpoints.down('sm')]: {
    marginTop: '50px',
  },
}));

const BottomWrap = styled(Box)(({theme}) => ({
  borderTop: `1px solid rgba(0,0,0,0.1)`,
  padding: '25px 0',
  textAlign: 'center',
}));
