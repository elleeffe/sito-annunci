import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import BreadCrumb from '../../components/BreadCrumb';
import Layout from '../../components/Layout';
import PageIntro from '../../components/Layout/PageIntro';
import {TitleH1} from '../../components/MyTypography';

const Categories: NextPage = () => {
  const router = useRouter();

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
