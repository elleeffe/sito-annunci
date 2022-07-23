import {
  Box,
  ButtonProps,
  Chip,
  FormControl,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {useCallback, useMemo} from 'react';
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
};

const MyMultipleSelect = ({
  name,
  validate,
  options,
  placeholder,
  icon,
  spacingBottom,
  color = 'primary',
}: Props) => {
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
      console.log(event.target.value);
      input.onChange(event.target.value);
    },
    [input]
  );

  console.log(input.value);

  const displaySelected = useCallback(
    (selected: unknown) => {
      const value = selected as string[];
      if (!value.length) {
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
        <Box
          sx={{display: 'flex', flexWrap: 'wrap', padding: '9px 9px 0px 9px'}}
        >
          {value.map((el) => (
            <Chip
              key={el}
              label={el}
              sx={{marginBottom: '9px', marginRight: '9px'}}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </Box>
      );
    },
    [placeholder, iconComp]
  );

  return (
    <FormControl
      error={error}
      fullWidth
      sx={spacingBottom ? {marginBottom: '25px'} : undefined}
    >
      <StyledSelect
        {...input}
        value={input.value || []}
        onChange={handleChange}
        displayEmpty
        multiple
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
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MyMultipleSelect;

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
  '& .MuiSelect-icon': {
    top: '13px',
  },
  '&.Mui-error': {
    'svg:not(.MuiSelect-icon)': {
      color: theme.palette.error.main,
    },
  },
}));