'use client'

import { useState } from 'react'

interface Instructor {
  id: string
  name: string
  avatar?: string
}

interface SettingsStepProps {
  formData: {
    instructor: Instructor | null
    additionalInstructors: Instructor[]
    courseBadge: string
    difficulty: string
    durationHours: number
    durationMinutes: number
    maxStudents: 'unlimited' | 'limited'
    numberOfStudents: number
    staticEnrolledCount: number
    password: string
    endDate: string
    allowCourseRetake: boolean
    restrictContentDuringQuiz: boolean
    showAssignmentCompletionButton: boolean
    showAssignmentRetakeButton: boolean
  }
  onChange: (field: string, value: any) => void
}

export default function SettingsStep({ formData, onChange }: SettingsStepProps) {
  const [activeTab, setActiveTab] = useState('general')
  const [showPasswordToggle, setShowPasswordToggle] = useState(false)

  const sidebarItems = [
    { id: 'general', label: 'General' },
    { id: 'display', label: 'Display' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'group-pricing', label: 'Group Pricing' },
    { id: 'enrollment', label: 'Enrollment Expiration' },
    { id: 'content-drip', label: 'Content Drip' },
    { id: 'faq', label: 'FAQ' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'coming-soon', label: 'Course Coming Soon' },
  ]

  const instructors = [
    { id: '1', name: 'Masteriyoc Team', avatar: '🎨' },
    { id: '2', name: 'instructor02', avatar: '👤' },
    { id: '3', name: 'instructor01', avatar: '👤' },
  ]

  const removeInstructor = (instructorId: string) => {
    onChange(
      'additionalInstructors',
      formData.additionalInstructors.filter((i) => i.id !== instructorId)
    )
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-40 flex-shrink-0">
        <div className="space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-all ${
                activeTab === item.id
                  ? 'bg-blue-50 text-orange-600 font-medium border-l-4 border-orange-600 pl-2'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'general' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900">Course Basics</h2>

            {/* Instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor
              </label>
              <div className="relative">
                <select
                  value={formData.instructor?.id || ''}
                  onChange={(e) => {
                    const selected = instructors.find((i) => i.id === e.target.value)
                    onChange('instructor', selected || null)
                  }}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.avatar} {instructor.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <button className="pointer-events-auto text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Additional Instructors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructors
              </label>
              <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[48px]">
                {formData.additionalInstructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-orange-700 rounded-full text-sm"
                  >
                    <span>{instructor.avatar}</span>
                    <span>{instructor.name}</span>
                    <button
                      onClick={() => removeInstructor(instructor.id)}
                      className="text-orange-700 hover:text-blue-900"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">✕</button>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Course Badge */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Course Badge
                </label>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={formData.courseBadge}
                onChange={(e) => onChange('courseBadge', e.target.value)}
                placeholder="Set the badge for the course"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Difficulty */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Difficulty
                </label>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                value={formData.difficulty}
                onChange={(e) => onChange('difficulty', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.durationHours}
                      onChange={(e) => onChange('durationHours', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                      <button className="text-gray-400 hover:text-gray-600 leading-none">▲</button>
                      <button className="text-gray-400 hover:text-gray-600 leading-none">▼</button>
                    </div>
                    <span className="absolute right-12 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                      Hours
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => onChange('durationMinutes', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                      <button className="text-gray-400 hover:text-gray-600 leading-none">▲</button>
                      <button className="text-gray-400 hover:text-gray-600 leading-none">▼</button>
                    </div>
                    <span className="absolute right-12 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                      Minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment & Access Control */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment & Access Control</h3>

              {/* Maximum Students */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Maximum Students
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.maxStudents === 'unlimited'}
                      onChange={() => onChange('maxStudents', 'unlimited')}
                      className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">No limit</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.maxStudents === 'limited'}
                      onChange={() => onChange('maxStudents', 'limited')}
                      className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Limit</span>
                  </label>
                </div>
              </div>

              {/* Number of Students */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={formData.numberOfStudents}
                    onChange={(e) => onChange('numberOfStudents', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <button className="text-gray-400 hover:text-gray-600 leading-none">▲</button>
                    <button className="text-gray-400 hover:text-gray-600 leading-none">▼</button>
                  </div>
                </div>
              </div>

              {/* Static Enrolled Count */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Static Enrolled Count
                </label>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="relative w-full mt-2">
                  <input
                    type="number"
                    value={formData.staticEnrolledCount}
                    onChange={(e) => onChange('staticEnrolledCount', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <button className="text-gray-400 hover:text-gray-600 leading-none">▲</button>
                    <button className="text-gray-400 hover:text-gray-600 leading-none">▼</button>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="relative">
                  <input
                    type={showPasswordToggle ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => onChange('password', e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowPasswordToggle(!showPasswordToggle)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswordToggle ? '👁' : '👁‍🗨'}
                  </button>
                </div>
              </div>

              {/* End Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => onChange('endDate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Allow Course Retake */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Allow Course Retake
                  </label>
                  <button
                    onClick={() => onChange('allowCourseRetake', !formData.allowCourseRetake)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.allowCourseRetake ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.allowCourseRetake ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Content & Restrictions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content & Restrictions</h3>

              {/* Restrict Content During Quiz */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Restrict Content During Quiz
                    </label>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => onChange('restrictContentDuringQuiz', !formData.restrictContentDuringQuiz)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.restrictContentDuringQuiz ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.restrictContentDuringQuiz ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Show Assignment Completion Button */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Show Assignment Completion Button
                    </label>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => onChange('showAssignmentCompletionButton', !formData.showAssignmentCompletionButton)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.showAssignmentCompletionButton ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.showAssignmentCompletionButton ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Show Assignment Retake Button */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Show Assignment Retake Button
                    </label>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => onChange('showAssignmentRetakeButton', !formData.showAssignmentRetakeButton)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.showAssignmentRetakeButton ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.showAssignmentRetakeButton ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'general' && (
          <div className="text-center py-12 text-gray-500">
            <p>Content for {sidebarItems.find(item => item.id === activeTab)?.label} tab</p>
          </div>
        )}
      </div>
    </div>
  )
}
