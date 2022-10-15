import {useCallback, useEffect, useState} from 'react';
import {Box, styled} from '@mui/material';
import {Form} from 'react-final-form';
import {categoryOptions, cityOptions} from '../../utils/config';
import MyRangeField from '../Fields/MyRangeField';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {TitleH5} from '../MyTypography';
import MyAutocomplete from '../Fields/MyAutocomplete';
import MySwitch from '../Fields/MySwitch';
import {useFiltersContext} from '../../contexts/FiltersContext';
import MyButton from '../Buttons/MyButton';
import {FormApi} from 'final-form';

type Props = {
  onChange: () => void;
};

const Filters = ({onChange}: Props) => {
  const {filters, setFilters, orders, setOrders, initialCategory} =
    useFiltersContext();

  const [keyword, setKeyword] = useState<string>(() => filters.keyword || '');
  const [debounce, setDebounce] = useState<boolean>(false);
  const [ageRange, setAgeRange] = useState<number[]>(() => filters.ageRange);

  const handleCity = useCallback(
    (newCity: City | undefined) => {
      setFilters((old) => ({...old, city: newCity}));
      onChange();
    },
    [setFilters, onChange]
  );

  const handleCategory = useCallback(
    (newCategory: Category) => {
      setFilters((old) => ({...old, category: newCategory}));
      onChange();
    },
    [setFilters, onChange]
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

  const handleReset = useCallback(
    (form: FormApi<Filters & Orders, Partial<Filters & Orders>>) => {
      form.reset({
        category: initialCategory,
        city: undefined,
        keyword: '',
        age: 'none',
        publicationDate: 'latest',
        ageRange: [18, 60],
      });
      setFilters({
        ageRange: [18, 60],
        city: undefined,
        category: initialCategory,
        keyword: '',
      });
      setOrders({age: 'none', publicationDate: 'latest'});
      setKeyword('');
      setAgeRange([18, 60]);
      onChange();
    },
    [setFilters, setOrders, onChange, initialCategory]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (keyword !== filters.keyword) {
          setFilters((old) => ({...old, keyword: keyword}));
          onChange();
        }
      },
      !!keyword ? 500 : 0
    );
    return () => clearTimeout(timeout);
  }, [keyword, setFilters, filters, onChange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        ageRange[0] !== filters.ageRange[0] ||
        ageRange[1] !== filters.ageRange[1]
      ) {
        setFilters((old) => ({...old, ageRange: ageRange}));
        setDebounce(false);
        onChange();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [ageRange, setFilters, filters, onChange]);

  console.log(debounce);

  return (
    <>
      <Form<Filters & Orders>
        onSubmit={console.log}
        initialValues={{...filters, ...orders}}
      >
        {({values, form}) => {
          console.log({values});
          return (
            <>
              <Box marginBottom="100px">
                <FilterTitle>Filtra</FilterTitle>
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
                  onChange={(event) => {
                    setKeyword(event.target.value);
                    setDebounce(true);
                  }}
                  spacingBottom
                  loading={debounce}
                />
                <MyRangeField
                  name="ageRange"
                  label="Età"
                  onChange={(value) => setAgeRange(value)}
                />
              </Box>
              <Box>
                <FilterTitle>Ordina per età</FilterTitle>
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
                <FilterTitle marginTop="20px">Ordina per data</FilterTitle>
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
                  spacingBottom
                />
              </Box>
              <MyButton
                sx={{width: '100%'}}
                onClick={() => {
                  handleReset(form);
                }}
              >
                Pulisci filtri
              </MyButton>
            </>
          );
        }}
      </Form>
    </>
  );
};

export default Filters;

const FilterTitle = styled(TitleH5)(({theme}) => ({
  fontWeight: '500',
  marginBottom: '15px',

  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
  },
}));
