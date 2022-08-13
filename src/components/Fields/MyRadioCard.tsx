import {useCallback, useMemo, useState} from 'react';
import {useField} from 'react-final-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  RadioGroup,
} from '@mui/material';
import {muiErrorConverter} from '../../utils/fields';
import VisibilityCard from '../Card/VisibilityCard';

type Props = {
  label?: string;
  name: string;
  validate?: (value: string) => string;
  options: VisibilityOption[];
  spacingBottom?: boolean;
  initialValue?: Visibility;
};

const MyRadioCard = ({
  label,
  name,
  validate,
  options,
  spacingBottom,
  initialValue,
}: Props) => {
  const [value, setValue] = useState<Visibility | undefined>(
    () => initialValue || undefined
  );
  const {input, meta} = useField(name, {validate, type: 'radio'});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const handleChange = useCallback(
    (value: Visibility) => {
      input.onChange(value);
      setValue(value);
    },
    [input]
  );

  return (
    <FormControl
      error={error}
      sx={{width: '100%', marginBottom: spacingBottom ? '25px' : undefined}}
    >
      {label && <FormLabel>Gender</FormLabel>}
      <RadioGroup
        row
        {...input}
        onChange={(e) => handleChange(e.target.value as Visibility)}
        sx={{width: '100%', justifyContent: 'space-between'}}
      >
        <Grid container columnSpacing={2} rowSpacing={2}>
          {options.map((option) => (
            <Grid
              item
              xs={12}
              md={option.important ? undefined : 6}
              key={option.value}
            >
              <VisibilityCard option={option} value={value} isRadio />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MyRadioCard;
