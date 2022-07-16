import {Components} from '@mui/material';

export const formControl: Components['MuiFormControl'] = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        '&.Mui-focused fieldset': {
          borderWidth: '1px',
        },
      },
    },
  },
};
