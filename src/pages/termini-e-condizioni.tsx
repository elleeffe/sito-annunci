import type {NextPage} from 'next';
import Layout from '../components/Layout';
import {PageIntro} from '../components/Layout';
import {TitleH3, TitleH1} from '../components/MyTypography';

const TermsAndCondition: NextPage = () => {
  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Termini e condizioni</TitleH1>
        <TitleH3 isWhite>Ultimo aggiornamento Novembre 2018</TitleH3>
      </PageIntro>
    </Layout>
  );
};

export default TermsAndCondition;
