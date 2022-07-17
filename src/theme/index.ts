import {createTheme, PaletteMode} from '@mui/material';
import {button} from './button';
import {formControl} from './formControl';
import {formHelperText} from './helperText';
import {palette} from './palette';
import {select} from './select';
import {textField} from './textfield';
// import {typography} from './typography';

export const getTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? {...palette} : {...palette}),
    },
    typography: {
      fontFamily: ['"Poppins"', '"Rubik"'].join(','),
    },
    components: {
      MuiTextField: textField,
      MuiSelect: select,
      MuiFormHelperText: formHelperText,
      MuiButton: button,
      MuiFormControl: formControl,
    },
  });

  return theme;
};
