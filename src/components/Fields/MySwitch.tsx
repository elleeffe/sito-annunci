import {useCallback, useMemo} from 'react';
import {
  ButtonProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
} from '@mui/material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';

type Props = {
  name: string;
  label?: string;
  validate?: (value: string) => string;
  disabled?: boolean;
  spacingBottom?: boolean;
  color?: ButtonProps['color'];
  value?: string | null;
  onChange?: (value: any) => void;
  defaultChecked?: boolean;
};

const MySwitch = ({
  name,
  label,
  validate,
  disabled,
  spacingBottom,
  color,
  value,
  onChange,
  defaultChecked,
}: Props) => {
  const {input, meta} = useField(name, {
    validate,
  });

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const iconColor = useMemo(
    () => (color && color !== 'inherit' ? color : 'primary'),
    [color]
  );

  const handleChange = useCallback(() => {
    if (!!value) {
      if (input.value === value) {
        input.onChange(undefined);
        onChange && onChange(undefined);
      } else {
        input.onChange(value);
        onChange && onChange(value);
      }
    } else {
      if (input.value) {
        input.onChange(false);
        onChange && onChange(false);
      } else {
        input.onChange(true);
        onChange && onChange(true);
      }
    }
  }, [input, value, onChange]);

  return (
    <FormControl
      error={error}
      fullWidth
      sx={spacingBottom ? {marginBottom: '30px'} : undefined}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color={iconColor}
              {...input}
              disabled={disabled}
              onChange={handleChange}
              value={value}
              checked={value ? input.value === value : undefined}
              defaultChecked={defaultChecked}
            />
          }
          label={label}
          sx={{
            '& .MuiTypography-root': {
              fontWeight: '300',
            },
            marginRight: 0,
            marginLeft: 0,
          }}
        />
      </FormGroup>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MySwitch;
