import {useState} from 'react';
import {Box, Button, Chip, styled} from '@mui/material';
import {formatDate} from '../../utils/utils';
import MyTextButton from '../Buttons/MyTextButton';
import {Aside} from '../Layout';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import CommentsModal from './CommentsModal';
import LeaveCommentsModal from './LeaveCommentsModal';
import EventIcon from '@mui/icons-material/Event';
import {TitleH5} from '../MyTypography';

type Props = {detail: Ads};

const AdsAside = ({detail}: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showLeaveComments, setShowLeaveComments] = useState<boolean>(false);

  return (
    <>
      <Aside>
        <AsideInner>
          <Box flex={1}>
            <Chip label={detail.category} color="primary" />
            <FlexWrap>
              {!!detail.publicationDate && (
                <DetailWrap>
                  <AccessTimeIcon color="primary" />
                  <TitleH5 marginLeft="10px">
                    {formatDate(detail.publicationDate)}
                  </TitleH5>
                </DetailWrap>
              )}
              <DetailWrap>
                <VisibilityIcon color="primary" />
                <TitleH5 marginLeft="10px">
                  {detail.views}{' '}
                  {detail.views === 1 ? 'visualizzazione' : 'visualizzazioni'}
                </TitleH5>
              </DetailWrap>
            </FlexWrap>
            <FlexWrap>
              <DetailWrap>
                <EventIcon color="primary" />
                <TitleH5 marginLeft="10px">{detail.age} anni</TitleH5>
              </DetailWrap>
              <DetailWrap>
                <RoomIcon color="primary" />
                <TitleH5 marginLeft="10px">
                  {detail.city.toUpperCase()}
                  {detail.neighborhood && `, ${detail.neighborhood}`}
                </TitleH5>
              </DetailWrap>
            </FlexWrap>
            <FlexWrap>
              <DetailWrap>
                <MyTextButton
                  color="primary"
                  startIcon={<CommentIcon />}
                  tooltip="Mostra recensioni"
                  onClick={() => setShowComments(true)}
                >
                  {detail.views}{' '}
                  {detail.views === 1 ? 'recensione' : 'recensioni'}
                </MyTextButton>
              </DetailWrap>
            </FlexWrap>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="info"
              startIcon={<AddIcon />}
              sx={{marginTop: '15px', width: '100%'}}
              onClick={() => setShowLeaveComments(true)}
            >
              Lascia un recensione
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PhoneIphoneIcon />}
              sx={{marginTop: '15px', width: '100%'}}
            >
              Telefono
            </Button>
            {detail.whatsapp && (
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                sx={{marginTop: '15px', width: '100%'}}
              >
                Whatsapp
              </Button>
            )}
          </Box>
        </AsideInner>
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'overlay',
  flex: 1,
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    marginBottom: '0px',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const FlexWrap = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const DetailWrap = styled(Box)(() => ({
  display: 'flex',
  marginTop: '20px',
  alignItems: 'center',
}));
