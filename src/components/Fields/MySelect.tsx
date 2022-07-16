import {
  FormControl,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
} from '@mui/material';
import {useCallback, useMemo} from 'react';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import * as icons from '@mui/icons-material';

type Option = {value: string; label: string};

type Props = SelectProps & {
  name: string;
  validate?: (value: string) => string;
  placeholder: string;
  options: Option[];
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
};

const MySelect = ({
  name,
  validate,
  options,
  placeholder,
  icon,
  spacingBottom,
  ...props
}: Props) => {
  const {input, meta} = useField(name, {validate});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const iconComp = useMemo(() => {
    if (icon) {
      const Icon = icons[icon];
      return <Icon color={props.color || 'primary'} />;
    }
    return undefined;
  }, [icon, props.color]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      input.onChange(event.target.value);
    },
    [input]
  );

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
            <ListItemText sx={{color: 'text.disabled'}}>
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
    [options, placeholder, iconComp]
  );

  return (
    <FormControl
      error={error}
      fullWidth
      sx={spacingBottom ? {marginBottom: '40px'} : undefined}
    >
      <StyledSelect
        {...input}
        {...props}
        onChange={handleChange}
        displayEmpty
        renderValue={displaySelected}
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;

const StyledSelect = styled(Select)(({theme}) => ({
  borderRadius: '28px',
  '& .MuiSelect-select': {
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
    svg: {
      color: theme.palette.error.main,
    },
  },
}));
