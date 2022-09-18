import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Box, styled} from '@mui/material';
import {Form} from 'react-final-form';
import {categoryOptions, cityOptions} from '../../utils/config';
import MyRangeField from '../Fields/MyRangeField';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {TitleH6} from '../MyTypography';
import MyAutocomplete from '../Fields/MyAutocomplete';

type Props = {
  value: Filters & Orders;
  onChangeFilters: Dispatch<SetStateAction<Filters>>;
  onChangeOrders: Dispatch<SetStateAction<Orders>>;
};

const Filters = ({value, onChangeFilters, onChangeOrders}: Props) => {
  const [keyword, setKeyword] = useState<string>(() => value.keyword || '');

  const handleCity = useCallback(
    (newCity: City | undefined) => {
      onChangeFilters((old) => ({...old, city: newCity}));
    },
    [onChangeFilters]
  );

  const handleAgeRange = useCallback(
    (newAgeRange: number[]) => {
      onChangeFilters((old) => ({...old, ageRange: newAgeRange}));
    },
    [onChangeFilters]
  );

  const handleCategory = useCallback(
    (newCategory: Category) => {
      onChangeFilters((old) => ({...old, category: newCategory}));
    },
    [onChangeFilters]
  );

  const handleAgeOrder = useCallback(
    (newAgeOrder: 'young' | 'old' | 'none') => {
      onChangeOrders((old) => ({...old, age: newAgeOrder}));
    },
    [onChangeOrders]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (keyword !== value.keyword) {
          onChangeFilters((old) => ({...old, keyword: keyword}));
        }
      },
      !!keyword ? 1000 : 0
    );
    return () => clearTimeout(timeout);
  }, [keyword, onChangeFilters, value]);

  return (
    <>
      <Form<Filters> onSubmit={console.log} initialValues={value}>
        {({values}) => {
          console.log({values});
          return (
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
          );
        }}
      </Form>
      <Box>
        <FilterTitle isSmall>Ordina per età</FilterTitle>
        <FilterTitle isSmall marginTop="20px">
          Ordina per data
        </FilterTitle>
      </Box>
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
