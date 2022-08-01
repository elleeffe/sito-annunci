import React, {useMemo} from 'react';
import * as icons from '@mui/icons-material';
import {Box, Button, Container, Grid, styled} from '@mui/material';
import MyIcon from './MyIcon';
import Image from 'next/image';
import {Subtitle1, TitleH3} from './MyTypography';

type Props = {
  variant: 'primary' | 'secondary';
  title: string;
  subtitle: string;
  button: {
    caption: string;
    action: () => void;
    icon?: keyof typeof icons;
  };
  img: {
    src: string;
    alt: string;
  };
};

const HeroBanner = ({variant, title, subtitle, button, img}: Props) => {
  const buttonColor = useMemo(() => {
    if (variant === 'primary') {
      return 'warning';
    }
    return 'primary';
  }, [variant]);

  return (
    <Container>
      <Wrap container variant={variant}>
        <Grid item sm={11} md={10} lg={8}>
          <HeroTitle isWhite={variant === 'primary'}>{title}</HeroTitle>
          <HeroSubtitle isWhite={variant === 'primary'}>
            {subtitle}
          </HeroSubtitle>
          <Button
            variant="contained"
            onClick={button.action}
            color={buttonColor}
            endIcon={
              <MyIcon
                variant="contained"
                color={buttonColor}
                icon={button.icon}
              />
            }
          >
            {button.caption}
          </Button>
        </Grid>
        <ImageWrap>
          <Image src={img.src} alt={img.alt} layout="fill" />
        </ImageWrap>
      </Wrap>
    </Container>
  );
};

export default HeroBanner;

const Wrap = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{variant: 'primary' | 'secondary'}>(({theme, variant}) => ({
  backgroundColor: theme.palette[variant].main,
  padding: '50px',
  borderRadius: '25px',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    padding: '25px',
  },
}));

const ImageWrap = styled(Box)(({theme}) => ({
  position: 'absolute',
  bottom: 10,
  right: 10,
  width: '40vh',
  height: '30vh',
  maxHeight: '250px',
  maxWidth: '300px',
  minHeight: '100px',
  minWidth: '150px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const HeroTitle = styled(TitleH3)(({theme}) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
  },
}));

const HeroSubtitle = styled(Subtitle1)(({theme}) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
  },
}));
