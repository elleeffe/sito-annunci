import {Components} from '@mui/material';

export const buttonBase: Components['MuiButtonBase'] = {
  styleOverrides: {
    root: {
      '&.MuiIconButton-sizeSmall:not(.MuiAutocomplete-clearIndicator)': {
        padding: '5.5px',
      },
      '&.MuiIconButton-sizeMedium:not(.MuiAutocomplete-clearIndicator)': {
        padding: '13px',
      },
      '&.MuiIconButton-sizeLarge:not(.MuiAutocomplete-clearIndicator)': {
        padding: '16px',
      },
      '&.MuiMenuItem-root': {
        fontSize: 15,
      },
      '&.MuiListItem-root': {
        fontSize: 15,
      },
    },
  },
};
