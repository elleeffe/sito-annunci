import {Components, SimplePaletteColorOptions} from '@mui/material';
import {palette} from './palette';

export const select: Components['MuiSelect'] = {
  defaultProps: {
    variant: 'outlined',
    size: 'medium',
    fullWidth: true,
  },
};
