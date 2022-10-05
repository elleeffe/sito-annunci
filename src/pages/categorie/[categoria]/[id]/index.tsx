import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout, {
  Aside,
  PageBody,
  PageInner,
  PageIntro,
} from '../../../../components/Layout';
import {LoadingScreen} from '../../../../components/Layout/AuthLoading';
import {TitleH1} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';
import {sleep} from '../../../../utils/utils';
import {mockAds} from '../../../../utils/mocks';
import {Box, styled} from '@mui/material';
import AdsGallery from '../../../../components/AdsGallery';

const Detail: NextPage = () => {
  const [detail, setDetail] = useState<Ads | null>();

  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category || !router.query.id) {
      router.push('/categorie');
    }
    if (detail === null) {
      router.push('/404');
    }
  }, [router, category, detail]);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/dettaglio-annuncio', {id: router.query.id});
        // setDetail(response.data)
        await sleep(1000);
        setDetail(mockAds);
      } catch (e: any) {
        console.log(e);
        setDetail(null);
      }
    })();
  });

  if (!category || !router.query.id || !detail) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout title={detail.title}>
      <PageIntro>
        <TitleH1 isWhite>{detail.title}</TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: detail.title,
              path: `/categorie/${router.query.categoria}/${detail.title}`,
            },
          ]}
        />
      </PageIntro>
      <PageBody>
        <PageInner spacingHorizontal="right" spacingVertical="bottom">
          <AdsGallery cover={detail.cover[0]} images={detail.images} />
        </PageInner>
        <Aside>
          <AsideInner></AsideInner>
        </Aside>
      </PageBody>
    </Layout>
  );
};

export default Detail;

const AsideInner = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  overflow: 'overlay',
  flex: 1,
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'initial',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));
