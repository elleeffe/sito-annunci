import {useState, useContext, createContext} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';

export type UserContextType = {
  user: any | null;
  setUser: React.Dispatch<any | null>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<any | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
