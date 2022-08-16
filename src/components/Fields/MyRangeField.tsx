import {useCallback} from 'react';

import {Box, Slider} from '@mui/material';
import {Subtitle1} from '../MyTypography';

type Props = {
  label?: string;
  value: number[];
  onChange: (value: number[]) => void;
};

const MyRangeField = ({label, value, onChange}: Props) => {
  const handleChange = useCallback(
    (event: Event, newValue: number[] | number) => {
      onChange(newValue as number[]);
    },
    [onChange]
  );

  return (
    <>
      {!!label && <Subtitle1>Età</Subtitle1>}
      <Box display="flex" justifyContent="center">
        <Slider
          getAriaLabel={() => 'Età'}
          value={value}
          onChange={handleChange}
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
