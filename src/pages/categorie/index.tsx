import {useRouter} from 'next/router';
import {FiltersProvider} from '../../contexts/FiltersContext';
import type {NextPage} from 'next';
import {styled, Box, Container} from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import Layout from '../../components/Layout';
import PageIntro from '../../components/Layout/PageIntro';
import {TitleH1} from '../../components/MyTypography';
import AdsFilter from '../../components/AdsFilter';
import AdsList from '../../components/AdsList';

const Categories: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Categorie</TitleH1>
        <BreadCrumb paths={[{label: 'Categorie', path: '/categorie'}]} />
      </PageIntro>
      <Container>
        <Wrap>
          <FiltersProvider
            city={router.query.city as City | undefined}
            keyword={router.query.keyword as string | undefined}
          >
            <AdsFilter />
            <AdsList />
          </FiltersProvider>
        </Wrap>
      </Container>
    </Layout>
  );
};

export default Categories;

const Wrap = styled(Box)(({theme}) => ({
  marginTop: '100px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    marginTop: '25px',
  },
}));
