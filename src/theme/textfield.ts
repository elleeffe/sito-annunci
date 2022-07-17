import {Components, SimplePaletteColorOptions} from '@mui/material';
import {palette} from './palette';

export const textField: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        borderRadius: '28px',
        paddingLeft: '15px',
        input: {
          padding: '13.5px 15px 13.5px 6px',
        },
      },
      '& .Mui-error': {
        '& svg:not(.untouchable-icon)': {
          color: (palette.error as SimplePaletteColorOptions).main,
        },
      },
    },
  },
  defaultProps: {
    variant: 'outlined',
    autoComplete: 'off',
    size: 'medium',
    fullWidth: true,
  },
};
