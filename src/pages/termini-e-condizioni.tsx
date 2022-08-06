import type {NextPage} from 'next';
import Layout from '../components/Layout';
import PageIntro from '../components/Layout/PageIntro';
import {Subtitle1, TitleH1} from '../components/MyTypography';

const TermsAndCondition: NextPage = () => {
  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Termini e condizioni</TitleH1>
        <Subtitle1 isWhite>Ultimo aggiornamento Novembre 2018</Subtitle1>
      </PageIntro>
    </Layout>
  );
};

export default TermsAndCondition;
