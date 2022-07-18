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
    <div className="container flex mx-auto h-screen overflow-hidden bg-gray-100">
      <div className="flex flex-col w-full overflow-hidden">
        <Header />
        <main role="main" className="flex-1 relative overflow-y-auto w-full">
          <h1 className="text-2xl p-2" id="home">
            Main Content
          </h1>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>Ошибка: {error.message}</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
