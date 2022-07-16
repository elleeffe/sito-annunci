import {Components} from '@mui/material';

export const button: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '28px',
      textTransform: 'initial',
      padding: '10px 20px',
      fontSize: '1rem',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    sizeSmall: {
      padding: '5px 20px',
      fontSize: '0.9rem',
      svg: {
        width: '0.8em',
        height: '0.8em',
      },
    },
    text: {
      padding: '11px 20px',
    },
    containedPrimary: {
      color: '#fff',
    },
  },
};
