import React from 'react';
import type {NextPage} from 'next';
import {Box, Grid, Paper, styled} from '@mui/material';
import Layout from '../components/Layout';
import MyStepper from '../components/MyStepper';
import {Form} from 'react-final-form';
import {Body2, TitleH6} from '../components/MyTypography';
import MySelect from '../components/Fields/MySelect';
import MyTextField from '../components/Fields/MyTextField';
import {isRequired} from '../utils/fields';
import MyAutocomplete from '../components/Fields/MyAutocomplete';

const Publish: NextPage = () => {
  return (
    <Layout hidePublish>
      <Wrap>
        <StyledPaper>
          <Form onSubmit={console.log}>
            {({
              handleSubmit,
              submitting,
              hasValidationErrors,
              pristine,
              values,
            }) => {
              return (
                <form onSubmit={(e) => e.preventDefault()}>
                  <MyStepper
                    alternativeLabel
                    steps={[
                      {
                        label: 'Informazioni',
                        screen: (
                          <Box display="flex" flexDirection="column">
                            <TitleH6 marginBottom="25px">
                              Informazioni annuncio
                            </TitleH6>
                            <Body2 marginBottom="25px">
                              * Campi obbligatori
                            </Body2>
                            <Grid
                              container
                              columnSpacing={3}
                              rowSpacing={3}
                              marginBottom="25px"
                            >
                              <Grid item xs={12} md={6}>
                                <MySelect
                                  name="category"
                                  placeholder="Categoria*"
                                  validate={isRequired}
                                  options={[
                                    {value: 'all', label: 'Tutte le categorie'},
                                    {value: 'donna', label: 'Donna'},
                                    {value: 'uomo', label: 'Uomo'},
                                  ]}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <MyAutocomplete
                                  name="city"
                                  placeholder="Città"
                                  validate={isRequired}
                                  options={[
                                    {value: 'all', label: 'Tutte le città'},
                                    {value: 'roma', label: 'Roma'},
                                    {value: 'napoli', label: 'Napoli'},
                                  ]}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <MyTextField
                                  name="address"
                                  placeholder="Indirizzo"
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <MyTextField
                                  name="areas"
                                  placeholder="Zona / Quartiere"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        ),
                        action: !submitting ? handleSubmit : undefined,
                        loading: submitting,
                        disabled: hasValidationErrors || pristine,
                      },
                      {
                        label: 'Aggiungi foto',
                        screen: <h1>Aggiungi foto</h1>,
                        action: !submitting ? handleSubmit : undefined,
                        loading: submitting,
                        disabled: hasValidationErrors || pristine,
                      },
                      {
                        label: 'Visibilità',
                        screen: <h1>Visibilità</h1>,
                        action: !submitting ? handleSubmit : undefined,
                        loading: submitting,
                        disabled: hasValidationErrors || pristine,
                      },
                      {
                        label: 'Conferma',
                        screen: <h1>Conferma</h1>,
                        action: () => {},
                      },
                    ]}
                    final={{
                      screen: <h1>Annuncio caricato con successo</h1>,
                      action: () => {},
                      button: {
                        label: 'Vai al profilo',
                      },
                    }}
                  />
                </form>
              );
            }}
          </Form>
        </StyledPaper>
      </Wrap>
    </Layout>
  );
};

export default Publish;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  paddingTop: '100px',
  background: theme.palette.primary.main,
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '1100px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '25px',
}));
