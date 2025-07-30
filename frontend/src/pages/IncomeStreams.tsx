import { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useIncomeStreams } from '../hooks/useIncomeStreams';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import CreateIncomeStreamForm from '../components/forms/CreateIncomeStreamForm';
import RegisterEarningForm from '../components/forms/RegisterEarningForm';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import type { IncomeStream } from '../generated/api/src';

export default function IncomeStreams() {
  const { data: incomeStreams, isLoading, error } = useIncomeStreams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [registerEarningModal, setRegisterEarningModal] = useState<{ incomeStreamId: string; incomeStreamName: string } | null>(null);

  // Helper function to calculate income stream statistics
  const getIncomeStreamStats = (incomeStream: IncomeStream) => {
    const totalEarnings = incomeStream.earnings?.reduce((sum, earning) => sum + earning.amount, 0) || 0;
    const earningCount = incomeStream.earnings?.length || 0;
    const averageEarning = earningCount > 0 ? totalEarnings / earningCount : 0;
    
    return { totalEarnings, earningCount, averageEarning };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-slate-600">Loading income streams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Income Streams</h1>
          <p className="mt-2 text-slate-600">
            Manage your income sources and earnings
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
          <h1 className="text-3xl font-bold text-slate-900">Income Streams</h1>
          <p className="mt-2 text-slate-600">
            Manage your income sources and earnings
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Income Stream
        </Button>
      </div>

      {/* Income Streams Grid */}
      {incomeStreams && incomeStreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incomeStreams.map((incomeStream) => {
            const stats = getIncomeStreamStats(incomeStream);
            
            return (
              <div
                key={incomeStream.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Income Stream Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{incomeStream.name}</h3>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 text-slate-400 mr-1" />
                      <span className="text-sm text-slate-500">
                        {stats.earningCount} earnings
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>

                {/* Income Stream Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Total Earned</span>
                    <span className="text-sm font-semibold text-green-600">
                      €{stats.totalEarnings.toFixed(2)}
                    </span>
                  </div>
                  
                  {stats.earningCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Average per Earning</span>
                      <span className="text-sm font-medium text-slate-900">
                        €{stats.averageEarning.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Recent Earnings */}
                {incomeStream.earnings && incomeStream.earnings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Earnings</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {incomeStream.earnings.slice(-3).reverse().map((earning) => (
                        <div key={earning.id} className="flex justify-between text-xs">
                          <span className="text-slate-600 truncate pr-2">{earning.name}</span>
                          <span className="text-green-600 font-medium">€{earning.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRegisterEarningModal({ incomeStreamId: incomeStream.id, incomeStreamName: incomeStream.name })}
                  className="w-full flex items-center justify-center"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Earning
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No income streams</h3>
          <p className="mt-1 text-sm text-slate-500">Get started by creating your first income stream.</p>
          <div className="mt-6">
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Income Stream
            </Button>
          </div>
        </div>
      )}

      {/* Create Income Stream Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Income Stream"
        size="md"
      >
        <CreateIncomeStreamForm
          onSuccess={() => setIsCreateModalOpen(false)}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Register Earning Modal */}
      <Modal
        isOpen={!!registerEarningModal}
        onClose={() => setRegisterEarningModal(null)}
        title="Register New Earning"
        size="md"
      >
        {registerEarningModal && (
          <RegisterEarningForm
            incomeStreamId={registerEarningModal.incomeStreamId}
            incomeStreamName={registerEarningModal.incomeStreamName}
            onSuccess={() => setRegisterEarningModal(null)}
            onCancel={() => setRegisterEarningModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}