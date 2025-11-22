import DashboardLayout from '@/components/AdminLayout'

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">Your reports will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
