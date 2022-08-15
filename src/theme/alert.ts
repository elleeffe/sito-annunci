import {Components} from '@mui/material/styles/components';

export const alert: Components['MuiAlert'] = {
  styleOverrides: {
    root: {
      borderRadius: '25px',
      minHeight: '50px',

      '& .MuiAlert-action': {
        paddingTop: 0,
      },
    },
  },
};
