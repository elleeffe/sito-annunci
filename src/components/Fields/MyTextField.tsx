import {useMemo} from 'react';
import {TextField, TextFieldProps} from '@mui/material';
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
  const {input, meta} = useField(name, {validate});

  const iconComp = useMemo(() => {
    if (icon) {
      const Icon = icons[icon];
      return <Icon color={props.color || 'primary'} />;
    }
    return undefined;
  }, [icon, props.color]);

  return (
    <TextField
      {...input}
      {...props}
      {...muiErrorConverter(meta)}
      InputProps={{
        startAdornment: iconComp,
      }}
      sx={spacingBottom ? {marginBottom: '40px'} : undefined}
    />
  );
};

export default MyTextField;
