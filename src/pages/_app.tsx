import type {AppProps} from 'next/app';
import AuthLoading from '../components/Layout/AuthLoading';
import {UserProvider} from '../context/UserContext';
import '../theme/index.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <AuthLoading>
        <Component {...pageProps} />
      </AuthLoading>
    </UserProvider>
  );
}

export default MyApp;
