import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {Box, Container, Grid, styled} from '@mui/material';
import CardSlider from '../components/Card/CardSlider';
import segnapostoBg from '../assets/img/segnaposto-bg.jpeg';
import HeroBanner from '../components/Hero/HeroBanner';
import {
  Body1,
  Subtitle,
  TitleH1,
  TitleH2,
  TitleH4,
  TitleH5,
} from '../components/MyTypography';
import {categoryCards} from '../utils/config';
import HomeForm from '../components/Forms/HomeForm';
import homeBg from '../assets/img/home-bg.jpeg';
import MapIcon from '@mui/icons-material/Map';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Intro>
        <Container sx={{position: 'relative', zIndex: 1}}>
          <Grid container>
            <Grid item xs={12}>
              <TitleH1>Find Nearby Attractions</TitleH1>
              <TitleH5>
                Expolore top-rated attractions, activities and more
              </TitleH5>
              <HomeForm />
            </Grid>
          </Grid>
        </Container>
      </Intro>
      <Container sx={{paddingTop: '100px'}}>
        <Grid container justifyContent="center">
          <Grid item sm={10} md={8} textAlign="center">
            <TitleH2 gutterBottom>Our categories</TitleH2>
            <Subtitle as="h3">
              Browse <span>the most desirable</span> categories
            </Subtitle>
          </Grid>
        </Grid>
      </Container>
      <CardSlider cards={categoryCards} autoPlay spacingBottom />
      <Container>
        <TitleH2 as="h3" gutterBottom textAlign="center">
          Plan The Vacation of Your Dreams
        </TitleH2>
        <Subtitle as="h4" textAlign="center">
          Explore some of the best tips from around the world from our partners
          and friends.
          <br /> Discover some of the most popular listings in Sydney.
        </Subtitle>
        <ColumnWrap container>
          <Column item xs={10} sm={8} md={4}>
            <ColumnIcon />
            <TitleH4 marginBottom="10px">Find Interesting Place</TitleH4>
            <Body1>
              Proin dapibus nisl ornare diam varius tempus. Aenean a quam
              luctus, finibus tellus ut, convallis eros sollicitudin turpis.
            </Body1>
          </Column>
          <Column item xs={10} sm={8} md={4} isCenter>
            <ColumnIcon />
            <TitleH4 marginBottom="10px">Find Interesting Place</TitleH4>
            <Body1>
              Proin dapibus nisl ornare diam varius tempus. Aenean a quam
              luctus, finibus tellus ut, convallis eros sollicitudin turpis.
            </Body1>
          </Column>
          <Column item xs={10} sm={8} md={4}>
            <ColumnIcon />
            <TitleH4 marginBottom="10px">Find Interesting Place</TitleH4>
            <Body1>
              Proin dapibus nisl ornare diam varius tempus. Aenean a quam
              luctus, finibus tellus ut, convallis eros sollicitudin turpis.
            </Body1>
          </Column>
        </ColumnWrap>
      </Container>
      <HeroBanner
        morePadding
        title="Find the talent needed to get your business growing."
        subtitle="Advertise your jobs to millions of monthly users and search 15.8 million CVs"
        button={{
          caption: 'Pubblica annuncio',
          action: () => router.push('/pubblica-annuncio'),
          icon: 'ArrowForwardIos',
        }}
        img={{
          src: segnapostoBg.src,
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

const ColumnWrap = styled(Grid)(({theme}) => ({
  justifyContent: 'space-between',
  marginTop: '75px',
  marginBottom: '150px',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

const Column = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isCenter',
})<{isCenter?: boolean}>(({theme, isCenter}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 20px',
  position: 'relative',
  ...(isCenter && {
    '&::after, &::before': {
      content: '""',
      width: '50%',
      height: '1px',
      background: '#e9e9e9',
      position: 'absolute',
      top: '50px',
    },
    '&::after': {
      left: '-25%',
    },
    '&::before': {
      right: '-25%',
    },
  }),

  [theme.breakpoints.down('md')]: {
    marginBottom: '100px',
    ...(isCenter && {
      '&::after, &::before': {
        display: 'none',
      },
    }),
  },
}));

const ColumnIcon = styled(MapIcon)(({theme}) => ({
  width: '100px',
  height: '100px',
  marginBottom: '25px',
  color: theme.palette.primary.main,
}));
