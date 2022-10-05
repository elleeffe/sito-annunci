import type {NextPage} from 'next';
import BreadCrumb from '../components/BreadCrumb';
import Layout, {PageIntro} from '../components/Layout';
import {TitleH1} from '../components/MyTypography';

const NotFound: NextPage = () => {
  return (
    <Layout title="404">
      <PageIntro>
        <TitleH1 isWhite>Pagina non trovata</TitleH1>
        <BreadCrumb paths={[{label: '404 - Pagina non trovata'}]} />
      </PageIntro>
    </Layout>
  );
};

export default NotFound;
