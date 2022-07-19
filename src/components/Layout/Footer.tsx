import React from 'react';
import {Container, Grid, styled, Box} from '@mui/material';
import {Subtitle1, Subtitle2, TitleH4, TitleH6} from '../MyTypography';

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
            <Subtitle1 gutterBottom>
              328 Queensberry Street, North Melbourne VIC 3051, Australia.
            </Subtitle1>
            <TitleH6 sx={{marginTop: '50px'}} gutterBottom>
              Supporto
            </TitleH6>
            <Subtitle1 gutterBottom>support@prolancer.com</Subtitle1>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12}>
                <TitleH6 gutterBottom sx={{marginTop: '15px'}}>
                  Categorie
                </TitleH6>
              </Grid>
              <Grid item xs={6} sm={4} md={6}>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
              </Grid>
              <Grid item xs={6} sm={4} md={6}>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
                <Subtitle1 gutterBottom>Categoria</Subtitle1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <BottomWrap>
        <Subtitle2>Copyright © 2022 ProLancer All Rights Reserved.</Subtitle2>
      </BottomWrap>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled(Box)(({theme}) => ({
  borderTop: '1px solid rgba(0,0,0,0.1)',
}));

const BottomWrap = styled(Box)(({theme}) => ({
  borderTop: `1px solid rgba(0,0,0,0.1)`,
  padding: '25px 0',
  textAlign: 'center',
}));
