import React, {PropsWithChildren, useMemo} from 'react';
import Head from 'next/head';
import logo from '../../../public/logo.svg';
import Header from './Header';
import Footer from './Footer';
import {Box, Container, styled} from '@mui/material';

interface Props extends PropsWithChildren<{}> {
  hideHeader?: boolean;
  hidePublish?: boolean;
  title?: string;
  description?: string;
  image?: string;
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const Layout = ({
  hideHeader,
  hidePublish,
  title,
  description,
  image,
  twitter,
  children,
}: Props) => {
  const pageTitle = useMemo(
    () =>
      title ? `${title} | Secret Jungle` : 'Secret Jungle - Annunci selvaggi',
    [title]
  );

  const pageDesc = useMemo(
    () => (description ? description : 'Secret Jungle - Annunci selvaggi'),
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
      {!hideHeader && <Header hidePublish={hidePublish} />}
      {children}
      {!hideHeader && <Footer />}
    </>
  );
};

export default Layout;

export const PageBody = ({children}: PropsWithChildren<{}>) => (
  <Container>
    <PageBodyWrap>{children}</PageBodyWrap>
  </Container>
);

const PageBodyWrap = styled(Box)(({theme}) => ({
  marginTop: '100px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    marginTop: '25px',
  },
}));

export const PageIntro = ({children}: PropsWithChildren<{}>) => {
  return (
    <>
      <PageIntroWrap>
        <Inner>{children}</Inner>
      </PageIntroWrap>
    </>
  );
};

const PageIntroWrap = styled(Box)(({theme}) => ({
  background: theme.palette.primary.main,
  height: '250px',
  marginTop: '60px',
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  overflow: 'hidden',
}));

export const Aside = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'mobileOrder',
})<{mobileOrder?: number}>(({theme, mobileOrder}) => ({
  height: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'sticky',
  top: '75px',
  left: 0,
  width: '300px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'initial',
    position: 'initial',
    ...(mobileOrder && {order: mobileOrder}),
  },
}));

export const PageInner = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'spacingHorizontal' &&
    prop !== 'spacingVertical' &&
    prop !== 'mobileOrder',
})<{
  spacingHorizontal: 'left' | 'right';
  spacingVertical: 'top' | 'bottom';
  mobileOrder?: number;
}>(({theme, spacingHorizontal, spacingVertical, mobileOrder}) => ({
  flex: 1,
  maxWidth: 'calc(100% - 320px)',
  display: 'flex',
  flexDirection: 'column',
  ...(spacingHorizontal === 'left'
    ? {paddingLeft: '20px'}
    : {paddingRight: '20px'}),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flex: 'initial',
    paddingLeft: '0px',
    paddingRight: '0px',
    maxWidth: 'initial',
    ...(mobileOrder && {order: mobileOrder}),
    ...(spacingVertical === 'top'
      ? {paddingTop: '20px'}
      : {paddingBottom: '20px'}),
  },
}));
