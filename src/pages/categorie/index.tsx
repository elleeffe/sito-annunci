import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Layout from '../../components/Layout';
import {LoadingScreen} from '../../components/Layout/AuthLoading';
import PageIntro from '../../components/Layout/PageIntro';
import {TitleH1} from '../../components/MyTypography';

const Categories: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.city) {
      router.push('/');
    }
  }, [router]);

  if (!router.query.city) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Categorie</TitleH1>
        <BreadCrumb paths={[{label: 'Categorie', path: '/categorie'}]} />
      </PageIntro>
    </Layout>
  );
};

export default Categories;
