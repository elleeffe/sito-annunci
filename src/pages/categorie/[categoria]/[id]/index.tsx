import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout, {
  PageBody,
  PageInner,
  PageIntro,
} from '../../../../components/Layout';
import {LoadingScreen} from '../../../../components/Layout/AuthLoading';
import {Body1, TitleH3, TitleH5} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';
import {sleep} from '../../../../utils/utils';
import {mockAds} from '../../../../utils/mocks';
import AdsGallery from '../../../../components/AdsDetail/AdsGallery';

import AdsAside from '../../../../components/AdsDetail/AdsAside';
import HeroBanner from '../../../../components/Hero/HeroBanner';
import segnapostoBg from '../../../../assets/img/segnaposto-bg.jpeg';
import ReportModal from '../../../../components/AdsDetail/ReportModal';
import {Box, Chip, styled} from '@mui/material';

const Detail: NextPage = () => {
  const [detail, setDetail] = useState<Ads | null>();
  const [report, setReport] = useState<boolean>(false);

  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category || !router.query.id) {
      router.push('/categorie');
    }
    if (detail === null) {
      router.push('/404');
    }
  }, [router, category, detail]);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/dettaglio-annuncio', {id: router.query.id});
        // setDetail(response.data)
        await sleep(1000);
        setDetail(mockAds);
      } catch (e: any) {
        console.log(e);
        setDetail(null);
      }
    })();
  });

  if (!category || !router.query.id || !detail) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout title={detail.title}>
      <PageIntro isFree>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: detail.id || '',
              path: `/categorie/${router.query.categoria}/${detail.id}`,
            },
          ]}
        />
      </PageIntro>
      <StyledPageBody>
        <PageInner spacingHorizontal="right" spacingVertical="bottom">
          <AdsGallery cover={detail.cover[0]} images={detail.images} />
          <TitleH3 marginBottom="15px" marginTop="15px">
            {detail.title}
          </TitleH3>
          <Body1>{detail.description}</Body1>
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
              Città: <span>{detail.city.toUpperCase()}</span>
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
              <span>{detail.neighborhood && `${detail.neighborhood}`}</span>
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
            {detail.areas &&
              !!detail.areas.length &&
              detail.areas.map((area) => (
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
        </PageInner>
        <AdsAside detail={detail} />
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
      {report && !!detail.id && (
        <ReportModal
          isOpen={report}
          onClose={() => setReport(false)}
          detailId={detail.id}
        />
      )}
    </Layout>
  );
};

export default Detail;

const StyledPageBody = styled(PageBody)(({theme}) => ({
  marginBottom: '100px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '50px',
  },
}));
