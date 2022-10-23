import PublishForm from '../Forms/PublishForm';
import MyModal from '../MyModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  ads?: Ads;
};

const EditModal = ({isOpen, onClose, ads}: Props) => {
  return (
    <MyModal
      isOpen={isOpen && !!ads}
      onClose={onClose}
      title="Modifica annuncio"
      size="large"
    >
      <PublishForm initialAds={ads} finalVariant="edit" />
    </MyModal>
  );
};
export default EditModal;
