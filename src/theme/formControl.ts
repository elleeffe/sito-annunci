import {Components, SimplePaletteColorOptions} from '@mui/material';
import {palette} from './palette';

export const formControl: Components['MuiFormControl'] = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        '&.Mui-focused fieldset': {
          borderWidth: '1px',
        },
        '&:hover fieldset': {
          borderColor: (palette.primary as SimplePaletteColorOptions).main,
        },
      },
      '& .MuiInputLabel-formControl': {
        transform: 'translate(21px, 14px) scale(1)',

        '&.Mui-focused': {
          transform: 'translate(14px, -9px) scale(0.75)',
        },
      },
    },
  },
};
