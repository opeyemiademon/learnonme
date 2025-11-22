'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import SalesReport from '@/components/course/reports/SalesReport'
import EnrollmentReport from '@/components/course/reports/EnrollmentReport'

type ReportTab = 'sales' | 'enrollment'

export default function CourseReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('sales')

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Challenge Yourself: Quizzes, Exams & Gradebook</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'sales'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveTab('enrollment')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'enrollment'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Enrollment
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'sales' && <SalesReport />}
          {activeTab === 'enrollment' && <EnrollmentReport />}
        </div>
      </div>
    </AdminLayout>
  )
}
