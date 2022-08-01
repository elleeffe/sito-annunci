import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {useMemo} from 'react';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';

type Props = {
  label?: string;
  name: string;
  validate?: (value: string) => string;
  options: {value: string; label: string; disabled?: boolean}[];
};

const MyRadio = ({label, name, validate, options}: Props) => {
  const {input, meta} = useField(name, {validate, type: 'radio'});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  return (
    <FormControl error={error} sx={{width: '100%'}}>
      {label && <FormLabel>Gender</FormLabel>}
      <RadioGroup
        row
        {...input}
        sx={{width: '100%', justifyContent: 'space-between'}}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            sx={{
              marginRight: '50px',
              '& .MuiTypography-root': {
                fontWeight: '300',
              },
            }}
          />
        ))}
      </RadioGroup>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MyRadio;
