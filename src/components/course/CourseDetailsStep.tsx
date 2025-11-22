'use client'

import { useState, useEffect } from 'react'
import { GripVertical, ChevronDown, MoreVertical, Plus, Edit2, Trash2, FileText, Copy } from 'lucide-react'
import Button from '../Button'
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
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [editingSectionName, setEditingSectionName] = useState('')
  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'section' | 'content'; sectionId?: string } | null>(null)
  const [editingContentId, setEditingContentId] = useState<string | null>(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Don't close if clicking on dropdown button or menu
      if (!target.closest('.dropdown-container')) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const startEditingSection = (sectionId: string, currentName: string) => {
    setEditingSectionId(sectionId)
    setEditingSectionName(currentName)
  }

  const saveEditingSection = () => {
    if (editingSectionId && editingSectionName.trim()) {
      const updatedSections = sections.map(section =>
        section.id === editingSectionId
          ? { ...section, title: editingSectionName.trim() }
          : section
      )
      onChange(updatedSections)
      setEditingSectionId(null)
      setEditingSectionName('')
    }
  }

  const cancelEditingSection = () => {
    setEditingSectionId(null)
    setEditingSectionName('')
  }

  const deleteSection = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section and all its contents?')) {
      const updatedSections = sections.filter(section => section.id !== sectionId)
      onChange(updatedSections)
    }
  }

  const copySection = (sectionId: string) => {
    const sectionToCopy = sections.find(section => section.id === sectionId)
    if (sectionToCopy) {
      const copiedSection: Section = {
        ...sectionToCopy,
        id: Date.now().toString(),
        title: `${sectionToCopy.title} (Copy)`,
        items: sectionToCopy.items?.map(item => ({
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        })) || []
      }
      onChange([...sections, copiedSection])
    }
  }

  const copyContent = (contentId: string, sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    const contentToCopy = section?.items?.find(item => item.id === contentId)
    
    if (contentToCopy && section) {
      const copiedContent: Section = {
        ...contentToCopy,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: `${contentToCopy.title} (Copy)`
      }
      
      const updatedSections = sections.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: [...(s.items || []), copiedContent]
          }
        }
        return s
      })
      onChange(updatedSections)
    }
  }

  const deleteContent = (contentId: string, sectionId: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items?.filter(item => item.id !== contentId) || []
          }
        }
        return section
      })
      onChange(updatedSections)
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string, type: 'section' | 'content', sectionId?: string) => {
    setDraggedItem({ id, type, sectionId })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetSectionId: string, targetIndex?: number) => {
    e.preventDefault()
    if (!draggedItem) return

    if (draggedItem.type === 'section') {
      // Reorder sections
      const draggedIndex = sections.findIndex(s => s.id === draggedItem.id)
      const targetIdx = sections.findIndex(s => s.id === targetSectionId)
      
      if (draggedIndex !== -1 && targetIdx !== -1 && draggedIndex !== targetIdx) {
        const newSections = [...sections]
        const [draggedSection] = newSections.splice(draggedIndex, 1)
        newSections.splice(targetIdx, 0, draggedSection)
        onChange(newSections)
      }
    } else if (draggedItem.type === 'content') {
      const sourceSection = sections.find(s => s.id === draggedItem.sectionId)
      const draggedContent = sourceSection?.items?.find(item => item.id === draggedItem.id)
      
      if (!draggedContent) return

      if (draggedItem.sectionId === targetSectionId) {
        // Reorder within the same section
        const updatedSections = sections.map(section => {
          if (section.id === targetSectionId) {
            const items = [...(section.items || [])]
            const draggedIndex = items.findIndex(item => item.id === draggedItem.id)
            
            if (draggedIndex !== -1 && targetIndex !== undefined && draggedIndex !== targetIndex) {
              // Remove from current position
              const [draggedItem] = items.splice(draggedIndex, 1)
              // Insert at new position
              const insertIndex = targetIndex > draggedIndex ? targetIndex - 1 : targetIndex
              items.splice(insertIndex, 0, draggedItem)
            }
            
            return { ...section, items }
          }
          return section
        })
        onChange(updatedSections)
      } else {
        // Move content between different sections
        const updatedSections = sections.map(section => {
          if (section.id === draggedItem.sectionId) {
            // Remove from source section
            return {
              ...section,
              items: section.items?.filter(item => item.id !== draggedItem.id) || []
            }
          } else if (section.id === targetSectionId) {
            // Add to target section
            const newItems = [...(section.items || [])]
            if (targetIndex !== undefined) {
              newItems.splice(targetIndex, 0, draggedContent)
            } else {
              newItems.push(draggedContent)
            }
            return { ...section, items: newItems }
          }
          return section
        })
        onChange(updatedSections)
      }
    }

    setDraggedItem(null)
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
    const isEditing = editingSectionId === section.id

    return (
      <div 
        key={section.id} 
        className="border border-gray-300 rounded-lg mb-4 bg-white hover:shadow-md transition-shadow"
        draggable
        onDragStart={(e) => handleDragStart(e, section.id, 'section')}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, section.id)}
      >
        <div 
          className="p-4 cursor-pointer"
          onClick={() => toggleSection(section.id)}
        >
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <div 
              className="text-gray-400 hover:text-gray-600 cursor-move"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="h-5 w-5" />
            </div>

            {/* Title - Editable */}
            <div className="flex-1 flex items-center gap-2">
              {isEditing ? (
                <div className="flex-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editingSectionName}
                    onChange={(e) => setEditingSectionName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') saveEditingSection()
                      if (e.key === 'Escape') cancelEditingSection()
                    }}
                    className="flex-1 px-3 py-1 border border-primary rounded focus:ring-2 focus:ring-primary focus:border-primary"
                    autoFocus
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={saveEditingSection}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={cancelEditingSection}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <span className="text-gray-900 font-medium">{section.title}</span>
              )}
            </div>

            {/* Section Actions */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* Section Menu Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveMenu(activeMenu === `section-${section.id}` ? null : `section-${section.id}`)
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {activeMenu === `section-${section.id}` && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button 
                      onClick={() => {
                        startEditingSection(section.id, section.title)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        copySection(section.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                    <button 
                      onClick={() => {
                        deleteSection(section.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Collapse/Expand Button */}
              <button
                onClick={() => toggleSection(section.id)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              >
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Nested Items */}
          {hasItems && isExpanded && (
            <div className="mt-4 ml-8 space-y-3">
              {section.items?.map((item, index) => (
                <div key={`item-${item.id}`}>
                  {/* Drop zone before item */}
                  <div
                    className="h-2 rounded transition-colors"
                    onDragOver={(e) => {
                      e.preventDefault()
                      e.currentTarget.classList.add('bg-primary/20')
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('bg-primary/20')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.currentTarget.classList.remove('bg-primary/20')
                      handleDrop(e, section.id, index)
                    }}
                  />
                  
                  <div 
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id, 'content', section.id)}
                  >
                  <div 
                    className="text-gray-400 hover:text-gray-600 cursor-move"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <div className="text-gray-600">
                    {getIcon(item.type)}
                  </div>
                    <div 
                      className="flex-1 flex items-center gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditContent(item.id, section.id)
                      }}
                    >
                      <span className="text-gray-900 hover:text-primary transition-colors">{item.title}</span>
                      {item.status && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded uppercase">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Drop zone after last item */}
                  {index === section.items!.length - 1 && (
                    <div
                      className="h-2 rounded transition-colors mt-3"
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.currentTarget.classList.add('bg-primary/20')
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('bg-primary/20')
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.currentTarget.classList.remove('bg-primary/20')
                        handleDrop(e, section.id, section.items!.length)
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Content Button */}
        <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setCurrentSectionId(section.id)
                setShowAddContentModal(true)
              }}
              icon={<Plus className="h-4 w-4" />}
            >
              Add New Content
            </Button>
            
         
          </div>
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
    setEditingContentId(null)
  }

  const handleEditContent = (contentId: string, sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    const content = section?.items?.find(item => item.id === contentId)
    
    if (content) {
      setEditingContentId(contentId)
      setCurrentSectionId(sectionId)
      // Determine content type and set appropriate selectedContentType
      if (content.type === 'video') {
        setSelectedContentType('url')
      } else {
        setSelectedContentType('lesson')
      }
    }
  }

  const handleUpdateContent = (data: any) => {
    if (editingContentId && currentSectionId) {
      const updatedSections = sections.map((section) => {
        if (section.id === currentSectionId) {
          const updatedItems = section.items?.map(item => 
            item.id === editingContentId 
              ? { ...item, title: data.name || item.title }
              : item
          ) || []
          return { ...section, items: updatedItems }
        }
        return section
      })
      onChange(updatedSections)
      setEditingContentId(null)
      setSelectedContentType(null)
      setCurrentSectionId(null)
    }
  }

  // If a content type is selected, render the content form page
  if (selectedContentType === 'url') {
    return (
      <URLContent
        onCancel={handleCancelContent}
        onSave={editingContentId ? handleUpdateContent : handleSaveContent}
      />
    )
  }

  if (selectedContentType === 'lesson') {
    return (
      <LessonContent
        onCancel={handleCancelContent}
        onSave={editingContentId ? handleUpdateContent : handleSaveContent}
      />
    )
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => renderSection(section))}

      {/* Add New Section */}
      {!showAddSection ? (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setShowAddSection(true)}
          icon={<Plus className="h-6 w-6" />}
          className="shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          Add New Section
        </Button>
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
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddSection}
            >
              Add
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddSection(false)
                setNewSectionName('')
              }}
            >
              Cancel
            </Button>
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
