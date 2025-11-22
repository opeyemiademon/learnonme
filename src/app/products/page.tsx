import DashboardLayout from '@/components/AdminLayout'

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Buy Products</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">Available products will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
