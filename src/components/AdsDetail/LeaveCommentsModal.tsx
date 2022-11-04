import {useEffect, useState} from 'react';
import {useUser} from '../../contexts/UserContext';
import {Login, PersonAddAlt1} from '@mui/icons-material';
import RegisterForm from '../Forms/RegisterForm';
import LoginForm from '../Forms/LoginForm';
import MyTabs from '../MyTabs';
import LeaveCommentsForm from '../Forms/LeaveCommentsForm';
import MyModal from '../MyModal';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const LeaveCommentsModal = ({detailId, isOpen, onClose}: Props) => {
  const {user} = useUser();
  const [tab, setTab] = useState(0);
  const [oldComment, setOldComment] = useState<string>();

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      try {
        // TODO
        // const oldComment = await sleep(1000);
        // setOldComment('Questo è il contenuto del tuo precedente commento');
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user]);

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title="Lascia una recensione"
      noInnerSpacing={!user}
    >
      {!user ? (
        <>
          <MyTabs
            activeTab={tab}
            onChange={(newValue) => setTab(newValue)}
            tabs={[
              {
                button: {
                  label: 'Accedi',
                  icon: <Login />,
                },
                children: <LoginForm onSuccess={() => setTab(0)} />,
              },
              {
                button: {
                  label: 'Crea account',
                  icon: <PersonAddAlt1 />,
                },
                children: <RegisterForm onSuccess={() => setTab(0)} />,
              },
            ]}
          />
        </>
      ) : (
        <LeaveCommentsForm initialValues={oldComment} advId={detailId} />
      )}
    </MyModal>
  );
};
export default LeaveCommentsModal;
