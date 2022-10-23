import React from 'react';
import * as icons from '@mui/icons-material';
import {Box, Button, Container, Grid, styled} from '@mui/material';
import MyIcon from '../MyIcon';
import {TitleH4, TitleH2} from '../MyTypography';

type Props = {
  title: string;
  subtitle: string;
  morePadding?: boolean;
  button: {
    caption: string;
    action: () => void;
    icon?: keyof typeof icons;
  };
  img: {
    src: string;
  };
};

const HeroBanner = ({title, subtitle, button, img, morePadding}: Props) => {
  return (
    <Wrap sx={{backgroundImage: `url(${img.src})`}} morePadding={morePadding}>
      <Container>
        <Inner container>
          <Grid item sm={11} md={10} lg={8}>
            <TitleH2 as="h4" isWhite marginBottom="20px">
              {title}
            </TitleH2>
            <HeroSubtitle isWhite>{subtitle}</HeroSubtitle>
            <Button
              variant="contained"
              onClick={button.action}
              color="warning"
              endIcon={
                <MyIcon
                  variant="contained"
                  color="warning"
                  icon={button.icon}
                />
              }
            >
              {button.caption}
            </Button>
          </Grid>
        </Inner>
      </Container>
    </Wrap>
  );
};

export default HeroBanner;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'morePadding',
})<{morePadding?: boolean}>(({morePadding}) => ({
  width: '100%',
  ...(morePadding
    ? {paddingTop: '100px', paddingBottom: '100px'}
    : {paddingTop: '75px', paddingBottom: '75px'}),
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',

  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    transition: 'inherit',
    background: 'rgba(0,0,0,0.6)',
  },
}));

const Inner = styled(Grid)(({theme}) => ({
  position: 'relative',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    margin: '50px auto',
  },
}));

const HeroSubtitle = styled(TitleH4)(({theme}) => ({
  marginBottom: '35px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '25px',
  },
}));
