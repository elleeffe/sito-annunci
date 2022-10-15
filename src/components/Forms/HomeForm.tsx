import {useCallback} from 'react';
import {useRouter} from 'next/router';
import {Form} from 'react-final-form';
import {Button, Grid, styled} from '@mui/material';
import MyAutocomplete from '../Fields/MyAutocomplete';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {categoryOptions, cityOptions} from '../../utils/config';

const HomeForm = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    (values: HomeFormValues) => {
      const {city, category, keyword} = values;
      const query: {city?: City; keyword?: string} = {};
      if (city) {
        query.city = city;
      }
      if (keyword) {
        query.keyword = keyword;
      }
      if (!category) {
        router.push({
          pathname: '/categorie',
          query: !!Object.keys(query).length ? query : undefined,
        });
      } else {
        router.push({
          pathname: `/categorie/${values.category}`,
          query: !!Object.keys(query).length ? query : undefined,
        });
      }
    },
    [router]
  );

  return (
    <Form<HomeFormValues> onSubmit={handleSubmit}>
      {({handleSubmit}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FilterWrap container>
              <StyledGrid item xs={12} md={3}>
                <HomeFormAutocomplete
                  name="city"
                  placeholder="Città"
                  options={cityOptions}
                />
              </StyledGrid>
              <StyledGrid item xs={12} md={3}>
                <HomeFormSelect
                  id="category"
                  name="category"
                  placeholder="Categoria"
                  options={categoryOptions}
                />
              </StyledGrid>
              <Grid item xs={12} md={3}>
                <HomeFormTextField
                  name="keyword"
                  placeholder="Sto cercando..."
                />
              </Grid>
              <Grid item xs={12} md={3} display="flex" justifyContent="center">
                <StyledButton
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{width: '100%'}}
                  color="warning"
                >
                  Cerca
                </StyledButton>
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
  padding: '12px',
  justifyContent: 'space-between',
  width: '100%',
  marginLeft: 0,
  boxShadow: '0 0 8px 0 rgb(0 0 0 / 12%)',

  [theme.breakpoints.down('md')]: {
    padding: 0,
    borderRadius: 'initial',
    background: 'transparent',
  },
}));

const StyledGrid = styled(Grid)(({theme}) => ({
  borderRightColor: 'rgba(0,0,0,0.23)',
  borderRightStyle: 'solid',
  borderRightWidth: 1,

  [theme.breakpoints.down('md')]: {
    marginBottom: '25px',
    borderRight: 'none',
  },
}));

const HomeFormAutocomplete = styled(MyAutocomplete)(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    '& .MuiInputBase-root': {
      borderRadius: '0px !important',
    },
    '& fieldset': {
      borderColor: 'transparent !important',
    },
  },
}));

const HomeFormSelect = styled(MySelect)(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    '& .MuiInputBase-root': {
      borderRadius: '0px !important',
    },
    '& fieldset': {
      borderColor: 'transparent !important',
      borderRadius: '0px !important',
    },
  },
}));

const HomeFormTextField = styled(MyTextField)(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    '& .MuiInputBase-root': {
      borderRadius: '0px !important',
    },
    '& fieldset': {
      borderColor: 'transparent !important',
    },
  },
}));

const StyledButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '25px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
