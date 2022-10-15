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
import {
  Body1,
  TitleH4,
  TitleH1,
  TitleH3,
  TitleH5,
} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';
import {sleep} from '../../../../utils/utils';
import {mockAds} from '../../../../utils/mocks';
import AdsGallery from '../../../../components/AdsDetail/AdsGallery';

import AdsAside from '../../../../components/AdsDetail/AdsAside';
import HeroBanner from '../../../../components/Hero/HeroBanner';
import segnapostoCta from '../../../../assets/img/segnaposto-cta.png';
import ReportModal from '../../../../components/AdsDetail/ReportModal';
import {Box, Chip} from '@mui/material';

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
      <PageIntro>
        <TitleH1 isWhite isEllipsis>
          {detail.title}
        </TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: detail.title,
              path: `/categorie/${router.query.categoria}/${detail.id}`,
            },
          ]}
        />
      </PageIntro>
      <PageBody>
        <PageInner spacingHorizontal="right" spacingVertical="bottom">
          <AdsGallery cover={detail.cover[0]} images={detail.images} />
          <TitleH3 marginBottom="45px" marginTop="25px">
            {detail.title}
          </TitleH3>
          <Body1>{detail.description}</Body1>
          <TitleH4
            sx={{
              marginTop: '25px',
            }}
          >
            <strong>Quartiere:</strong>
          </TitleH4>
          <TitleH5 sx={{color: 'primary.main'}}>
            {detail.city.toUpperCase()}
            {detail.neighborhood && `, ${detail.neighborhood}`}
          </TitleH5>
          <TitleH4
            sx={{
              marginTop: '25px',
              marginBottom: '5px',
            }}
          >
            <strong>Zone limitrofe:</strong>
          </TitleH4>
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
      </PageBody>
      <HeroBanner
        variant="primary"
        title="Contenuto non appropriato?"
        subtitle="Invia agli amministratori una segnalazione, visioneremo l'annuncio nel minor tempo possibile."
        button={{
          caption: 'Segnala annuncio',
          action: () => setReport(true),
          icon: 'ArrowForwardIos',
        }}
        img={{
          src: segnapostoCta.src,
          alt: 'segnaposto-cta',
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