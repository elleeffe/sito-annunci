import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {Box, Container, Grid, styled} from '@mui/material';
import CardSlider from '../components/Card/CardSlider';
import segnapostoCta from '../assets/img/segnaposto-cta.png';
import HeroBanner from '../components/Hero/HeroBanner';
import {TitleH1, TitleH2, TitleH3, TitleH4} from '../components/MyTypography';
import {categoryCards} from '../utils/config';
import HomeForm from '../components/Forms/HomeForm';
import homeBg from '../assets/img/home-bg.jpeg';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Intro>
        <Container sx={{position: 'relative', zIndex: 1}}>
          <Grid container>
            <Grid item xs={12}>
              <TitleH1>Find Nearby Attractions</TitleH1>
              <TitleH4>
                Expolore top-rated attractions, activities and more
              </TitleH4>
              <HomeForm />
            </Grid>
          </Grid>
        </Container>
      </Intro>
      <Container sx={{paddingTop: '100px'}}>
        <Grid container justifyContent="center">
          <Grid item sm={10} md={8} textAlign="center">
            <TitleH2 gutterBottom>Our categories</TitleH2>
            <TitleH3>
              Uniquely promote adaptive quality vectors rather than stand-alone
              e-markets. pontificate alternative architectures whereas iterate.
            </TitleH3>
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
  paddingTop: '100px',
  paddingBottom: '100px',
  position: 'relative',
  backgroundImage: `url(${homeBg.src})`,
  backgroundSize: 'cover',
  backgroundRepea: 'no-repeat',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'block',
    background:
      'linear-gradient(to right, rgba(255,255,255,0.99) 20%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 95%)',
    zIndex: 0,
  },
}));
