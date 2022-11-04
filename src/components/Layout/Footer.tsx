import React from 'react';
import {Container, Grid, styled, Box} from '@mui/material';
import {Body1, Body2, ExternalLink, TitleH3, TitleH5} from '../MyTypography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Link from 'next/link';
import {routes} from '../../utils/config';

const Footer = () => {
  return (
    <Wrap>
      <StyledContainer>
        <Grid container justifyContent="space-between">
          <Grid item sm={12} md={5} sx={{marginBottom: '50px'}}>
            <TitleH3 gutterBottom>Logo</TitleH3>
            <Body1 gutterBottom>
              Morbi convallis bibendum urna ut viverra. Maecenas quis consequat
              libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies
              laoreet ullamcorper phasellus semper.
            </Body1>
            <TitleH3 sx={{marginTop: '50px'}} gutterBottom>
              Supporto
            </TitleH3>
            <Box display="flex" alignItems="center">
              <AlternateEmailIcon
                color="primary"
                sx={{width: 20, height: 20, marginRight: '5px'}}
              />
              <TitleH5 gutterBottom>
                <ExternalLink href="">support@prolancer.com</ExternalLink>
              </TitleH5>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={6}>
                <TitleH3 gutterBottom sx={{marginTop: '10px'}}>
                  Link Utili
                </TitleH3>
                {routes.map((route) => {
                  if (route.label === 'Categorie') {
                    return null;
                  }
                  return (
                    <StyledLink
                      passHref
                      href={route.path || '/'}
                      key={route.label}
                    >
                      <span>{route.label}</span>
                    </StyledLink>
                  );
                })}
              </Grid>
              <Grid item xs={6}>
                <TitleH3 gutterBottom sx={{marginTop: '10px'}}>
                  Categorie
                </TitleH3>
                {routes.map((route) => {
                  if (route.label !== 'Categorie') {
                    return null;
                  }
                  return route.submenu?.map((el) => (
                    <StyledLink passHref href={el.path || '/'} key={el.label}>
                      <span>{el.label}</span>
                    </StyledLink>
                  ));
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
      <BottomWrap>
        <Body2>Copyright © 2022 ProLancer All Rights Reserved.</Body2>
      </BottomWrap>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled(Box)(({theme}) => ({
  borderTop: '1px solid rgba(0,0,0,0.1)',
}));

const StyledContainer = styled(Container)(({theme}) => ({
  paddingTop: '150px',
  paddingBottom: '75px',

  [theme.breakpoints.down('md')]: {
    paddingTop: '75px',
  },
}));

const BottomWrap = styled(Box)(({theme}) => ({
  borderTop: `1px solid rgba(0,0,0,0.1)`,
  padding: '25px 0',
  textAlign: 'center',
}));

const StyledLink = styled(Link)(({theme}) => ({
  fontSize: 16,
  fontFamily: 'Poppins',
  display: 'block',
  marginLeft: '15px',
  position: 'relative',
  marginBottom: '8px',
  color: theme.palette.text.secondary,
  fontWeight: '400',

  span: {
    transition: 'all 200ms linear',
    display: 'block',
  },

  '&::after, &::before': {
    content: '""',
    width: '9px',
    height: '2px',
    position: 'absolute',
    left: '-15px',
    background: '#ccc',
    borderRadius: '2px',
  },

  '&::after': {
    transform: 'rotate(45deg)',
    top: 'calc(50% - 2.5px)',
  },

  '&::before': {
    transform: 'rotate(-45deg)',
    top: 'calc(50% + 2.5px)',
  },

  '&:hover': {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    span: {
      transform: 'translateX(5px)',
    },
  },
}));
