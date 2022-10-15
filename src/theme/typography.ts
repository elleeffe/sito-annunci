import {TypographyVariantsOptions} from '@mui/material/styles';
import {Components} from '@mui/material/styles/components';

export const typography: TypographyVariantsOptions = {
  fontFamily: ['"Poppins"', '"Rubik"', '"sans-serif"'].join(','),
  allVariants: {
    fontSize: 15,
  },
};

export const typographyStyle: Components['MuiTypography'] = {
  defaultProps: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'h3',
      subtitle2: 'h4',
      body1: 'p',
      body2: 'p',
    },
  },
};
