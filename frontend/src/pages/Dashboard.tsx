import { useBudgets } from '../hooks/useBudgets';
import { useIncomeStreams } from '../hooks/useIncomeStreams';
import ErrorDisplay from '../components/ui/ErrorDisplay';

export default function Dashboard() {
  // Use our custom hooks to fetch data - React Query handles loading/error states
  const { data: budgets, isLoading: budgetsLoading, error: budgetsError } = useBudgets();
  const { data: incomeStreams, isLoading: incomeLoading, error: incomeError } = useIncomeStreams();

  if (budgetsLoading || incomeLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (budgetsError || incomeError) {
    const error = budgetsError || incomeError;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of your personal finances
          </p>
        </div>
        <ErrorDisplay error={error} />
      </div>
    );
  }

  // Calculate some basic stats for the dashboard
  const totalBudgets = budgets?.length || 0;
  const totalIncomeStreams = incomeStreams?.length || 0;
  
  const totalBudgetAmount = budgets?.reduce((sum, budget) => sum + budget.limit, 0) || 0;
  const totalSpent = budgets?.reduce((sum, budget) => 
    sum + (budget.expenses?.reduce((expenseSum, expense) => expenseSum + expense.amount, 0) || 0), 0
  ) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your personal finances
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-sm border border-indigo-200 p-6">
          <div className="text-sm font-medium text-indigo-600">Total Budgets</div>
          <div className="mt-2 text-3xl font-bold text-indigo-900">{totalBudgets}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200 p-6">
          <div className="text-sm font-medium text-purple-600">Income Streams</div>
          <div className="mt-2 text-3xl font-bold text-purple-900">{totalIncomeStreams}</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl shadow-sm border border-emerald-200 p-6">
          <div className="text-sm font-medium text-emerald-600">Total Budget</div>
          <div className="mt-2 text-3xl font-bold text-emerald-800">
            €{totalBudgetAmount.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl shadow-sm border border-red-200 p-6">
          <div className="text-sm font-medium text-red-600">Total Spent</div>
          <div className="mt-2 text-3xl font-bold text-red-800">
            €{totalSpent.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Recent Budgets</h2>
          </div>
          <div className="p-6">
            {totalBudgets > 0 ? (
              <div className="space-y-3">
                {budgets?.slice(0, 3).map((budget) => (
                  <div key={budget.id} className="flex justify-between">
                    <span className="text-sm text-gray-900">{budget.name}</span>
                    <span className="text-sm font-medium text-emerald-600">€{budget.limit}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No budgets created yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Income Streams</h2>
          </div>
          <div className="p-6">
            {totalIncomeStreams > 0 ? (
              <div className="space-y-3">
                {incomeStreams?.slice(0, 3).map((stream) => (
                  <div key={stream.id} className="flex justify-between">
                    <span className="text-sm text-gray-900">{stream.name}</span>
                    <span className="text-sm text-gray-500">
                      {stream.earnings?.length || 0} earnings
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No income streams created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}