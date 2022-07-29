import {useCallback} from 'react';
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {Box, Button, Container, Grid, styled} from '@mui/material';
import {Form} from 'react-final-form';
import MyTextField from '../components/Fields/MyTextField';
import MySelect from '../components/Fields/MySelect';
import CardSlider from '../components/CardSlider';
import segnaposto from '../assets/img/segnaposto.jpeg';
import segnapostoCta from '../assets/img/segnaposto-cta.png';
import {CardItemType} from '../components/SimpleCard';
import CallToAction from '../components/CallToAction';
import MyAutocomplete from '../components/Fields/MyAutocomplete';
import {Subtitle1, TitleH1, TitleH2} from '../components/MyTypography';
import {categoryOptions, cityOptions} from '../utils/config';

const cards: CardItemType[] = [
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Titolo card 1',
    caption:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    button: {
      caption: 'Scopri di più',
      action: () => {},
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 1034,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Titolo card 2',
    caption:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    button: {
      caption: 'Scopri di più',
      action: () => {},
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 884,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Titolo card 3',
    caption:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    button: {
      caption: 'Scopri di più',
      action: () => {},
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 239,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Titolo card 4',
    caption:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    button: {
      caption: 'Scopri di più',
      action: () => {},
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 587,
  },
];

type FormValues = {
  category: Category;
  city: City;
  keyword: string;
};

const Home: NextPage = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    (values: FormValues) => console.log(values),
    []
  );

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
              <Form<FormValues>
                onSubmit={handleSubmit}
                initialValues={{category: 'all'}}
              >
                {({handleSubmit}) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <FilterWrap container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12} md={3}>
                          <MySelect
                            id="category"
                            name="category"
                            placeholder="Categoria"
                            options={categoryOptions}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MyAutocomplete
                            name="city"
                            placeholder="Città"
                            options={cityOptions}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MyTextField
                            name="keyword"
                            placeholder="Sto cercando..."
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{width: '100%'}}
                          >
                            Cerca
                          </Button>
                        </Grid>
                      </FilterWrap>
                    </form>
                  );
                }}
              </Form>
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
      <CardSlider cards={cards} autoPlay />
      <CallToAction
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

const FilterWrap = styled(Grid)(({theme}) => ({
  background: theme.palette.background.default,
  borderRadius: '50px',
  marginTop: '25px',
  padding: '0px 16px 16px 0px',
  justifyContent: 'space-between',
  width: '100%',
  marginLeft: 0,

  [theme.breakpoints.down('md')]: {
    borderRadius: '25px',
  },
}));
