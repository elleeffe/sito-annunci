import {useCallback, useEffect, useState} from 'react';
import {Box, styled} from '@mui/material';
import {Form} from 'react-final-form';
import {categoryOptions, cityOptions} from '../../utils/config';
import MyRangeField from '../Fields/MyRangeField';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {TitleH6} from '../MyTypography';
import MyAutocomplete from '../Fields/MyAutocomplete';
import MySwitch from '../Fields/MySwitch';
import {useFiltersContext} from '../../contexts/FiltersContext';

const Filters = () => {
  const {filters, setFilters, orders, setOrders} = useFiltersContext();

  const [keyword, setKeyword] = useState<string>(() => filters.keyword || '');

  const handleCity = useCallback(
    (newCity: City | undefined) => {
      setFilters((old) => ({...old, city: newCity}));
    },
    [setFilters]
  );

  const handleAgeRange = useCallback(
    (newAgeRange: number[]) => {
      setFilters((old) => ({...old, ageRange: newAgeRange}));
    },
    [setFilters]
  );

  const handleCategory = useCallback(
    (newCategory: Category) => {
      setFilters((old) => ({...old, category: newCategory}));
    },
    [setFilters]
  );

  const handleAgeOrder = useCallback(
    (newOrder: 'young' | 'old' | undefined) => {
      if (newOrder !== undefined) {
        setOrders((old) => ({...old, age: newOrder}));
        return;
      }
      setOrders((old) => ({...old, age: 'none'}));
    },
    [setOrders]
  );

  const handlePublicationDateOrder = useCallback(
    (newOrder: 'latest' | 'oldest' | undefined) => {
      if (newOrder !== undefined) {
        setOrders((old) => ({...old, publicationDate: newOrder}));
        return;
      }
      setOrders((old) => ({...old, publicationDate: 'latest'}));
    },
    [setOrders]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (keyword !== filters.keyword) {
          setFilters((old) => ({...old, keyword: keyword}));
        }
      },
      !!keyword ? 1000 : 0
    );
    return () => clearTimeout(timeout);
  }, [keyword, setFilters, filters]);

  // console.log({filters, orders});

  return (
    <>
      <Form<Filters & Orders>
        onSubmit={console.log}
        initialValues={{...filters, ...orders}}
      >
        {({values}) => {
          // console.log({values});
          return (
            <>
              <Box marginBottom="100px">
                <FilterTitle isSmall>Filtra</FilterTitle>
                <MyAutocomplete
                  name="city"
                  placeholder="Città"
                  options={cityOptions}
                  onChange={handleCity}
                  spacingBottom
                />
                <MySelect
                  id="category"
                  name="category"
                  placeholder="Categoria"
                  options={categoryOptions}
                  onChange={handleCategory}
                  spacingBottom
                />
                <MyTextField
                  name="keyword"
                  placeholder="Sto cercando..."
                  onChange={(event) => setKeyword(event.target.value)}
                  spacingBottom
                />
                <MyRangeField
                  name="ageRange"
                  label="Età"
                  onChange={handleAgeRange}
                />
              </Box>
              <Box>
                <FilterTitle isSmall>Ordina per età</FilterTitle>
                <MySwitch
                  name="age"
                  label="Indifferente"
                  value="none"
                  onChange={handleAgeOrder}
                  disabled={values?.age === 'none'}
                />
                <MySwitch
                  name="age"
                  label="Più giovane"
                  value="young"
                  onChange={handleAgeOrder}
                />
                <MySwitch
                  name="age"
                  label="Più adulto"
                  value="old"
                  onChange={handleAgeOrder}
                />
                <FilterTitle isSmall marginTop="20px">
                  Ordina per data
                </FilterTitle>
                <MySwitch
                  name="publicationDate"
                  label="Pubblicati di recente"
                  value="latest"
                  onChange={handlePublicationDateOrder}
                  disabled={values?.publicationDate === 'latest'}
                />
                <MySwitch
                  name="publicationDate"
                  label="In ordine di pubblicazione"
                  value="oldest"
                  onChange={handlePublicationDateOrder}
                />
              </Box>
            </>
          );
        }}
      </Form>
    </>
  );
};

export default Filters;

const FilterTitle = styled(TitleH6)(({theme}) => ({
  fontWeight: '500',
  marginBottom: '15px',

  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
  },
}));
