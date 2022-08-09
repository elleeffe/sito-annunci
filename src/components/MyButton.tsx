import {Button, ButtonProps, CircularProgress} from '@mui/material';
import {useMemo} from 'react';

type Props = ButtonProps & {loading?: boolean};

const MyButton = ({children, loading, size = 'medium', ...props}: Props) => {
  const loaderSize = useMemo(() => {
    if (size === 'small') {
      return 20;
    }
    if (size === 'medium') {
      return 30;
    }
    return 40;
  }, [size]);

  return (
    <Button {...props} size={size}>
      {loading ? <CircularProgress size={loaderSize} /> : children}
    </Button>
  );
};

export default MyButton;
