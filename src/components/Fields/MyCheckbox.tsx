import React, {PropsWithChildren, useMemo} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import {useField} from 'react-final-form';
import {Body1} from '../MyTypography';
import {FormHelperText} from '@mui/material';
import {muiErrorConverter} from '../../utils/fields';

type Props = PropsWithChildren<{}> & {
  name: string;
  validate?: (value: string) => string;
  spacingBottom?: boolean;
  disabled?: boolean;
  color?: CheckboxProps['color'];
};

const MyCheckbox = ({
  children,
  name,
  spacingBottom,
  disabled,
  color = 'primary',
  validate,
}: Props) => {
  const {input, meta} = useField(name, {validate, type: 'checkbox'});

  const {helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  return (
    <FormGroup
      sx={{
        width: '100%',
        marginTop: '15px',
        paddingLeft: '10px',
        marginBottom: spacingBottom ? '25px' : '20px',
        position: 'relative',
      }}
    >
      <FormControlLabel
        sx={{alignItems: 'flex-start'}}
        control={
          <Checkbox
            size="small"
            {...input}
            disabled={disabled}
            color={color}
            sx={{padding: '5px'}}
          />
        }
        label={
          <Body1 sx={{marginTop: '7px', textAlign: 'left', marginLeft: '3px'}}>
            {children}
          </Body1>
        }
      />
      {!!helperText && (
        <FormHelperText sx={{color: 'error.main', margin: '0px 14px'}}>
          {helperText}
        </FormHelperText>
      )}
    </FormGroup>
  );
};

export default MyCheckbox;
