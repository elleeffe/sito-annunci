import {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Button, styled} from '@mui/material';
import {Form} from 'react-final-form';
import {categoryOptions, cityOptions} from '../../utils/config';
import MyRangeField from '../Fields/MyRangeField';
import MySelect from '../Fields/MySelect';
import MyTextField from '../Fields/MyTextField';
import {TitleH4} from '../MyTypography';
import MyAutocomplete from '../Fields/MyAutocomplete';
import {useFiltersContext} from '../../contexts/FiltersContext';
import {FormApi} from 'final-form';
import {Aside} from '../Layout';

type Props = {
  onChange: () => void;
};

const Filters = ({onChange}: Props) => {
  const {filters, setFilters, initialCategory} = useFiltersContext();

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

  const handleReset = useCallback(
    (form: FormApi<Filters>) => {
      form.reset({
        category: initialCategory,
        city: undefined,
        keyword: '',
        ageRange: [18, 60],
      });
      setFilters({
        ageRange: [18, 60],
        city: undefined,
        category: initialCategory,
        keyword: '',
      });
      setKeyword('');
      setAgeRange([18, 60]);
      onChange();
    },
    [setFilters, onChange, initialCategory]
  );

  const initialValues = useMemo(() => ({...filters}), []);

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

  console.log({debounce});

  return (
    <Aside mobileOrder={1}>
      <Form<Filters> onSubmit={console.log} initialValues={initialValues}>
        {({values, form, pristine}) => {
          console.log({values});
          return (
            <Box>
              <Heading>
                <TitleH4>Filtri</TitleH4>
                <Button
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={() => {
                    handleReset(form);
                  }}
                  disabled={pristine}
                >
                  Pulisci
                </Button>
              </Heading>
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
          );
        }}
      </Form>
    </Aside>
  );
};

export default Filters;

const Heading = styled(Box)(() => ({
  marginBottom: '15px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
}));
