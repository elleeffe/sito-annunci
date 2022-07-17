import React from 'react';
import * as icons from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import MyIcon from './MyIcon';
import Image from 'next/image';

type Props = {
  variant: 'primary' | 'secondary';
  title: string;
  subtitle: string;
  button: {
    caption: string;
    action: () => void;
    color?: ButtonProps['color'];
    icon?: keyof typeof icons;
    variant?: ButtonProps['variant'];
  };
  img: {
    src: string;
    alt: string;
  };
};

const CallToAction = ({variant, title, subtitle, button, img}: Props) => {
  return (
    <Container sx={{paddingBottom: '100px'}}>
      <Wrap container variant={variant}>
        <Grid item sm={11} md={10} lg={8}>
          <CtaTypography variant="h4">{title}</CtaTypography>
          <CtaTypography variant="subtitle1">{subtitle}</CtaTypography>
          <Button
            variant={button.variant || 'contained'}
            onClick={button.action}
            color={button.color || 'primary'}
            endIcon={
              <MyIcon
                variant={button.variant}
                color={button.color}
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

const CtaTypography = styled(Typography)(({theme}) => ({
  marginBottom: '25px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
  },
}));
