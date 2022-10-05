import {Box, keyframes, styled} from '@mui/material';
import {TitleH6} from '../MyTypography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = {label: string};

const FormSuccess = ({label}: Props) => {
  return (
    <SuccessWrap>
      <CheckCircleOutlineIcon
        color="success"
        sx={{
          // animation: `700ms linear infinite alternate ${bouncing}`,
          width: '70px',
          height: '70px',
          marginBottom: '15px',
        }}
      />
      <TitleH6>{label}</TitleH6>
    </SuccessWrap>
  );
};

export default FormSuccess;

const SuccessWrap = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
}));

const bouncing = keyframes`
from {
  transform: translateY(5px);
}
to {
  transform: translateY(0px)
}
`;
