'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import OverviewStep from '@/components/course/OverviewStep'
import CourseDetailsStep from '@/components/course/CourseDetailsStep'
import SettingsStep from '@/components/course/SettingsStep'
import Button from '@/components/Button'

type Step = 'overview' | 'details' | 'settings'

interface Instructor {
  id: string
  name: string
  avatar?: string
}

interface Section {
  id: string
  title: string
  type: 'section' | 'quiz' | 'lesson' | 'video' | 'document'
  items?: Section[]
  status?: 'draft' | 'published'
}

export default function NewCoursePage() {
  const [currentStep, setCurrentStep] = useState<Step>('overview')
  
  // Overview form data
  const [overviewData, setOverviewData] = useState({
    courseName: '',
    courseDescription: '',
    courseHighlights: [] as string[],
    featured: false,
    categories: [] as string[],
    slug: '',
    featuredImage: null as File | null,
    featuredVideo: null as File | null,
    attachments: [] as File[],
  })

  // Course details (Builder) data
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Quiz and gradebook sections',
      type: 'section',
      items: [
        { id: '1-1', title: 'Configure gradebook', type: 'lesson' },
        { id: '1-2', title: 'The Ultimate "Obvious" Quiz', type: 'quiz' },
      ],
    },
    {
      id: '2',
      title: 'Examination Invigilation',
      type: 'section',
      items: [
        { id: '2-1', title: 'Introduction', type: 'lesson', status: 'draft' },
        { id: '2-2', title: 'video 1.2', type: 'video', status: 'draft' },
        { id: '2-3', title: 'accounting book', type: 'document' },
      ],
    },
  ])

  // Settings form data
  const [settingsData, setSettingsData] = useState({
    instructor: null as Instructor | null,
    additionalInstructors: [
      { id: '2', name: 'instructor02', avatar: '👤' },
      { id: '3', name: 'instructor01', avatar: '👤' },
    ] as Instructor[],
    courseBadge: '',
    difficulty: 'expert',
    durationHours: 0,
    durationMinutes: 0,
    maxStudents: 'unlimited' as 'unlimited' | 'limited',
    numberOfStudents: 0,
    staticEnrolledCount: 0,
    password: '123456',
    endDate: '2025-11-14',
    allowCourseRetake: true,
    restrictContentDuringQuiz: true,
    showAssignmentCompletionButton: true,
    showAssignmentRetakeButton: true,
  })

  const handleOverviewChange = (field: string, value: any) => {
    setOverviewData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSettingsChange = (field: string, value: any) => {
    setSettingsData((prev) => ({ ...prev, [field]: value }))
  }

  const steps = [
    { id: 'overview' as Step, label: 'Overview', icon: '📄' },
    { id: 'details' as Step, label: 'Details', icon: '🔨' },
    { id: 'settings' as Step, label: 'Settings', icon: '⚙️' },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            

            {/* Step Navigation */}
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentStep === step.id
                        ? 'bg-blue-50 text-orange-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                      currentStep === step.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-300 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      currentStep === step.id || steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-orange-600'
                        : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reports
              </button>
              <button className="px-4 py-2 text-sm text-orange-600 border border-orange-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                Preview
              </button>
              <Button color="primary">Update</Button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          {currentStep === 'overview' && (
            <OverviewStep formData={overviewData} onChange={handleOverviewChange} />
          )}
          {currentStep === 'details' && (
            <CourseDetailsStep sections={sections} onChange={setSections} />
          )}
          {currentStep === 'settings' && (
            <SettingsStep formData={settingsData} onChange={handleSettingsChange} />
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
