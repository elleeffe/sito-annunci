import {Box, keyframes, styled} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import {TitleH4, TitleH5} from '../../../MyTypography';
import {useAdsContext} from '../../../../contexts/AdsContext';
import {useEffect} from 'react';

const CreateVariant = () => {
  const {ads, setAds} = useAdsContext();

  useEffect(() => {
    ads && setAds(undefined);
  }, []);

  return (
    <Wrap>
      <EmailIcon
        color="primary"
        sx={{
          animation: `700ms linear infinite alternate ${bouncing}`,
          width: '50px',
          height: '50px',
          marginBottom: '15px',
        }}
      />
      <TitleH4 marginBottom="5px">Annuncio caricato con successo!</TitleH4>
      <TitleH5 sx={{maxWidth: '600px'}}>
        A breve ti invieremo una mail con il link per completare il caricamento
        del tuo annuncio e procedere con eventuali pagamenti.
      </TitleH5>
    </Wrap>
  );
};

export default CreateVariant;

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
