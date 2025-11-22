'use client'

import { useState } from 'react'
import AddContentModal from './AddContentModal'
import URLContent from './content-types/URLContent'
import LessonContent from './content-types/LessonContent'

interface Section {
  id: string
  title: string
  type: 'section' | 'quiz' | 'lesson' | 'video' | 'document'
  items?: Section[]
  status?: 'draft' | 'published'
}

interface CourseDetailsStepProps {
  sections: Section[]
  onChange: (sections: Section[]) => void
}

export default function CourseDetailsStep({ sections, onChange }: CourseDetailsStepProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showAddSection, setShowAddSection] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [showAddContentModal, setShowAddContentModal] = useState(false)
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'section':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )
      case 'quiz':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'video':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      case 'document':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )
    }
  }

  const renderSection = (section: Section, level: number = 0) => {
    const isExpanded = expandedSections.has(section.id)
    const hasItems = section.items && section.items.length > 0

    return (
      <div key={section.id} className="border border-gray-300 rounded-lg mb-4 bg-white">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <button className="text-gray-400 hover:text-gray-600 cursor-move">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </button>

            {/* Title */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-gray-900 font-medium">{section.title}</span>
            </div>

            {/* Collapse/Expand Button */}
            {hasItems && (
              <button
                onClick={() => toggleSection(section.id)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg
                  className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Nested Items */}
          {hasItems && isExpanded && (
            <div className="mt-4 ml-8 space-y-3">
              {section.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <button className="text-gray-400 hover:text-gray-600 cursor-move">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                  <div className="text-gray-600">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-gray-900">{item.title}</span>
                    {item.status && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded uppercase">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    {activeMenu === item.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Import Quiz
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Content Button */}
        <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentSectionId(section.id)
              setShowAddContentModal(true)
            }}
            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Content
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const newSection: Section = {
        id: Date.now().toString(),
        title: newSectionName,
        type: 'section',
        items: [],
      }
      onChange([...sections, newSection])
      setNewSectionName('')
      setShowAddSection(false)
    }
  }

  const handleSelectContentType = (contentType: string) => {
    setSelectedContentType(contentType)
  }

  const handleSaveContent = (data: any) => {
    if (currentSectionId) {
      const updatedSections = sections.map((section) => {
        if (section.id === currentSectionId) {
          const newItem: Section = {
            id: Date.now().toString(),
            title: data.name || 'New Content',
            type: (selectedContentType as any) || 'lesson',
            status: 'draft',
          }
          return {
            ...section,
            items: [...(section.items || []), newItem],
          }
        }
        return section
      })
      onChange(updatedSections)
      setSelectedContentType(null)
      setCurrentSectionId(null)
    }
  }

  const handleCancelContent = () => {
    setSelectedContentType(null)
    setCurrentSectionId(null)
  }

  // If a content type is selected, render the content form page
  if (selectedContentType === 'url') {
    return (
      <URLContent
        onCancel={handleCancelContent}
        onSave={handleSaveContent}
      />
    )
  }

  if (selectedContentType === 'lesson') {
    return (
      <LessonContent
        onCancel={handleCancelContent}
        onSave={handleSaveContent}
      />
    )
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => renderSection(section))}

      {/* Add New Section */}
      {!showAddSection ? (
        <button
          onClick={() => setShowAddSection(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Section
        </button>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name
            </label>
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
              placeholder="Your Section Name"
              className="w-full px-4 py-2.5 border border-orange-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddSection}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddSection(false)
                setNewSectionName('')
              }}
              className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={showAddContentModal && !selectedContentType}
        onClose={() => {
          setShowAddContentModal(false)
          setCurrentSectionId(null)
        }}
        onSelectType={handleSelectContentType}
      />
    </div>
  )
}
