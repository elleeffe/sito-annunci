import {
  Button,
  ButtonProps,
  CircularProgress,
  styled,
  Tooltip,
} from '@mui/material';
import {useMemo} from 'react';

type Props = Omit<ButtonProps, 'variant'> & {
  loading?: boolean;
  tooltip?: string;
};

const MyTextButton = ({
  children,
  loading,
  onClick,
  size = 'large',
  tooltip,
  ...props
}: Props) => {
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
    <StyledButton {...props} variant="text" size={size} onClick={onClick}>
      <>
        {loading && (
          <CircularProgress
            size={loaderSize}
            sx={{svg: {width: loaderSize, height: loaderSize}}}
          />
        )}
        {!loading &&
          (!!tooltip ? (
            <Tooltip title={tooltip}>
              <span className="content">{children}</span>
            </Tooltip>
          ) : (
            <span className="content">{children}</span>
          ))}
      </>
    </StyledButton>
  );
};

export default MyTextButton;

const StyledButton = styled(Button)(({theme}) => ({
  padding: 0,
  height: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    '& .content': {
      textDecoration: 'underline',
    },
  },
  '& .content': {
    color: theme.palette.text.secondary,
    fontFamily: 'Rubik',
    fontWeight: '400',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
  '&.MuiButton-sizeLarge': {
    '& .MuiSvgIcon-root': {
      width: '24px',
      height: '24px',
    },
    '& .content': {
      fontSize: '16px',
    },
  },
  '&.MuiButton-sizeMedium': {
    '& .MuiSvgIcon-root': {
      width: '20px',
      height: '20px',
    },
    '& .content': {
      fontSize: '14px',
    },
  },
  '&.MuiButton-sizeSmall': {
    '& .MuiSvgIcon-root': {
      width: '16px',
      height: '16px',
    },
    '& .content': {
      fontSize: '12px',
    },
  },
  '& .MuiButton-startIcon': {
    marginRight: '10px',
    marginLeft: 0,
  },

  [theme.breakpoints.down('md')]: {
    '&.MuiButton-sizeLarge': {
      '& .MuiSvgIcon-root': {
        width: '24px',
        height: '24px',
      },
      '& .content': {
        fontSize: '14px',
      },
    },
    '&.MuiButton-sizeMedium': {
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
      },
      '& .content': {
        fontSize: '12px',
      },
    },
    '&.MuiButton-sizeSmall': {
      '& .MuiSvgIcon-root': {
        width: '16px',
        height: '16px',
      },
      '& .content': {
        fontSize: '10px',
      },
    },
  },
}));
