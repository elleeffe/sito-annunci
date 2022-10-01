import {Box, Grid, styled} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {formatVisibilityExpiration} from '../../../utils/utils';
import {Body1, Subtitle2} from '../../MyTypography';

type Props = {
  option: VisibilityOption;
  expiration: number;
};

const Visibility = ({option, expiration}: Props) => {
  return (
    <FullGrid item xs={12} marginTop="15px" alignItems="flex-start">
      <RocketLaunchIcon color="primary" />
      <Box display="flex" flex={1} flexWrap="wrap">
        <Subtitle2 marginLeft="10px">{option.title}</Subtitle2>
        <Body1 marginLeft="6px">
          - {option.subtitle}{' '}
          {!!formatVisibilityExpiration(expiration) &&
            `(${formatVisibilityExpiration(expiration)})`}
        </Body1>
      </Box>
    </FullGrid>
  );
};

export default Visibility;

const FullGrid = styled(Grid)(() => ({
  display: 'flex',
  paddingLeft: '0px !important',
  paddingTop: '0px !important',
}));
