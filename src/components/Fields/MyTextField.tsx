import {useMemo, useState} from 'react';
import {IconButton, TextField, TextFieldProps} from '@mui/material';
import * as icons from '@mui/icons-material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';

type Props = TextFieldProps & {
  name: string;
  validate?: (value: string) => string;
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
};

const MyTextField = ({
  name,
  validate,
  icon,
  spacingBottom,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {input, meta} = useField(name, {validate});

  const iconComp = useMemo(() => {
    if (icon) {
      const Icon = icons[icon];
      return <Icon color={props.color || 'primary'} />;
    }
    return undefined;
  }, [icon, props.color]);

  const inputType = useMemo(() => {
    if (props.type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return props.type;
  }, [props.type, showPassword]);

  return (
    <TextField
      {...input}
      {...props}
      {...muiErrorConverter(meta)}
      type={inputType}
      InputProps={{
        startAdornment: iconComp,
        endAdornment: props.type === 'password' && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <icons.VisibilityOff
                color={props.color || 'primary'}
                className="untouchable-icon"
              />
            ) : (
              <icons.Visibility
                color={props.color || 'primary'}
                className="untouchable-icon"
              />
            )}
          </IconButton>
        ),
      }}
      sx={{
        marginBottom: spacingBottom ? '25px' : undefined,
        '& .MuiInputBase-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
};

export default MyTextField;
