import {Box, Grid, styled} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {formatVisibilityExpiration} from '../../../utils/utils';
import {Body2} from '../../MyTypography';

type Props = {
  option: VisibilityOption;
  expiration: number;
};

const Visibility = ({option, expiration}: Props) => {
  return (
    <Box display="flex" marginBottom="15px">
      <RocketLaunchIcon color="primary" />
      <Box display="flex" flex={1} flexWrap="wrap">
        <Body2 marginLeft="10px">{option.title}</Body2>
        <Body2 marginLeft="6px">
          - {option.subtitle}{' '}
          {!!formatVisibilityExpiration(expiration) &&
            `(${formatVisibilityExpiration(expiration)})`}
        </Body2>
      </Box>
    </Box>
  );
};

export default Visibility;
