import {styled, Typography} from '@mui/material';

type Props = {
  isWhite?: boolean;
};

export const TitleH1 = styled(Typography)<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '60px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '50px',
  },
}));
TitleH1.defaultProps = {variant: 'h1'};

export const TitleH2 = styled(Typography)<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '50px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
  },
}));
TitleH2.defaultProps = {variant: 'h2'};

export const TitleH3 = styled(Typography)<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '40px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
}));
TitleH3.defaultProps = {variant: 'h3'};

export const TitleH4 = styled(Typography)<Props>(({theme, isWhite}) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  fontSize: '40px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
}));
TitleH4.defaultProps = {variant: 'h4'};

export const TitleH5 = styled(Typography)<Props>(({theme, isWhite}) => ({
  fontWeight: 600,
  lineHeight: 1.3,
  fontSize: '30px',
  ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
  [theme.breakpoints.down('md')]: {
    fontSize: '26px',
  },
}));
TitleH5.defaultProps = {variant: 'h5'};

export const TitleH6 = styled(Typography)<Props & {isSmall?: boolean}>(
  ({theme, isWhite, isSmall, color}) => ({
    fontWeight: 600,
    lineHeight: 1.3,
    ...(isSmall ? {fontSize: '24px'} : {fontSize: '30px'}),
    ...(isWhite ? {color: '#fff'} : {color: theme.palette.text.primary}),
    [theme.breakpoints.down('md')]: {
      ...(isSmall ? {fontSize: '20px'} : {fontSize: '26px'}),
    },
  })
);
TitleH6.defaultProps = {variant: 'h6'};

export const Subtitle1 = styled(Typography)<Props>(({theme, isWhite}) => ({
  lineHeight: 1.3,
  fontSize: '18px',
  fontWeight: 400,
  fontFamily: 'Rubik',
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

export const Subtitle2 = styled(Typography)<Props>(({theme, isWhite}) => ({
  lineHeight: 1.3,
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'Rubik',
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

export const Body1 = styled(Typography)<Props>(({theme, isWhite}) => ({
  lineHeight: 1.3,
  fontSize: '16px',
  fontWeight: 300,
  fontFamily: 'Rubik',
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

export const Body2 = styled(Typography)<Props & {isSmall?: boolean}>(
  ({theme, isWhite, isSmall}) => ({
    lineHeight: 1.3,
    ...(isSmall ? {fontSize: '12px'} : {fontSize: '14px'}),
    fontWeight: 300,
    fontFamily: 'Rubik',
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
