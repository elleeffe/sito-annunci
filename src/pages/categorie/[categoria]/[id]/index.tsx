/* eslint-disable react/prop-types */
import {useCallback, useEffect, useState} from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
import axios from 'axios';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout, {
  PageBody,
  PageInner,
  PageIntro,
} from '../../../../components/Layout';
import {
  Body1,
  TitleH3,
  TitleH4,
  TitleH5,
} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';
import {sleep} from '../../../../utils/utils';
import {mockAds} from '../../../../utils/mocks';
import AdsGallery from '../../../../components/AdsDetail/AdsGallery';

import AdsAside from '../../../../components/AdsDetail/AdsAside';
import HeroBanner from '../../../../components/Hero/HeroBanner';
import segnapostoBg from '../../../../assets/img/segnaposto-bg.jpeg';
import ReportModal from '../../../../components/AdsDetail/ReportModal';
import {Alert, Box, Button, Chip, styled} from '@mui/material';
import SkeletonCard from '../../../../components/Card/SkeletonCard';
import CommentIcon from '@mui/icons-material/Comment';

type PageProps = {
  adv: Ads;
  category: {
    value: Category;
    label: string;
  };
};

const Detail: NextPage<PageProps> = ({adv, category}) => {
  const [report, setReport] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>();
  const [error, setError] = useState<boolean>(false);

  const getComments = useCallback(async () => {
    try {
      // TODO - use detailId
      await sleep(3000);
      setComments([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  const router = useRouter();

  return (
    <Layout title={adv.title}>
      <PageIntro isFree>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: adv.id || '',
              path: `/categorie/${router.query.categoria}/${adv.id}`,
            },
          ]}
        />
      </PageIntro>
      <StyledPageBody>
        <PageInner spacingHorizontal="right" spacingVertical="bottom">
          <AdsGallery cover={adv.cover[0]} images={adv.images} />
          <TitleH3 marginBottom="15px" marginTop="15px">
            {adv.title}
          </TitleH3>
          <Body1 isThin>{adv.description}</Body1>
          <Box display="flex" flexWrap="wrap">
            <TitleH5
              sx={{
                marginTop: '25px',
                marginRight: '25px',
                span: {
                  color: 'primary.main',
                },
              }}
            >
              Città: <span>{adv.city.toUpperCase()}</span>
            </TitleH5>

            <TitleH5
              sx={{
                marginTop: '25px',
                span: {
                  color: 'primary.main',
                },
              }}
            >
              Quartiere:{' '}
              <span>{adv.neighborhood && `${adv.neighborhood}`}</span>
            </TitleH5>
          </Box>

          <TitleH5
            sx={{
              marginTop: '25px',
              marginBottom: '5px',
            }}
          >
            Zone limitrofe:
          </TitleH5>
          <Box display="flex" flexWrap="wrap">
            {adv.areas &&
              !!adv.areas.length &&
              adv.areas.map((area) => (
                <Chip
                  color="primary"
                  key={area}
                  label={area}
                  sx={{
                    marginBottom: '8px',
                    marginRight: '9px',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                />
              ))}
          </Box>
          <Box marginTop="75px">
            <TitleH3 marginBottom="15px">
              Recensioni{' '}
              {comments && !!comments.length && `(${comments.length})`}
            </TitleH3>
            {!comments && !error && <SkeletonCard whiteBg />}
            {error && (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={getComments}>
                    Riprova
                  </Button>
                }
              >
                Si è verificato un errore, riprovare.
              </Alert>
            )}
            {comments &&
              !error &&
              (!!comments.length ? (
                comments.map((el, i) => (
                  <Box key={i}>recensione + {i + 1} (UI da fare)</Box>
                ))
              ) : (
                <Body1>Nessuna recensione</Body1>
              ))}
          </Box>
        </PageInner>
        <AdsAside detail={adv} />
      </StyledPageBody>
      <HeroBanner
        title="Contenuto non appropriato?"
        subtitle="Invia agli amministratori una segnalazione, visioneremo l'annuncio nel minor tempo possibile."
        button={{
          caption: 'Segnala annuncio',
          action: () => setReport(true),
          icon: 'ArrowForwardIos',
        }}
        img={{
          src: segnapostoBg.src,
        }}
      />
      {report && !!adv.id && (
        <ReportModal
          isOpen={report}
          onClose={() => setReport(false)}
          detailId={adv.id}
        />
      )}
    </Layout>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<PageProps | any> = async (
  context
) => {
  const {query} = context;

  if (
    'id' in query &&
    'categoria' in query &&
    typeof query.categoria === 'string' &&
    !!categoryOptions.find((el) => el.value === query.categoria)
  ) {
    try {
      await sleep(1000);
      return {
        props: {
          category: categoryOptions.find((el) => el.value === query.categoria),
          adv: mockAds,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

const StyledPageBody = styled(PageBody)(({theme}) => ({
  marginBottom: '100px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '50px',
  },
}));
