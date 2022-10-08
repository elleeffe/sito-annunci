import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {Box, Container, Grid, styled} from '@mui/material';
import CardSlider from '../components/Card/CardSlider';
import segnapostoCta from '../assets/img/segnaposto-cta.png';
import HeroBanner from '../components/Hero/HeroBanner';
import {Subtitle1, TitleH1, TitleH2} from '../components/MyTypography';
import {categoryCards} from '../utils/config';
import HomeForm from '../components/Forms/HomeForm';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Intro>
        <Container>
          <Grid container justifyContent="center">
            <Grid item lg={10} textAlign="center">
              <TitleH1 gutterBottom isWhite>
                The Easiest Way to Get Your New Job
              </TitleH1>
              <Subtitle1 isWhite>
                Work with talented people at the most affordable price to get
                the most out of your time and cost
              </Subtitle1>
              <HomeForm />
            </Grid>
          </Grid>
        </Container>
      </Intro>
      <Container sx={{paddingTop: '100px'}}>
        <Grid container justifyContent="center">
          <Grid item sm={10} md={8} textAlign="center">
            <TitleH2 gutterBottom>Our categories</TitleH2>
            <Subtitle1>
              Uniquely promote adaptive quality vectors rather than stand-alone
              e-markets. pontificate alternative architectures whereas iterate.
            </Subtitle1>
          </Grid>
        </Grid>
      </Container>
      <CardSlider cards={categoryCards} autoPlay />
      <HeroBanner
        variant="primary"
        title="Find the talent needed to get your business growing."
        subtitle="Advertise your jobs to millions of monthly users and search 15.8 million CVs"
        button={{
          caption: 'Pubblica annuncio',
          action: () => router.push('/pubblica-annuncio'),
          icon: 'ArrowForwardIos',
        }}
        img={{
          src: segnapostoCta.src,
          alt: 'segnaposto-cta',
        }}
      />
    </Layout>
  );
};

export default Home;

const Intro = styled(Box)(({theme}) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.primary.main,
  paddingTop: '100px',
  paddingBottom: '100px',
}));
