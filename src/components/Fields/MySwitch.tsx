import {
  ButtonProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
} from '@mui/material';
import {useMemo} from 'react';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';

type Props = {
  name: string;
  label?: string;
  validate?: (value: string) => string;
  disabled?: boolean;
  spacingBottom?: boolean;
  color?: ButtonProps['color'];
  onSwitch?: () => void;
};

const MySwitch = ({
  name,
  label,
  validate,
  disabled,
  spacingBottom,
  color,
  onSwitch,
}: Props) => {
  const {input, meta} = useField(name, {validate, type: 'checkbox'});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const iconColor = useMemo(
    () => (color && color !== 'inherit' ? color : 'primary'),
    [color]
  );

  return (
    <FormControl
      error={error}
      fullWidth
      sx={spacingBottom ? {marginBottom: '30px'} : undefined}
    >
      <FormGroup>
        <FormControlLabel
          {...input}
          control={
            <Switch
              color={iconColor}
              onChange={onSwitch && onSwitch}
              disabled={disabled}
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
