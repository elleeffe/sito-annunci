import {createTheme, PaletteMode} from '@mui/material';
import {typography, typographyStyle} from './typography';

export const getTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? {} : {}),
    },
    typography,
    components: {
      MuiTypography: typographyStyle,
    },
  });

  return theme;
};
