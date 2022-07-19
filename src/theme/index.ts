import {createTheme} from '@mui/material';
import {alert} from './alert';
import {button} from './button';
import {formControl} from './formControl';
import {formHelperText} from './helperText';
import {palette} from './palette';
import {select} from './select';
import {tab} from './tab';
import {textField} from './textfield';
import {typography, typographyStyle} from './typography';

export const theme = createTheme({
  palette: palette,
  typography: typography,
  components: {
    MuiTextField: textField,
    MuiSelect: select,
    MuiFormHelperText: formHelperText,
    MuiButton: button,
    MuiFormControl: formControl,
    MuiTypography: typographyStyle,
    MuiTab: tab,
    MuiAlert: alert,
  },
});
