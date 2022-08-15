import {useMemo, useState} from 'react';
import {
  IconButton,
  TextField,
  TextFieldProps,
  Box,
  styled,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import {Body2} from '../MyTypography';

type Props = TextFieldProps & {
  name: string;
  validate?: (value: string) => string;
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
  instructions?: boolean;
  label?: string;
};

const MyTextField = ({
  name,
  validate,
  icon,
  spacingBottom,
  instructions,
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
    <>
      <TextField
        {...input}
        {...props}
        {...muiErrorConverter(meta)}
        type={inputType}
        InputProps={{
          ...props.InputProps,
          startAdornment: iconComp,
          endAdornment: props.type === 'password' && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={() => setShowPassword(!showPassword)}
              size="small"
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
          marginBottom: spacingBottom ? '30px' : undefined,
          '& .MuiInputBase-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      {props.type === 'password' && instructions && (
        <Box
          sx={{
            textAlign: 'left',
            marginBottom: '25px',
            marginTop: spacingBottom ? '35px' : '25px',
          }}
        >
          <Body2 gutterBottom>La tua password deve avere:</Body2>
          <Instruction
            isSmall
            gutterBottom
            isActive={input.value.search(/[a-z]/) > -1}
          >
            <icons.Check />
            <span>
              Una lettera <b>minuscola</b>
            </span>
          </Instruction>
          <Instruction
            isSmall
            gutterBottom
            isActive={input.value.search(/[A-Z]/) > -1}
          >
            <icons.Check />
            <span>
              Una lettera <b>maiuscola</b>
            </span>
          </Instruction>
          <Instruction
            isSmall
            gutterBottom
            isActive={input.value.search(/[0-9]/) > -1}
          >
            <icons.Check />
            <span>
              Un <b>numero</b>
            </span>
          </Instruction>
          <Instruction
            isSmall
            gutterBottom
            isActive={input.value.search(/[!£?@#$%^&*]/) > -1}
          >
            <icons.Check />
            <span>
              Un carattere <b>speciale</b>
            </span>
          </Instruction>
          <Instruction isSmall gutterBottom isActive={input.value.length >= 8}>
            <icons.Check />
            <span>
              Minimo <b>8 caratteri</b>
            </span>
          </Instruction>
        </Box>
      )}
    </>
  );
};

export default MyTextField;

const Instruction = styled(Body2, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
  display: 'flex',
  color: theme.palette.text.primary,
  '& .MuiSvgIcon-root': {
    width: '15px',
    height: '15px',
    marginRight: '5px',
    ...(isActive && {color: theme.palette.success.main}),
  },
}));
