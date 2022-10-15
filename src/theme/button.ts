import {Components} from '@mui/material';

export const button: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '28px',
      textTransform: 'initial',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '& .MuiCircularProgress-root': {
        color: '#fff',
      },
      a: {
        color: 'inherit',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
    sizeMedium: {
      padding: '0px 20px',
      fontSize: '15px',
      height: '50px',
    },
    sizeSmall: {
      padding: '0 20px',
      height: '40px',
      fontSize: '13',
      svg: {
        width: '0.8em',
        height: '0.8em',
      },
    },
    text: {
      padding: '11px 20px',
    },
    contained: {
      color: '#fff',
    },
  },
};
