import React, {
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Autocomplete,
  CircularProgress,
  Popper,
  TextField,
  styled,
} from '@mui/material';
import {Close, SearchOutlined} from '@mui/icons-material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';

type Option = {
  value: string;
  label: string;
};

type Props = {
  onType?: (value: string) => void;
  options: Option[];
  name: string;
  validate?: (value: string | undefined) => string;
  placeholder: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  loading?: boolean;
  spacingBottom?: boolean;
};

const MyAutocomplete = ({
  onType,
  options,
  name,
  validate,
  placeholder,
  disabled,
  color = 'primary',
  loading,
  spacingBottom,
}: Props) => {
  const [searchString, setSearchString] = useState<string>('');
  const [hover, setHover] = useState<boolean>(false);
  const autocompleteRef = useRef();
  const {input, meta} = useField(name, {validate});

  const getOptionLabel = (option: Option) => {
    if (typeof option === 'string') {
      return option;
    }
    return option.value || '';
  };

  const handleChange = useCallback(
    (e: SyntheticEvent, querystr: string) => {
      if (!querystr || !e) {
        setSearchString(input.value || '');
      }
      onType && onType(querystr);
      setSearchString(querystr);
    },
    [onType, input]
  );

  const handleSelected = useCallback(
    (value: Option) => {
      if (value === null) {
        input.onChange(undefined);
        setSearchString('');
        return;
      }
      setSearchString(value.value);
      input.onChange(value.value);
    },
    [input]
  );

  const listOption = useMemo(
    () =>
      onType
        ? options
        : options.filter((option) =>
            option.value.includes(searchString.toLowerCase())
          ),
    [options, searchString, onType]
  );

  return (
    <StyledAutocomplete
      $spacingBottom={spacingBottom}
      value={input.value || null}
      freeSolo={true}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={autocompleteRef}
      selectOnFocus={true}
      options={listOption}
      disabled={disabled}
      placeholder={placeholder}
      getOptionLabel={(option) => getOptionLabel(option as Option)}
      onInputChange={handleChange}
      onChange={(_, value) => handleSelected(value as Option)}
      loading={loading}
      loadingText="Ricerca in corso..."
      onBlur={() => {
        input.onBlur();
        setHover(false);
      }}
      onFocus={() => {
        input.onFocus();
        setHover(true);
      }}
      clearIcon={<Close className="autocomplete-icon" color={color} />}
      renderInput={(params) => (
        <TextField
          {...params}
          {...muiErrorConverter(meta)}
          value={searchString}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress
                    color={color}
                    size={20}
                    sx={{marginRight: '8px'}}
                    className="autocomplete-icon"
                  />
                )}
                {params.InputProps.endAdornment}
                <SearchOutlined
                  color={hover ? color : 'disabled'}
                  className="autocomplete-icon"
                />
              </>
            ),
          }}
        />
      )}
      PopperComponent={(props) => (
        <Popper
          container={autocompleteRef.current}
          {...props}
          sx={{
            '& .MuiPaper-root': {
              display: !listOption.length ? 'none' : undefined,
              boxShadow: 'none',
              marginTop: '10px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: `${color}.main`,
              '& .MuiAutocomplete-listbox': {
                padding: 0,
                '& .MuiAutocomplete-option': {
                  padding: '10px 15px',
                },
              },
            },
          }}
        />
      )}
    />
  );
};

export default MyAutocomplete;

const StyledAutocomplete = styled(Autocomplete)<{$spacingBottom?: boolean}>(
  ({theme, $spacingBottom}) => ({
    marginBottom: $spacingBottom ? '40px' : undefined,
    '& .MuiAutocomplete-inputRoot': {
      padding: '6px 9px',
      paddingRight: '9px !important',
    },
    '& .MuiAutocomplete-endAdornment': {
      position: 'initial',
      marginRight: '5px',
    },
    '& .MuiIconButton-root': {
      height: 'auto',
      width: 'auto',
      '&: hover': {
        boxShadow: 'unset',
      },
      '&.MuiAutocomplete-popupIndicator': {
        display: 'none',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  })
);
