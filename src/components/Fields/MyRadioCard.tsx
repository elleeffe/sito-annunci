import {useCallback, useMemo, useState} from 'react';
import {useField} from 'react-final-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
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
  disabled?: boolean;
};

const MyRadioCard = ({
  label,
  name,
  validate,
  options,
  spacingBottom,
  initialValue,
  disabled,
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
      disabled={disabled}
    >
      {label && <FormLabel>Gender</FormLabel>}
      <FormControlLabel
        control={<Radio checked={value === undefined} />}
        onChange={() => {
          setValue(undefined);
          input.onChange(undefined);
        }}
        label="Nessuna opzione di visibilit√†"
        sx={{
          marginBottom: '15px',
          '& .MuiTypography-root': {
            marginLeft: '10px',
          },
        }}
      />
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
