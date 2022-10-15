import {useMemo} from 'react';
import {styled, Box} from '@mui/material';
import {Body1, StyledButton, TitleH5} from '../MyTypography';

type Props = {
  variant: 'primary' | 'secondary';
  title: string;
  button: {
    caption: string;
    action: () => void;
  };
  chip?: string;
  spacingBottom?: boolean;
};

const MiniHeroBanner = ({
  variant,
  title,
  button,
  chip,
  spacingBottom,
}: Props) => {
  const buttonColor = useMemo(() => {
    if (variant === 'primary') {
      return 'warning';
    }
    return 'primary';
  }, [variant]);

  return (
    <Wrap variant={variant} spacingBottom={spacingBottom}>
      {chip && <HeroChip>{chip}</HeroChip>}
      <TitleH5 gutterBottom isWhite={variant === 'primary'}>
        {title}
      </TitleH5>
      <StyledButton onClick={button.action} sx={{color: buttonColor}}>
        {button.caption}
      </StyledButton>
    </Wrap>
  );
};

export default MiniHeroBanner;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'spacingBottom',
})<{
  variant: 'primary' | 'secondary';
  spacingBottom?: boolean;
}>(({theme, variant, spacingBottom}) => ({
  backgroundColor: theme.palette[variant].main,
  padding: '15px',
  borderRadius: '15px',
  position: 'relative',
  ...(spacingBottom && {marginBottom: '25px'}),
}));

const HeroChip = styled(Body1)(({theme}) => ({
  position: 'absolute',
  top: 0,
  right: '15px',
  padding: '3px 5px',
  fontSize: '10px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontWeight: '500',
  borderRadius: '5px',
  transform: 'translateY(-50%)',
  color: theme.palette.background.default,
  background: theme.palette.error.main,
}));
