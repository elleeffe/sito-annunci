import {Box, keyframes, styled} from '@mui/material';
import {TitleH6} from '../../../MyTypography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const EditVariant = () => {
  return (
    <Wrap>
      <CheckCircleOutlineIcon
        color="success"
        sx={{
          // animation: `700ms linear infinite alternate ${bouncing}`,
          width: '50px',
          height: '50px',
          marginBottom: '15px',
        }}
      />
      <TitleH6>Annuncio modificato con successo!</TitleH6>
    </Wrap>
  );
};

export default EditVariant;

const Wrap = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
  position: 'relative',
  flex: 1,
  textAlign: 'center',
}));

const bouncing = keyframes`
from {
  transform: translateY(5px);
}
to {
  transform: translateY(0px)
}
`;
