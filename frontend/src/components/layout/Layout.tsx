import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, TrendingUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Helper function to determine if a nav item is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white shadow-xl border-r border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">My Finance Pal</h1>
          <p className="text-xs text-slate-500 mt-1">Personal Finance Manager</p>
        </div>
        
        <div className="mt-6">
          <div className="px-6 py-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Navigation
            </h2>
          </div>
          
          <div className="mt-2 space-y-1">
            <Link
              to="/"
              className={`flex items-center px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link
              to="/budgets"
              className={`flex items-center px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-200 ${
                isActive('/budgets') 
                  ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Wallet className="mr-3 h-5 w-5" />
              Budgets
            </Link>
            
            <Link
              to="/income"
              className={`flex items-center px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-200 ${
                isActive('/income') 
                  ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Income Streams
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}