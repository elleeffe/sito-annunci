import {useCallback} from 'react';
import MyRangeField from '../Fields/MyRangeField';

type Props = {
  value: Filters;
  onChange: (value: Filters) => void;
};

const Filters = ({value, onChange}: Props) => {
  const handleAge = useCallback(
    (newAge: number[]) => {
      onChange({...value, age: newAge});
    },
    [onChange, value]
  );

  return (
    <>
      <MyRangeField label="Età" onChange={handleAge} value={value.age} />
    </>
  );
};

export default Filters;
