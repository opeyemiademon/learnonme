'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Button from '@/components/Button'

export default function CourseSettingsPage() {
  const [selectedLayout, setSelectedLayout] = useState('modern')
  const [enableCustomTemplate, setEnableCustomTemplate] = useState(false)
  const [allowReviews, setAllowReviews] = useState(false)
  const [reviewVisibilityControl, setReviewVisibilityControl] = useState(true)
  const [requireLoginForVisibility, setRequireLoginForVisibility] = useState(false)
  const [requireEnrollmentForAttachments, setRequireEnrollmentForAttachments] = useState(true)
  const [singleCourseExpanded, setSingleCourseExpanded] = useState(true)
  const [coursesPageExpanded, setCoursesPageExpanded] = useState(false)

  const layouts = [
    { id: 'simple', name: 'Simple', icon: '📋' },
    { id: 'modern', name: 'Modern', icon: '✨' },
    { id: 'minimal', name: 'Minimal', icon: '📄' },
  ]

  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      selectedLayout,
      enableCustomTemplate,
      allowReviews,
      reviewVisibilityControl,
      requireLoginForVisibility,
      requireEnrollmentForAttachments,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6 mt-6">
        {/* Header */}
       

        {/* Sidebar and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Single Course Page Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Single Course Header */}
              <button
                onClick={() => setSingleCourseExpanded(!singleCourseExpanded)}
                className="w-full p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-600">Single Course Page</span>
                </div>
                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    singleCourseExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Single Course Menu Items - Collapsible */}
              {singleCourseExpanded && (
                <div className="space-y-0.5 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-blue-600 bg-blue-50 hover:bg-blue-100 border-0"
                  >
                    Display
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:bg-gray-50 border-0"
                  >
                    Related Courses
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:bg-gray-50 border-0"
                  >
                    Social Share
                  </Button>
                </div>
              )}
            </div>

            {/* Courses Page Section */}
            <div className="bg-white  border border-gray-200 overflow-hidden">
              {/* Courses Page Header */}
              <button
                onClick={() => setCoursesPageExpanded(!coursesPageExpanded)}
                className="w-full p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-600">Courses Page</span>
                </div>
                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    coursesPageExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Courses Page Menu Items - Collapsible */}
              {coursesPageExpanded && (
                <div className="space-y-0.5 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:bg-gray-50 border-0"
                  >
                    Layout
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:bg-gray-50 border-0"
                  >
                    Filters
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:bg-gray-50 border-0"
                  >
                    Sorting
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Template Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Template</h2>

              {/* Choose Layout */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-sm font-medium text-gray-700">Choose Layout</label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {layouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedLayout === layout.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center h-24 bg-gray-100 rounded mb-2">
                        <span className="text-2xl">{layout.icon}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{layout.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enable Custom Template */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Enable Custom Template</label>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setEnableCustomTemplate(!enableCustomTemplate)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enableCustomTemplate ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enableCustomTemplate ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Display Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Display</h2>

              {/* Allow Reviews */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Allow Reviews</label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setAllowReviews(!allowReviews)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    allowReviews ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      allowReviews ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Review Visibility Control */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Review Visibility Control</label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setReviewVisibilityControl(!reviewVisibilityControl)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    reviewVisibilityControl ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reviewVisibilityControl ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Require Login for Course Visibility */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Require Login for Course Visibility</label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setRequireLoginForVisibility(!requireLoginForVisibility)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    requireLoginForVisibility ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      requireLoginForVisibility ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Require Enrollment for Attachments */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Require Enrollment for Attachments</label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setRequireEnrollmentForAttachments(!requireEnrollmentForAttachments)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    requireEnrollmentForAttachments ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      requireEnrollmentForAttachments ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Save Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
