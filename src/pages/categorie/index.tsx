import {useRouter} from 'next/router';
import {FiltersProvider} from '../../contexts/FiltersContext';
import type {NextPage} from 'next';
import BreadCrumb from '../../components/BreadCrumb';
import Layout, {PageBody, PageIntro} from '../../components/Layout';
import {TitleH1} from '../../components/MyTypography';
import AdsList from '../../components/AdsList';

const Categories: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="Tutte le categorie">
      <PageIntro>
        <TitleH1 isWhite>Tutte le categorie</TitleH1>
        <BreadCrumb
          paths={[{label: 'Tutte le categorie', path: '/categorie'}]}
        />
      </PageIntro>
      <PageBody>
        <FiltersProvider
          city={router.query.city as City | undefined}
          keyword={router.query.keyword as string | undefined}
        >
          <AdsList />
        </FiltersProvider>
      </PageBody>
    </Layout>
  );
};

export default Categories;
