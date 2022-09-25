import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
  label?: string;
  onChange?: (value: any) => void;
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
  label,
  onChange,
}: Props) => {
  const {input, meta} = useField(name, {validate});
  const [searchString, setSearchString] = useState<string>(
    () => options.find((el) => el.value === input.value)?.label || ''
  );
  const [hover, setHover] = useState<boolean>(false);
  const autocompleteRef = useRef();

  const handleSelected = useCallback(
    (option: Option) => {
      if (option === null) {
        input.onChange(undefined);
        setSearchString('');
        !!onChange && onChange(undefined);
        return;
      }
      setSearchString(option.label);
      input.onChange(option.value);
      !!onChange && onChange(option.value);
    },
    [input, onChange]
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

  useEffect(() => {
    if (!input.value || input.value === '') {
      setSearchString('');
    }
  }, [input]);

  return (
    <StyledAutocomplete
      spacingBottom={spacingBottom}
      value={searchString}
      freeSolo
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={autocompleteRef}
      selectOnFocus={true}
      options={listOption}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(_, value) => handleSelected(value as Option)}
      loading={loading}
      loadingText="Ricerca in corso..."
      disableClearable={searchString === ''}
      onBlur={() => {
        input.onBlur();
        setHover(false);
      }}
      onFocus={() => {
        input.onFocus();
        setHover(true);
      }}
      clearIcon={
        <Close className="untouchable-icon autocomplete-icon" color={color} />
      }
      renderInput={(params) => (
        <TextField
          {...params}
          {...muiErrorConverter(meta)}
          value={searchString}
          placeholder={placeholder}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress
                    color={color}
                    size={20}
                    sx={{marginRight: '8px'}}
                    className="untouchable-icon"
                  />
                )}
                {params.InputProps.endAdornment}
                <SearchOutlined
                  color={hover ? color : 'disabled'}
                  className="untouchable-icon"
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

const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => prop !== 'spacingBottom',
})<{spacingBottom?: boolean}>(({theme, spacingBottom}) => ({
  marginBottom: spacingBottom ? '25px' : undefined,
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
}));
