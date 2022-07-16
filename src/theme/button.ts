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
    text: {
      padding: '11px 20px',
    },
    containedPrimary: {
      color: '#fff',
    },
  },
};
