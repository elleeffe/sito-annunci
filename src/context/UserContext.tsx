import {useState, useContext, createContext} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';

export type UserContextType = {
  user?: User;
  setUser: React.Dispatch<User | undefined>;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | undefined>();

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
