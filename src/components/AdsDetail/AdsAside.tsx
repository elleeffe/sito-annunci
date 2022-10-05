import {useState} from 'react';
import {Box, Button, styled} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import {backToTop} from '../../utils/utils';
import MyButton from '../Buttons/MyButton';
import MyTextButton from '../Buttons/MyTextButton';
import IconCard from '../Card/IconCard';
import {Aside} from '../Layout';
import {Subtitle2} from '../MyTypography';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import CategoryIcon from '@mui/icons-material/Category';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import CommentsModal from './CommentsModal';
import LeaveCommentsModal from './LeaveCommentsModal';

type Props = {detail: Ads};

const AdsAside = ({detail}: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showLeaveComments, setShowLeaveComments] = useState<boolean>(false);

  const {isMd} = useResponsive();

  return (
    <>
      <Aside>
        <AsideInner>
          <Box flex={1}>
            <IconCard
              variant="primary"
              icon={<CategoryIcon />}
              title={detail.category as string}
              label="Categoria"
            />
            <FlexWrap>
              <Box display="flex" marginTop="15px">
                <VisibilityIcon color="primary" />
                <Subtitle2 marginLeft="10px">
                  {detail.views}{' '}
                  {detail.views === 1 ? 'visualizzazione' : 'visualizzazioni'}
                </Subtitle2>
              </Box>
              <FlexWrap>
                <Box display="flex" marginTop="15px">
                  <PersonIcon color="primary" />
                  <Subtitle2 marginLeft="10px">{detail.age} anni</Subtitle2>
                </Box>
                <Box display="flex" marginTop="15px">
                  <RoomIcon color="primary" />
                  <Subtitle2 marginLeft="10px">
                    {detail.city.toUpperCase()}
                    {detail.neighborhood && `, ${detail.neighborhood}`}
                  </Subtitle2>
                </Box>
              </FlexWrap>
              <Box display="flex" marginTop="15px">
                <MyTextButton
                  color="primary"
                  startIcon={<CommentIcon />}
                  tooltip="Mostra recensioni"
                  onClick={() => setShowComments(true)}
                >
                  {detail.views}{' '}
                  {detail.views === 1 ? 'recensione' : 'recensioni'}
                </MyTextButton>
              </Box>
            </FlexWrap>
          </Box>
          <Button
            variant="outlined"
            color="info"
            startIcon={<AddIcon />}
            sx={{marginTop: '15px'}}
            onClick={() => setShowLeaveComments(true)}
          >
            Lascia un recensione
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PhoneIphoneIcon />}
            sx={{marginTop: '15px'}}
          >
            Telefono
          </Button>
          {detail.whatsapp && (
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              sx={{marginTop: '15px'}}
            >
              Whatsapp
            </Button>
          )}
        </AsideInner>
        {!isMd && (
          <Box sx={{padding: '0 20px'}} width="100%">
            <MyButton
              color="primary"
              variant="contained"
              onClick={backToTop}
              sx={{width: '100%'}}
            >
              Torna in cima
            </MyButton>
          </Box>
        )}
      </Aside>
      {!!detail.id && showComments && (
        <CommentsModal
          detailId={detail.id}
          isOpen={showComments}
          onClose={() => setShowComments(false)}
        />
      )}
      {!!detail.id && showLeaveComments && (
        <LeaveCommentsModal
          detailId={detail.id}
          isOpen={showLeaveComments}
          onClose={() => setShowLeaveComments(false)}
        />
      )}
    </>
  );
};

export default AdsAside;

const AsideInner = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  overflow: 'overlay',
  flex: 1,
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const FlexWrap = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
