import type {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
import AdsList from '../../../components/AdsList';
import BreadCrumb from '../../../components/BreadCrumb';
import Layout, {PageBody, PageIntro} from '../../../components/Layout';
import {TitleH1} from '../../../components/MyTypography';
import {FiltersProvider} from '../../../contexts/FiltersContext';
import {categoryOptions} from '../../../utils/config';

type PageProps = {
  category: {
    value: Category;
    label: string;
  };
};

const Category: NextPage<PageProps> = ({category}) => {
  const router = useRouter();

  return (
    <Layout title={category.label}>
      <PageIntro>
        <TitleH1 isWhite>{category.label}</TitleH1>
        <BreadCrumb
          spacing
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${category.value}`,
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

export const getServerSideProps: GetServerSideProps<PageProps | any> = async (
  context
) => {
  const {query} = context;

  if (
    'categoria' in query &&
    typeof query.categoria === 'string' &&
    !!categoryOptions.find((el) => el.value === query.categoria)
  ) {
    return {
      props: {
        category: categoryOptions.find((el) => el.value === query.categoria),
      },
    };
  }

  return {
    notFound: true,
  };
};
