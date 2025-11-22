'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Button from '@/components/Button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('status')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const tabs = ['Status', 'Import / Export', 'Logs', 'Sample Courses', 'Shortcodes', 'Utilities', 'REST API', 'Migration', 'Setup Wizard']

  const categories = ['Courses', 'Users', 'Settings', 'Quizzes']

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '-'))}
              className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.toLowerCase().replace(/\s+/g, '-')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">System status information coming soon...</p>
          </div>
        )}

        {/* Import / Export Tab */}
        {activeTab === 'import-export' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      category === 'Users'
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Import Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Import</h3>
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    Choose file
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <span className="text-gray-600 text-sm">
                    {selectedFile ? selectedFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              {/* Export Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Export</h3>
                <Button variant="outline" size="md">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export users
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Logs coming soon...</p>
          </div>
        )}

        {/* Sample Courses Tab */}
        {activeTab === 'sample-courses' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Sample courses coming soon...</p>
          </div>
        )}

        {/* Shortcodes Tab */}
        {activeTab === 'shortcodes' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Shortcodes coming soon...</p>
          </div>
        )}

        {/* Utilities Tab */}
        {activeTab === 'utilities' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Utilities coming soon...</p>
          </div>
        )}

        {/* REST API Tab */}
        {activeTab === 'rest-api' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">REST API documentation coming soon...</p>
          </div>
        )}

        {/* Migration Tab */}
        {activeTab === 'migration' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Migration tools coming soon...</p>
          </div>
        )}

        {/* Setup Wizard Tab */}
        {activeTab === 'setup-wizard' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Setup wizard coming soon...</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
