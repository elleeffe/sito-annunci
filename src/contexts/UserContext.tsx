import {useState, useContext, createContext, useCallback} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';
import {useRouter} from 'next/router';

export type UserContextType = {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
  update: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  login: () => {},
  logout: () => {},
  update: () => {},
});

export const UserProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | undefined>({
    email: 'lorenzo@faenzi.com',
    phone: '34287438732',
    id: 'user-1',
  });

  const router = useRouter();

  const login = useCallback((user: User) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    router.push('/');
  }, [router]);

  const update = useCallback((user: User) => {
    setUser(user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        update,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
