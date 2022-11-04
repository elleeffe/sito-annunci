import {useState} from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
import axios from 'axios';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout, {
  PageBody,
  PageInner,
  PageIntro,
} from '../../../../components/Layout';
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

type PageProps = {
  adv: Ads;
  category: {
    value: Category;
    label: string;
  };
};

const Detail: NextPage<PageProps> = ({adv, category}) => {
  const [report, setReport] = useState<boolean>(false);

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
          <Body1>{adv.description}</Body1>
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

  console.log(query);

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
