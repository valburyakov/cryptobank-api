import '../styles.scss';
import { CryptoIcon } from '../components/crypto-icon';

export function App() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap py-4">
        <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
          <div className="sticky top-0 p-4 w-full">
            <ul className="flex flex-col overflow-hidden">
              <li className="nav-item">
                <CryptoIcon name="bitcoin" />
              </li>
              <li className="nav-item">usd</li>
              <li className="nav-item">Users</li>
            </ul>
          </div>
        </aside>
        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <h1 className="text-2xl" id="home">
            Main Content
          </h1>
          <p>
            Let's look at the base Tailwind classes that are used for this
            layout. There are 2 columns. The left sidebar (aside), and the main
            content area on the right.{' '}
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
