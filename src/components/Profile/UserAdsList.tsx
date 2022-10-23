import {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Button, styled} from '@mui/material';
import {TitleH5, TitleH4} from '../MyTypography';
import SkeletonCard from '../Card/SkeletonCard';
import {mockAds} from '../../utils/mocks';
import AdsCard from '../Card/AdsCard';
import DeleteModal from './DeleteModal';
import SettingsMenu from './SettingsMenu';
import EditModal from './EditModal';
import {sleep} from '../../utils/utils';
import {PageInner} from '../Layout';

const mockUserAds = new Array(5)
  .fill(mockAds)
  .map((el, i) => ({...el, id: el.id + i}));

const UserAdsList = () => {
  const [ads, setAds] = useState<Ads[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [clickedAd, setClickedAd] = useState<string>();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<boolean>(false);

  const [editModal, setEditModal] = useState<boolean>(false);

  const getUserAds = useCallback(async () => {
    try {
      setLoading(true);
      // TODO
      await sleep(3000);
      setAds(mockUserAds);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((old) => (!!old ? null : event.currentTarget));
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      setDeleteError(false);
      setDeleteLoading(true);
      // TODO
      await sleep(3000);
      console.log({adsId: clickedAd});
      setDeleteLoading(false);
      setDeleteModal(false);
      setClickedAd(undefined);
      setAnchorEl(null);
      //Optimistic update
      setAds((old) => old.filter((el) => el.id !== clickedAd));
    } catch (e) {
      console.log(e);
      setDeleteError(true);
    }
  }, [clickedAd]);

  useEffect(() => {
    getUserAds();
  }, [getUserAds]);

  return (
    <>
      <PageInner spacingHorizontal="left" spacingVertical="top">
        <TitleH4 marginBottom="15px">I tuoi annunci</TitleH4>
        <List>
          {loading && !error && (
            <>
              <SkeletonCard whiteBg />
              <SkeletonCard whiteBg />
            </>
          )}
          {!loading && error && (
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={getUserAds}>
                  Riprova
                </Button>
              }
            >
              Si è verificato un errore, riprovare.
            </Alert>
          )}
          {!loading &&
            !error &&
            (!!ads.length ? (
              ads.map((el) => (
                <AdsCard
                  ads={el}
                  key={el.id}
                  whiteBg
                  isProfile
                  onSettings={(e) => {
                    handleClick(e);
                    setClickedAd(el.id);
                  }}
                />
              ))
            ) : (
              <>
                <TitleH5>Non hai ancora pubblicato nessun annuncio</TitleH5>
              </>
            ))}
        </List>
      </PageInner>
      <SettingsMenu
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setClickedAd(undefined);
        }}
        onDelete={() => setDeleteModal(true)}
        onEdit={() => setEditModal(true)}
        onOpen={() => console.log('open')}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setClickedAd(undefined);
          setAnchorEl(null);
        }}
        error={deleteError}
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
      <EditModal
        isOpen={editModal}
        ads={ads.find((el) => el.id === clickedAd)}
        onClose={() => {
          setClickedAd(undefined);
          setEditModal(false);
          setAnchorEl(null);
        }}
      />
    </>
  );
};

export default UserAdsList;

const List = styled(Box)(() => ({
  flex: 1,
  overflow: 'auto',
  paddingBottom: '10px',
}));
