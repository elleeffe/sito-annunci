import {Components} from '@mui/material';

export const buttonBase: Components['MuiButtonBase'] = {
  styleOverrides: {
    root: {
      '&.MuiIconButton-sizeSmall': {
        padding: '5.5px',
      },
      '&.MuiIconButton-sizeMedium': {
        padding: '13px',
      },
      '&.MuiIconButton-sizeLarge': {
        padding: '16px',
      },
    },
  },
};
