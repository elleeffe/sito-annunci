import ReportForm from '../Forms/ReportForm';
import MyModal from '../MyModal';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const ReportModal = ({detailId, isOpen, onClose}: Props) => {
  return (
    <MyModal isOpen={isOpen} onClose={onClose} title="Segnalazione annuncio">
      <ReportForm advId={detailId} />
    </MyModal>
  );
};
export default ReportModal;
