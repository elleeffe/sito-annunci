import {styled, Typography} from '@mui/material';

type Props = {
  isWhite?: boolean;
  isEllipsis?: boolean;
  isThin?: boolean;
};

export const TitleH1 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite, isEllipsis}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '36px',
  ...(isEllipsis && {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  }),
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH1.defaultProps = {variant: 'h1'};

export const TitleH2 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.3,
  fontSize: '30px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH2.defaultProps = {variant: 'h2'};

export const TitleH3 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '24px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH3.defaultProps = {variant: 'h3'};

export const TitleH4 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '20px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH4.defaultProps = {variant: 'h4'};

export const TitleH5 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '16px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH5.defaultProps = {variant: 'h5'};

export const TitleH6 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '12px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
}));
TitleH6.defaultProps = {variant: 'h6'};

export const Subtitle = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  fontWeight: 400,
  lineHeight: 1.5,
  fontSize: '21px',
  marginLeft: 'auto',
  marginRight: 'auto',
  span: {
    color: theme.palette.primary.main,
  },
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.secondary}),
  [theme.breakpoints.down('md')]: {
    maxWidth: '600px',
  },
}));

TitleH6.defaultProps = {variant: 'subtitle1'};

export const Body1 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite, isThin}) => ({
  lineHeight: 1.6,
  fontSize: '16px',
  fontFamily: 'Poppins',
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),
  ...(isThin ? {fontWeight: 300} : {fontWeight: 400}),
}));
Body1.defaultProps = {variant: 'body1'};

export const Body2 = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  lineHeight: 1.6,
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'Poppins',
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),
}));
Body2.defaultProps = {variant: 'body2'};

export const ExternalLink = styled('a', {
  shouldForwardProp: (prop) =>
    prop !== 'isWhite' && prop !== 'isEllipsis' && prop !== 'isThin',
})<Props>(({theme, isWhite}) => ({
  lineHeight: 1.6,
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: 'Poppins',
  ...(isWhite
    ? {color: '#fff'}
    : {
        color: theme.palette.text.secondary,
      }),

  '&:hover': {
    color: theme.palette.primary.main,
  },
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
  fontFamily: 'Poppins',
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
