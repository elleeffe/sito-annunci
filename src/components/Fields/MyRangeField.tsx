import {useCallback} from 'react';
import {Box, Slider} from '@mui/material';
import {Subtitle1} from '../MyTypography';
import {useField} from 'react-final-form';

type Props = {
  label?: string;
  name: string;
  onChange: (value: number[]) => void;
};

const MyRangeField = ({name, label, onChange}: Props) => {
  const {input} = useField(name);

  const handleChange = useCallback(
    (event: Event, newValue: number[] | number) => {
      input.onChange(newValue);
      onChange(newValue as number[]);
    },
    [onChange, input]
  );

  return (
    <>
      {!!label && <Subtitle1>Età</Subtitle1>}
      <Box display="flex" justifyContent="center">
        <Slider
          {...input}
          onChange={handleChange}
          getAriaLabel={() => 'Età'}
          min={18}
          valueLabelDisplay="on"
          disableSwap
          sx={{
            maxWidth: 'calc(100% - 20px)',
            '& .MuiSlider-valueLabel.MuiSlider-valueLabel ': {
              transform: 'translateY(calc(100% + 10px)) scale(1)',
              '&:before': {
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default MyRangeField;
