import type {AppProps} from 'next/app';
import AuthLoading from '../components/Layout/AuthLoading';
import {AdsProvider} from '../contexts/AdsContext';
import {UserProvider} from '../contexts/UserContext';
import '../theme/index.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <AuthLoading>
        <AdsProvider>
          <Component {...pageProps} />
        </AdsProvider>
      </AuthLoading>
    </UserProvider>
  );
}

export default MyApp;
