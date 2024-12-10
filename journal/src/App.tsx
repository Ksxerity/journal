import JournalPage from './pages/JournalPage';
import './main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<JournalPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar/:date" element={<JournalPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;