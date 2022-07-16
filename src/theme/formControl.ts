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
    },
  },
};
