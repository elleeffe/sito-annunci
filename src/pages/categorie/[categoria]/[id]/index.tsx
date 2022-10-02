import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout from '../../../../components/Layout';
import {LoadingScreen} from '../../../../components/Layout/AuthLoading';
import PageIntro from '../../../../components/Layout/PageIntro';
import {TitleH1} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';

const Detail: NextPage = () => {
  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category || !router.query.id) {
      router.push('/categorie');
    }
  }, [router, category]);

  if (!category || !router.query.id) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Mostrare titolo annuncio</TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: 'Mostrare titolo annuncio',
              path: `/categorie/${router.query.categoria}/${router.query.id}`,
            },
          ]}
        />
      </PageIntro>
    </Layout>
  );
};

export default Detail;
