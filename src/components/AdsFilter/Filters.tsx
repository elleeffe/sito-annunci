import {ChangeEvent, useCallback} from 'react';
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
  onChangeFilters: (value: Filters) => void;
  onChangeOrders: (value: Orders) => void;
};

const Filters = ({value, onChangeFilters, onChangeOrders}: Props) => {
  const handleCity = useCallback(
    (newCity: City | undefined) => {
      onChangeFilters({...value, city: newCity});
    },
    [value, onChangeFilters]
  );

  const handleAgeRange = useCallback(
    (newAgeRange: number[]) => {
      onChangeFilters({...value, ageRange: newAgeRange});
    },
    [onChangeFilters, value]
  );

  const handleCategory = useCallback(
    (newCategory: Category) => {
      onChangeFilters({...value, category: newCategory});
    },
    [onChangeFilters, value]
  );

  const handleKeyword = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChangeFilters({...value, keyword: event.target.value});
    },
    [onChangeFilters, value]
  );

  const handleAgeOrder = useCallback(
    (newAgeOrder: 'young' | 'old' | 'none') => {
      onChangeOrders({...value, age: newAgeOrder});
    },
    [onChangeOrders, value]
  );

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
                onChange={handleKeyword}
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
