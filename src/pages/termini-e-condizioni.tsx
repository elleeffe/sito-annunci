import {Container} from '@mui/material';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import PageIntro from '../components/Layout/PageIntro';
import {
  Body1,
  StyledButton,
  Subtitle1,
  TitleH1,
  TitleH5,
} from '../components/MyTypography';

const TermsAndCondition: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Termini e condizioni</TitleH1>
        <Subtitle1 isWhite>Ultimo aggiornamento Novembre 2018</Subtitle1>
      </PageIntro>
      <Container>
        <TitleH5 sx={{paddingTop: '100px'}} gutterBottom>
          1. Oggetto
        </TitleH5>
        <Body1>
          sos-incontri.com è un sito &#40;di seguito, "Sos Incontri" o il
          "Sito"&#41; di Neottolemo LDA, con sede in Rua Dr. Brito Camara, n.
          20, 1 Andar, Freguesia da Sè, 9000-039 Funchal, Madeira, Portugal
          &#40;di seguito, "Neottolemo"&#41; che offre ai propri Utenti, come
          definiti sub 3, un servizio di pubblicazione e consultazione di
          annunci e inserzioni per adulti &#40;di seguito, gli "Annunci"&#41;,
          nei limiti ed alle condizioni stabiliti, in generale, dal presente
          regolamento &#40;di seguito, per brevità, Regolamento&#41; e, in
          particolare, in apposite sezioni del Sito.
        </Body1>
        <TitleH5 sx={{paddingTop: '100px'}} gutterBottom>
          2. Titolarità di Sos incontri
        </TitleH5>
        <Body1 marginBottom="25px">
          Neottolemo è titolare esclusivo di Sos incontri, comprensivo dei
          relativi contenuti, delle infrastrutture web e/o mobile nonché, in
          ogni caso, di ogni pertinente diritto di proprietà intellettuale e/o
          industriale. Il servizio, i loghi, i marchi e tutti gli altri segni
          distintivi di Sos incontri sono registrati in tutto il mondo e il loro
          utilizzo e/o sfruttamento, in qualsiasi forma, sono vietati senza la
          preventiva autorizzazione scritta di Neottolemo. Il trattamento e la
          protezione dei dati personali, dei quali Neottolemo è titolare, sono
          disciplinati dalla nostra <StyledButton>privacy policy</StyledButton>.
        </Body1>
        <Body1>
          In ogni caso, l’Utente &#40;come definito sub 3&#41; dichiara di non
          avere richiesto e si impegna a non richiedere, in qualsiasi ambito
          territoriale, qualsiasi tipo di protezione, legale e/o convenzionale,
          comunque riferibile al Sito, agli Annunci, ai Contenuti &#40;come
          definiti sub 4&#41; e all’eventuale know-how ad essi relativo; ai
          marchi e/o a qualsiasi altro segno distintivo di Neottolemo, di
          qualsiasi altro Utente e/o di terzi.
        </Body1>
        <TitleH5 sx={{paddingTop: '100px'}} gutterBottom>
          3. Applicabilità delle condizioni
        </TitleH5>
        <Body1>
          Il Regolamento si applica a tutti coloro che utilizzano il Sito per
          pubblicare e/o consultare Annunci &#40;di seguito, gli "Utenti"&#41;
          e/o per interagire con altri Utenti.
        </Body1>
      </Container>
    </Layout>
  );
};

export default TermsAndCondition;
