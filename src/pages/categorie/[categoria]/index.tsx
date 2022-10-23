import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import AdsList from '../../../components/AdsList';
import BreadCrumb from '../../../components/BreadCrumb';
import Layout, {PageBody, PageIntro} from '../../../components/Layout';
import {LoadingScreen} from '../../../components/Layout/AuthLoading';
import {TitleH1} from '../../../components/MyTypography';
import {FiltersProvider} from '../../../contexts/FiltersContext';
import {categoryOptions} from '../../../utils/config';

const Category: NextPage = () => {
  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category) {
      router.push('/categorie');
    }
  }, [router, category]);

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
          spacing
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
          ]}
        />
      </PageIntro>
      <PageBody>
        <FiltersProvider
          city={router.query.city as City | undefined}
          category={category.value}
          keyword={router.query.keyword as string | undefined}
        >
          <AdsList />
        </FiltersProvider>
      </PageBody>
    </Layout>
  );
};

export default Category;
