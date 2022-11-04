import {PropsWithChildren, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';

const AllTheProviders = ({children}: PropsWithChildren<{}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
