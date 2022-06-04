import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {ThemeProvider, useMediaQuery} from '@mui/material';
import {getTheme} from '../theme';

interface AppProviderProps extends PropsWithChildren<{}> {}

interface AppContextType {}

export const AppContext = createContext<AppContextType>({});

export const AppProvider = ({children}: AppProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () => getTheme(darkMode ? 'dark' : 'light'),
    [darkMode]
  );

  const toggleTheme = useCallback(
    () => setDarkMode((prevMode) => !prevMode),
    []
  );

  // useEffect(() => {
  //   setDarkMode(prefersDarkMode);
  // }, [prefersDarkMode]);

  return (
    <AppContext.Provider
      value={{
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
