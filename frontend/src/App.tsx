import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import IncomeStreams from './pages/IncomeStreams';

// Create React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      retry: 1, // Retry failed requests once
    },
  },
});

function App() {
  return (
    // QueryClientProvider makes React Query available throughout the app
    <QueryClientProvider client={queryClient}>
      {/* Router enables navigation between pages */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Layout component will contain navigation and common UI */}
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/income" element={<IncomeStreams />} />
            </Routes>
          </Layout>
        </div>
      </Router>
      {/* Dev tools for debugging React Query in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
