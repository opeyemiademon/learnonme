'use client'

import StudentLayout from '@/components/StudentLayout'

export default function StudentGradebookPage() {
  return (
    <StudentLayout>
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Gradebook</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-600 dark:text-gray-400">Gradebook page content goes here.</p>
        </div>
      </div>
    </StudentLayout>
  )
}
