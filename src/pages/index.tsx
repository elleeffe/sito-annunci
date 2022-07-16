import type {NextPage} from 'next';
import Layout from '../components/Layout';
import {Box, Button, Container, Grid, styled, Typography} from '@mui/material';
import {Form} from 'react-final-form';
import MyTextField from '../components/Fields/MyTextField';
import MySelect from '../components/Fields/MySelect';
import CardSlider, {CardItemType} from '../components/CardSlider';
import segnaposto from '../assets/img/segnaposto.jpeg';

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
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <Intro>
        <Container>
          <Grid container justifyContent="center">
            <Grid item lg={10}>
              <Typography variant="h2" textAlign="center">
                The Easiest Way to Get Your New Job
              </Typography>
              <FilterWrap container columnSpacing={2} rowSpacing={2}>
                <Form onSubmit={console.log}>
                  {({handleSubmit}) => (
                    <>
                      <Grid item xs={12} sm={4} md={3}>
                        <MyTextField
                          name="keyword"
                          placeholder="Sto cercando..."
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <MySelect
                          name="category"
                          placeholder="Categoria"
                          options={[
                            {value: '', label: 'Nessuna categoria'},
                            {value: 'donna', label: 'Donna'},
                            {value: 'uomo', label: 'Uomo'},
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <MySelect
                          name="city"
                          placeholder="Città"
                          options={[
                            {value: 'roma', label: 'Roma'},
                            {value: 'napoli', label: 'Napoli'},
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          sx={{width: '100%'}}
                        >
                          Cerca
                        </Button>
                      </Grid>
                    </>
                  )}
                </Form>
              </FilterWrap>
            </Grid>
          </Grid>
        </Container>
      </Intro>
      <CardSlider cards={cards} autoPlay />
    </Layout>
  );
};

export default Home;

const Intro = styled(Box)(({theme}) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.info.main,
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
