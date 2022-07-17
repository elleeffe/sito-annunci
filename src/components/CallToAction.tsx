import React, {useMemo} from 'react';
import * as icons from '@mui/icons-material';
import {Box, Button, Container, Grid, styled} from '@mui/material';
import MyIcon from './MyIcon';
import Image from 'next/image';
import {Subtitle1, TitleH4} from './MyTypography';

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

const CallToAction = ({variant, title, subtitle, button, img}: Props) => {
  const buttonColor = useMemo(() => {
    if (variant === 'primary') {
      return 'warning';
    }
    return 'primary';
  }, [variant]);
  return (
    <Container sx={{paddingBottom: '100px'}}>
      <Wrap container variant={variant}>
        <Grid item sm={11} md={10} lg={8}>
          <CtaTitle isWhite={variant === 'primary'}>{title}</CtaTitle>
          <CtaSubtitle isWhite={variant === 'primary'}>{subtitle}</CtaSubtitle>
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

export default CallToAction;

const Wrap = styled(Grid)<{variant: 'primary' | 'secondary'}>(
  ({theme, variant}) => ({
    backgroundColor: theme.palette[variant].main,
    padding: '50px',
    borderRadius: '25px',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      padding: '25px',
    },
  })
);

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

const CtaTitle = styled(TitleH4)(({theme}) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
  },
}));

const CtaSubtitle = styled(Subtitle1)(({theme}) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
  },
}));
