import React, {PropsWithChildren, useMemo} from 'react';
import Head from 'next/head';
import logo from '../../public/logo.svg';
import {Container} from '@mui/material';
import Header from './Header';

interface Props extends PropsWithChildren<{}> {
  title?: string;
  description?: string;
  image?: string;
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const Layout = ({title, description, image, twitter, children}: Props) => {
  const pageTitle = useMemo(
    () => (title ? `${title} | Titolo` : 'Titolo - Da definire'),
    [title]
  );

  const pageDesc = useMemo(
    () => (description ? description : 'Titolo - Da definire'),
    [description]
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href="" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={pageTitle} />
        <meta
          name="og:description"
          property="og:description"
          content={pageDesc}
        />
        <meta property="og:image" content={image || logo} />
        <meta property="og:site_name" content="DevMap" />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={twitter?.title || pageTitle} />
        <meta
          name="twitter:description"
          content={twitter?.description || pageDesc}
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="Lorenzo Faenzi" />
        <meta name="twitter:image" content={twitter?.image || logo} />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
