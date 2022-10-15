import {styled, Typography} from '@mui/material';

type Props = {
  isWhite?: boolean;
  isEllipsis?: boolean;
};

export const TitleH1 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite, isEllipsis}) => ({
  fontWeight: 300,
  lineHeight: 1.3,
  fontSize: '46px',
  ...(isEllipsis && {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  }),
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
  },
}));
TitleH1.defaultProps = {variant: 'h1'};

export const TitleH2 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.3,
  fontSize: '40px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
}));
TitleH2.defaultProps = {variant: 'h2'};

export const TitleH3 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '34px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
  },
}));
TitleH3.defaultProps = {variant: 'h3'};

export const TitleH4 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 300,
  lineHeight: 1.3,
  fontSize: '28px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
  },
}));
TitleH4.defaultProps = {variant: 'h4'};

export const TitleH5 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.3,
  fontSize: '24px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));
TitleH5.defaultProps = {variant: 'h5'};

export const TitleH6 = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWhite' && prop !== 'isEllipsis',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.3,
  fontSize: '18px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
  },
}));
TitleH6.defaultProps = {variant: 'h6'};

export const Body1 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isPoppins',
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
}));
Body1.defaultProps = {variant: 'body1'};

export const StyledButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isSmall',
})<{isSmall?: boolean}>(({theme, isSmall}) => ({
  color: theme.palette.warning.main,
  border: 'unset',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  ...(isSmall
    ? {fontSize: '13px'}
    : {
        fontSize: '15px',
      }),

  '&:hover': {
    textDecoration: 'underline',
  },

  [theme.breakpoints.down('md')]: {
    ...(isSmall ? {fontSize: '11px'} : {fontSize: '13px'}),
  },
}));
