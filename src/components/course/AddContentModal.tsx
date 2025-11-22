'use client'

import { useState } from 'react'

interface ContentType {
  id: string
  label: string
  icon: React.ReactNode
  color: string
}

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: string) => void
}

export default function AddContentModal({ isOpen, onClose, onSelectType }: AddContentModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const contentTypes: ContentType[] = [
    {
      id: 'assignment',
      label: 'Assignment',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9" />
        </svg>
      ),
      color: 'bg-pink-500',
    },
    {
      id: 'book',
      label: 'Book',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
    {
      id: 'choice',
      label: 'Choice',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-teal-500',
    },
    {
      id: 'database',
      label: 'Database',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-red-500',
    },
    {
      id: 'external-tool',
      label: 'External tool',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-green-600',
    },
    {
      id: 'file',
      label: 'File',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'folder',
      label: 'Folder',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'forum',
      label: 'Forum',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      color: 'bg-red-500',
    },
    {
      id: 'glossary',
      label: 'Glossary',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
      color: 'bg-red-500',
    },
    {
      id: 'h5p',
      label: 'H5P',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'ims-content-package',
      label: 'IMS content package',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'label',
      label: 'Label',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'lesson',
      label: 'Lesson',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'page',
      label: 'Page',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-pink-500',
    },
    {
      id: 'scorm-package',
      label: 'SCORM package',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'survey',
      label: 'Survey',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-green-600',
    },
    {
      id: 'url',
      label: 'URL',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      id: 'wiki',
      label: 'Wiki',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-orange-500',
    },
    {
      id: 'workshop',
      label: 'Workshop',
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      color: 'bg-pink-500',
    },
  ]

  const filteredTypes = contentTypes.filter((type) =>
    type.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectType = (typeId: string) => {
    onSelectType(typeId)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">ADD AN ACTIVITY OR RESOURCE</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 py-4 border-b border-gray-200">
          {['Starred', 'All', 'Activities', 'Resources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelectType(type.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`${type.color} p-4 rounded-lg text-white group-hover:shadow-lg transition-shadow`}
                >
                  {type.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 text-center line-clamp-2">
                  {type.label}
                </span>
                <div className="flex gap-1 text-gray-400">
                  <button className="hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
                      />
                    </svg>
                  </button>
                  <button className="hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
