import {styled, Typography} from '@mui/material';

type Props = {
  isWhite?: boolean;
};

export const TitleH1 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '60px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '50px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
}));
TitleH1.defaultProps = {variant: 'h1'};

export const TitleH2 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '50px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
  },
}));
TitleH2.defaultProps = {variant: 'h2'};

export const TitleH3 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '40px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
}));
TitleH3.defaultProps = {variant: 'h3'};

export const TitleH4 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '40px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
}));
TitleH4.defaultProps = {variant: 'h4'};

export const TitleH5 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 600,
  lineHeight: 1.3,
  fontSize: '30px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '26px',
  },
}));
TitleH5.defaultProps = {variant: 'h5'};

export const TitleH6 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isSmall' && prop !== 'isWhite',
})<Props & {isSmall?: boolean}>(({theme, isWhite, isSmall}) => ({
  fontWeight: 600,
  lineHeight: 1.3,
  ...(isSmall ? {fontSize: '24px'} : {fontSize: '30px'}),
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    ...(isSmall ? {fontSize: '20px'} : {fontSize: '26px'}),
  },
}));
TitleH6.defaultProps = {variant: 'h6'};

export const Subtitle1 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isPoppins',
})<Props & {isPoppins?: boolean}>(({theme, isWhite, isPoppins}) => ({
  lineHeight: 1.3,
  fontSize: '18px',
  fontWeight: 400,
  ...(isPoppins
    ? {fontFamily: 'Poppins'}
    : {
        fontFamily: 'Rubik',
      }),
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
  },
}));
Subtitle1.defaultProps = {variant: 'subtitle1'};

export const Subtitle2 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isPoppins',
})<Props & {isPoppins?: boolean}>(({theme, isWhite, isPoppins}) => ({
  lineHeight: 1.3,
  fontSize: '16px',
  fontWeight: 400,
  ...(isPoppins
    ? {fontFamily: 'Poppins'}
    : {
        fontFamily: 'Rubik',
      }),
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));
Subtitle2.defaultProps = {variant: 'subtitle2'};

export const Body1 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isPoppins',
})<Props & {isPoppins?: boolean}>(({theme, isWhite, isPoppins}) => ({
  lineHeight: 1.4,
  fontSize: '16px',
  fontWeight: 300,
  ...(isPoppins
    ? {fontFamily: 'Poppins'}
    : {
        fontFamily: 'Rubik',
      }),
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));
Body1.defaultProps = {variant: 'body1'};

export const Body2 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isSmall' && prop !== 'isWhite' && prop !== 'isPoppins',
})<Props & {isSmall?: boolean; isPoppins?: boolean}>(
  ({theme, isWhite, isSmall, isPoppins}) => ({
    lineHeight: 1.4,
    ...(isSmall ? {fontSize: '12px'} : {fontSize: '14px'}),
    fontWeight: 300,
    ...(isPoppins
      ? {fontFamily: 'Poppins'}
      : {
          fontFamily: 'Rubik',
        }),
    ...(isWhite
      ? {color: '#fff'}
      : {
          color: theme.palette.text.secondary,
        }),
    [theme.breakpoints.down('md')]: {
      ...(isSmall ? {fontSize: '10px'} : {fontSize: '12px'}),
    },
  })
);
Body2.defaultProps = {variant: 'body2'};
