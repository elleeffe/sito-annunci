import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Layout from '../../components/Layout';
import {LoadingScreen} from '../../components/Layout/AuthLoading';
import PageIntro from '../../components/Layout/PageIntro';
import {TitleH1} from '../../components/MyTypography';
import {categoryOptions} from '../../utils/config';

const Category: NextPage = () => {
  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category) {
      router.push('/');
    }
  }, [category, router]);

  if (!category) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>{category.label}</TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
          ]}
        />
      </PageIntro>
    </Layout>
  );
};

export default Category;
