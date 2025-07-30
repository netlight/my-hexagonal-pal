import { useState } from 'react';
import { Plus, Wallet, TrendingDown, AlertTriangle } from 'lucide-react';
import { useBudgets } from '../hooks/useBudgets';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import CreateBudgetForm from '../components/forms/CreateBudgetForm';
import TrackExpenseForm from '../components/forms/TrackExpenseForm';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import type { Budget } from '../generated/api/src';

export default function Budgets() {
  const { data: budgets, isLoading, error } = useBudgets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [trackExpenseModal, setTrackExpenseModal] = useState<{ budgetId: string; budgetName: string } | null>(null);

  // Helper function to calculate budget statistics
  const getBudgetStats = (budget: Budget) => {
    const spent = budget.expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
    const remaining = budget.limit - spent;
    const percentageUsed = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    const isOverBudget = spent > budget.limit;
    
    return { spent, remaining, percentageUsed, isOverBudget };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-slate-600">Loading budgets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Budgets</h1>
          <p className="mt-2 text-slate-600">
            Manage your budgets and track expenses
          </p>
        </div>
        <ErrorDisplay error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Budgets</h1>
          <p className="mt-2 text-slate-600">
            Manage your budgets and track expenses
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Budget
        </Button>
      </div>

      {/* Budgets Grid */}
      {budgets && budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const stats = getBudgetStats(budget);
            
            return (
              <div
                key={budget.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Budget Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{budget.name}</h3>
                    <div className="flex items-center mt-1">
                      <Wallet className="h-4 w-4 text-slate-400 mr-1" />
                      <span className="text-sm text-slate-500">
                        {budget.expenses?.length || 0} expenses
                      </span>
                    </div>
                  </div>
                  {stats.isOverBudget && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>

                {/* Budget Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress</span>
                    <span className={`font-medium ${stats.isOverBudget ? 'text-red-600' : 'text-slate-900'}`}>
                      {stats.percentageUsed.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        stats.isOverBudget
                          ? 'bg-red-500'
                          : stats.percentageUsed > 80
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(stats.percentageUsed, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Budget Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Spent</span>
                    <span className={`text-sm font-medium ${stats.isOverBudget ? 'text-red-600' : 'text-slate-900'}`}>
                      €{stats.spent.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Remaining</span>
                    <span className={`text-sm font-medium ${stats.remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      €{stats.remaining.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Limit</span>
                    <span className="text-sm font-medium text-slate-900">
                      €{budget.limit.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Date Range */}
                {(budget.startDate || budget.endDate) && (
                  <div className="text-xs text-slate-500 mb-4 p-2 bg-slate-50 rounded">
                    {budget.startDate && budget.endDate ? (
                      <>From {new Date(budget.startDate).toLocaleDateString()} to {new Date(budget.endDate).toLocaleDateString()}</>
                    ) : budget.startDate ? (
                      <>From {new Date(budget.startDate).toLocaleDateString()}</>
                    ) : (
                      <>Until {new Date(budget.endDate!).toLocaleDateString()}</>
                    )}
                  </div>
                )}

                {/* Actions */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTrackExpenseModal({ budgetId: budget.id, budgetName: budget.name })}
                  className="w-full flex items-center justify-center"
                >
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Track Expense
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Wallet className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No budgets</h3>
          <p className="mt-1 text-sm text-slate-500">Get started by creating your first budget.</p>
          <div className="mt-6">
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
        </div>
      )}

      {/* Create Budget Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Budget"
        size="md"
      >
        <CreateBudgetForm
          onSuccess={() => setIsCreateModalOpen(false)}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Track Expense Modal */}
      <Modal
        isOpen={!!trackExpenseModal}
        onClose={() => setTrackExpenseModal(null)}
        title="Track New Expense"
        size="md"
      >
        {trackExpenseModal && (
          <TrackExpenseForm
            budgetId={trackExpenseModal.budgetId}
            budgetName={trackExpenseModal.budgetName}
            onSuccess={() => setTrackExpenseModal(null)}
            onCancel={() => setTrackExpenseModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}