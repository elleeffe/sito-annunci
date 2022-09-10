import {
  ButtonProps,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {useCallback, useMemo, useState} from 'react';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import * as icons from '@mui/icons-material';

type Option = {value: string; label: string};

type Props = {
  name: string;
  validate?: (value: string) => string;
  placeholder: string;
  options: Option[];
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
  color?: ButtonProps['color'];
  label?: string;
  id: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
};

const MySelect = ({
  name,
  validate,
  options,
  placeholder,
  icon,
  spacingBottom,
  label,
  id,
  color = 'primary',
  disabled,
  onChange,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {input, meta} = useField(name, {validate});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const iconComp = useMemo(() => {
    if (icon) {
      const Icon = icons[icon];
      return <Icon color={color} />;
    }
    return undefined;
  }, [icon, color]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      input.onChange(event.target.value);
      !!onChange && onChange(event.target.value);
    },
    [input, onChange]
  );

  const placeholderColor = useMemo(() => {
    if (!!label) {
      return isFocused ? 'text.disabled' : 'transparent';
    }
    return 'text.disabled';
  }, [label, isFocused]);

  const displaySelected = useCallback(
    (selected: unknown) => {
      const value = selected as string;
      if (value.length === 0) {
        return (
          <MenuItem
            sx={{
              '&:hover': {backgroundColor: 'transparent'},
              '& .MuiTouchRipple-root': {display: 'none'},
            }}
          >
            {iconComp && <ListItemIcon>{iconComp}</ListItemIcon>}
            <ListItemText
              sx={{
                color: placeholderColor,
              }}
            >
              {placeholder}
            </ListItemText>
          </MenuItem>
        );
      }
      return (
        <MenuItem
          sx={{
            '&:hover': {backgroundColor: 'transparent'},
            '& .MuiTouchRipple-root': {display: 'none'},
          }}
        >
          {iconComp && <ListItemIcon>{iconComp}</ListItemIcon>}
          <ListItemText>
            {options.find((el) => el.value === value)?.label}
          </ListItemText>
        </MenuItem>
      );
    },
    [options, placeholder, iconComp, placeholderColor]
  );

  return (
    <FormControl
      error={error}
      fullWidth
      sx={spacingBottom ? {marginBottom: '25px'} : undefined}
    >
      {label && <InputLabel id={id + '-label'}>{label}</InputLabel>}
      <StyledSelect
        {...input}
        onChange={handleChange}
        displayEmpty
        renderValue={displaySelected}
        label={label}
        labelId={id + '-label'}
        disabled={disabled}
        onFocus={() => {
          input.onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          input.onBlur();
          setIsFocused(false);
        }}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              boxShadow: 'none',
              marginTop: '10px',
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'primary.main',
              '& .MuiList-root': {
                padding: 0,
                '& .MuiMenuItem-root': {
                  padding: '10px 15px',
                },
              },
            },
          },
        }}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;

const StyledSelect = styled(Select)(({theme}) => ({
  borderRadius: '28px',
  '& .MuiSelect-select': {
    textAlign: 'left',
    padding: 0,
    '& .MuiMenuItem-root': {
      padding: '13px 15px',
      '& .MuiListItemIcon-root': {
        minWidth: 'initial',
        paddingRight: '10px',
      },
    },
  },
  '& .MuiMenuItem-root': {
    borderRadius: '28px',
  },
  '&.Mui-error': {
    'svg:not(.MuiSelect-icon)': {
      color: theme.palette.error.main,
    },
  },
}));
