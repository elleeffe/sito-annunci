import {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';
import {useRouter} from 'next/router';
import {sleep} from '../utils/utils';
import {mockUser} from '../utils/mocks';

export type UserContextType = {
  user?: User;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  update: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  loading: true,
  login: () => {},
  logout: () => {},
  update: () => {},
});

export const UserProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const {asPath, push} = useRouter();

  const login = useCallback((user: User) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    asPath !== '/profilo' && push('/');
  }, [push, asPath]);

  const update = useCallback((user: User) => {
    setUser(user);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/check-session');
        // login(response.data);
        // await sleep(1000);
        setUser(mockUser);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
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
