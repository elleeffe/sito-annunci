import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import BreadCrumb from '../../components/BreadCrumb';
import Layout from '../../components/Layout';
import PageIntro from '../../components/Layout/PageIntro';
import {TitleH1} from '../../components/MyTypography';
import {getCategoryLabel} from '../../utils/utils';

const Category: NextPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>
          {getCategoryLabel(router.query.categoria as Category)}
        </TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: getCategoryLabel(router.query.categoria as Category),
              path: `/categorie/${router.query.categoria}`,
            },
          ]}
        />
      </PageIntro>
    </Layout>
  );
};

export default Category;
