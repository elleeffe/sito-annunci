import {useCallback} from 'react';
import {useRouter} from 'next/router';
import {Form} from 'react-final-form';
import {Button, Grid, styled} from '@mui/material';
import MyAutocomplete from '../Fields/MyAutocomplete';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {categoryOptions, cityOptions} from '../../utils/config';
import {isRequired} from '../../utils/fields';

const HomeForm = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    (values: HomeFormValues) => {
      const {city, category, keyword} = values;
      const query: {city: City; category?: Category; keyword?: string} = {city};
      if (keyword) {
        query.keyword = keyword;
      }
      if (!category) {
        router.push({
          pathname: '/categorie',
          query,
        });
      } else {
        router.push({
          pathname: `/categorie/${values.category}`,
          query,
        });
      }
    },
    [router]
  );

  return (
    <Form<HomeFormValues> onSubmit={handleSubmit}>
      {({handleSubmit, hasValidationErrors}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FilterWrap container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} md={3}>
                <MyAutocomplete
                  name="city"
                  placeholder="Città*"
                  options={cityOptions}
                  validate={(value) => isRequired(value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <MySelect
                  id="category"
                  name="category"
                  placeholder="Categoria"
                  options={categoryOptions}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <MyTextField name="keyword" placeholder="Sto cercando..." />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{width: '100%'}}
                  disabled={hasValidationErrors}
                >
                  Cerca
                </Button>
              </Grid>
            </FilterWrap>
          </form>
        );
      }}
    </Form>
  );
};

export default HomeForm;

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
