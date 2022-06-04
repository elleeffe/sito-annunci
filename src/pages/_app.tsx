import type {AppProps} from 'next/app';
import {AppProvider} from '../context/AppContext';
import '../theme/index.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
