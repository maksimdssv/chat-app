import Chat from './Chat/Chat';
import { UserContextProvider } from '../context/User';

function App() {
  return (
    <UserContextProvider>
      <Chat />
    </UserContextProvider>
  );
}

export default App;
