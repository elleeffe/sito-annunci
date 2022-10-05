import {ReactNode} from 'react';
import {Box, styled} from '@mui/material';
import {Body2, Subtitle1} from '../MyTypography';

type Props = {
  title: string;
  label: string;
  icon: ReactNode;
  variant: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
};

const IconCard = ({title, label, icon, variant}: Props) => {
  return (
    <Wrap variant={variant}>
      <Inner>
        {icon}
        <Box>
          <Body2>{label}</Body2>
          <Subtitle1 sx={{textTransform: 'capitalize'}}>{title}</Subtitle1>
        </Box>
      </Inner>
    </Wrap>
  );
};

export default IconCard;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{variant: 'primary' | 'secondary' | 'error' | 'success' | 'warning'}>(
  ({theme, variant}) => ({
    position: 'relative',
    padding: '10px',
    borderRadius: '10px',

    '&::after': {
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
      backgroundColor: theme.palette[variant].main,
      borderRadius: '10px',
      opacity: 0.2,
    },
  })
);

const Inner = styled(Box)(({theme}) => ({
  display: 'flex',
  width: '100%',
  zIndex: 1,
  position: 'relative',

  '& .MuiSvgIcon-root': {
    color: theme.palette.text.secondary,
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
}));
