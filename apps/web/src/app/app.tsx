import '../styles.scss';
import { useQuery } from 'react-query';
import { axios } from '../lib/axios';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import Header from '../components/header';

type User = { id: string; name: string; email: string };

type NavigationItem = {
  title: string;
  to: string;
  icon: IconDefinition;
};

const getUsers = () => axios.get('/api/users').then((response) => response.data as User[]);

export function App() {
  const { isLoading, error, data } = useQuery<User[], Error>('users', getUsers);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <main role="main" className="w-full h-full">
            <h1 className="text-2xl" id="home">
              Main Content
            </h1>
            {isLoading ? (
              <p>Загрузка...</p>
            ) : error ? (
              <p>Ошибка: {error.message}</p>
            ) : (
              <pre>{JSON.stringify(data)}</pre>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
