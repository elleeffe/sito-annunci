import type {NextPage} from 'next';
import Layout from '../components/Layout';
import MyTextField from '../components/Fields/MyTextField';
import {Form} from 'react-final-form';
import {isRequired} from '../utils/fields';
import {Box} from '@mui/material';
import MySelect from '../components/Fields/MySelect';

const Home: NextPage = () => {
  return (
    <Layout>
      <Form onSubmit={console.log}>
        {() => (
          <Box>
            <MyTextField
              name="nome"
              placeholder="Nome"
              validate={isRequired}
              icon="Add"
              spacingBottom
            />
            <MySelect
              name="nome"
              placeholder="Nome"
              validate={isRequired}
              options={[{value: '1', label: 'opzione 1'}]}
              icon="Add"
              spacingBottom
            />
          </Box>
        )}
      </Form>
    </Layout>
  );
};

export default Home;
