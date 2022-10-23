import {Components} from '@mui/material/styles/components';

export const alert: Components['MuiAlert'] = {
  styleOverrides: {
    root: {
      borderRadius: '4px',
      minHeight: '50px',

      '& .MuiAlert-message': {
        textAlign: 'left',
      },

      '& .MuiAlert-action': {
        paddingTop: 0,
      },
    },
  },
};
