import {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {
  IconButton,
  TextField,
  TextFieldProps,
  Box,
  styled,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import {Body1} from '../MyTypography';

type Props = TextFieldProps & {
  name: string;
  validate?: (value: string) => string;
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
  instructions?: boolean;
  label?: string;
  loading?: boolean;
  className?: string;
};

const MyTextField = ({
  name,
  validate,
  icon,
  spacingBottom,
  instructions,
  loading,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {input, meta} = useField(name, {validate});

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      input.onChange(event.target.value);
      !!props.onChange && props.onChange(event);
    },
    [input, props]
  );

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

  const endAdornmentComp = useMemo(() => {
    if (loading) {
      return (
        <CircularProgress
          size={25}
          sx={{svg: {width: 25, height: 25}}}
          color={props.color || 'primary'}
        />
      );
    }
    if (props.type === 'password') {
      return (
        <Tooltip title={showPassword ? 'Nascondi' : 'Mostra'}>
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
        </Tooltip>
      );
    }
  }, [props, showPassword, loading]);

  return (
    <>
      <TextField
        {...input}
        {...props}
        {...muiErrorConverter(meta)}
        onChange={handleChange}
        type={inputType}
        InputProps={{
          ...props.InputProps,
          startAdornment: iconComp,
          endAdornment: endAdornmentComp,
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
          <Body1 gutterBottom>La tua password deve avere:</Body1>
          <Instruction gutterBottom isActive={input.value.search(/[a-z]/) > -1}>
            <icons.Check />
            <span>
              Una lettera <b>minuscola</b>
            </span>
          </Instruction>
          <Instruction gutterBottom isActive={input.value.search(/[A-Z]/) > -1}>
            <icons.Check />
            <span>
              Una lettera <b>maiuscola</b>
            </span>
          </Instruction>
          <Instruction gutterBottom isActive={input.value.search(/[0-9]/) > -1}>
            <icons.Check />
            <span>
              Un <b>numero</b>
            </span>
          </Instruction>
          <Instruction
            gutterBottom
            isActive={input.value.search(/[!£?@#$%^&*]/) > -1}
          >
            <icons.Check />
            <span>
              Un carattere <b>speciale</b>
            </span>
          </Instruction>
          <Instruction gutterBottom isActive={input.value.length >= 8}>
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

const Instruction = styled(Body1, {
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
