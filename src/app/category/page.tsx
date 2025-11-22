'use client'

import DashboardLayout from '@/components/AdminLayout'
import Button from '@/components/Button'
import { Search, ChevronDown, Edit, MoreVertical, Plus, Trash2, Eye, Copy } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface SubCategory {
  id: string
  title: string
  count: number
  children?: SubCategory[]
}

interface Category {
  id: string
  title: string
  count: number
  expanded?: boolean
  children?: SubCategory[]
}

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['cat-1']))
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [displayedCategories, setDisplayedCategories] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [selectedMoveCategory, setSelectedMoveCategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories: Category[] = [
    {
      id: 'cat-1',
      title: 'Administration',
      count: 0,
      expanded: true,
      children: [
        {
          id: 'subcat-1-1',
          title: 'Accounting',
          count: 0,
          children: [
            {
              id: 'subsubcat-1-1-1',
              title: '100 LEVEL',
              count: 0,
              children: [
                { id: 'item-1-1-1-1', title: 'First Semester', count: 2 },
                { id: 'item-1-1-1-2', title: 'Second Semester', count: 3 },
              ],
            },
            {
              id: 'subsubcat-1-1-2',
              title: '200 LEVEL',
              count: 0,
            },
          ],
        },
        {
          id: 'subcat-1-2',
          title: 'Banking and Finance',
          count: 0,
        },
        {
          id: 'subcat-1-3',
          title: 'Business Administration',
          count: 1,
        },
        {
          id: 'subcat-1-4',
          title: 'Entrepreneurship Studies',
          count: 0,
        },
        {
          id: 'subcat-1-5',
          title: 'Marketing',
          count: 0,
        },
        {
          id: 'subcat-1-6',
          title: 'Public Administration',
          count: 0,
        },
        {
          id: 'subcat-1-7',
          title: 'Security and Investment Studies',
          count: 0,
        },
        {
          id: 'subcat-1-8',
          title: 'Taxation',
          count: 0,
        },
      ],
    },
    {
      id: 'cat-2',
      title: 'Agriculture',
      count: 0,
      children: [
        {
          id: 'subcat-2-1',
          title: 'Agricultural Economics and Extension',
          count: 0,
          children: [
            {
              id: 'subsubcat-2-1-1',
              title: '100 LEVEL',
              count: 0,
            },
            {
              id: 'subsubcat-2-1-2',
              title: '200 LEVEL',
              count: 0,
            },
          ],
        },
        {
          id: 'subcat-2-2',
          title: 'Agronomy (Crop and Soil Science)',
          count: 0,
        },
        {
          id: 'subcat-2-3',
          title: 'Animal Science',
          count: 0,
        },
        {
          id: 'subcat-2-4',
          title: 'Aquaculture and Fisheries Management',
          count: 0,
        },
        {
          id: 'subcat-2-5',
          title: 'Forestry, Wildlife and Ecotourism',
          count: 0,
        },
      ],
    },
  ]



  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCategories(newExpanded)
  }

  const loadMoreCategories = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedCategories((prev) => Math.min(prev + 1, categories.length))
      setIsLoading(false)
    }, 500)
  }

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === categories.length) {
      setSelectedItems(new Set())
    } else {
      const allIds = new Set(categories.map((cat) => cat.id))
      setSelectedItems(allIds)
    }
  }

  const handleDeleteSelected = () => {
    if (confirm(`Delete ${selectedItems.size} selected item(s)?`)) {
      setSelectedItems(new Set())
      // Add delete logic here
    }
  }

  const handleMoveSelected = () => {
    if (!selectedMoveCategory) {
      alert('Please select a category to move to')
      return
    }
    if (confirm(`Move ${selectedItems.size} item(s) to selected category?`)) {
      setSelectedItems(new Set())
      setSelectedMoveCategory(null)
      // Add move logic here
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }))

  const renderCategoryRow = (item: any, level: number = 0) => {
    const isExpanded = expandedCategories.has(item.id)
    const hasChildren = item.children && item.children.length > 0
    const paddingLeft = level * 40

    return (
      <div key={item.id}>
        {/* Desktop View */}
        <div className="hidden md:flex items-center border-b border-gray-200 hover:bg-gray-50 transition-colors">
          {/* Checkbox */}
          <div className="px-6 py-4 flex-shrink-0 flex items-center" style={{ paddingLeft: `${paddingLeft + 24}px` }}>
            <input 
              type="checkbox" 
              checked={selectedItems.has(item.id)}
              onChange={() => toggleItemSelection(item.id)}
              className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer accent-primary"
            />
          </div>

          {/* Title with expand/collapse */}
          <div className="flex-1 py-4 flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={() => toggleExpand(item.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
            {!hasChildren && <span className="w-6" />}
            <span className="text-sm text-gray-700">{item.title}</span>
          </div>

          {/* Count */}
          <div className="px-6 py-4 text-sm text-gray-600 w-16 text-right">{item.count}</div>

          {/* Actions */}
          <div className="px-6 py-4 flex items-center gap-2">
            <Button variant="outline" size="sm" icon={<Edit size={14} />}>
              Edit
            </Button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                <MoreVertical size={16} className="text-gray-600" />
              </button>

              {openDropdown === item.id && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit size={16} className="text-primary" />
                    <span>Edit</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Eye size={16} className="text-primary" />
                    <span>Preview</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Copy size={16} className="text-primary" />
                    <span>Duplicate</span>
                  </button>
                  <div className="border-t border-gray-200 my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden border-b border-gray-200 hover:bg-gray-50 transition-colors p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <input 
                type="checkbox" 
                checked={selectedItems.has(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer accent-primary mt-1 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                    >
                      {isExpanded ? '−' : '+'}
                    </button>
                  )}
                  {!hasChildren && <span className="w-6" />}
                  <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">Count: {item.count}</p>
              </div>
            </div>
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                <MoreVertical size={16} className="text-gray-600" />
              </button>

              {openDropdown === item.id && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit size={16} className="text-primary" />
                    <span>Edit</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Eye size={16} className="text-primary" />
                    <span>Preview</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Copy size={16} className="text-primary" />
                    <span>Duplicate</span>
                  </button>
                  <div className="border-t border-gray-200 my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div>
            {item.children.map((child: any) => renderCategoryRow(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 my-6">
        {/* Search and Filter Area */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1 sm:flex-none">
              <button className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                All Categories
                <ChevronDown size={18} />
              </button>
            </div>

           

              <Button variant="primary" icon={<Plus size={18} />} className="flex-1 sm:flex-none">
                Add New Category
              </Button>
            </div>
          </div>
       

        {/* Bulk Actions Toolbar */}
        {selectedItems.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">
                {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <select
                  value={selectedMoveCategory || ''}
                  onChange={(e) => setSelectedMoveCategory(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Move to category...</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMoveSelected}
                disabled={!selectedMoveCategory}
              >
                Move
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Hierarchical Category View */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header - Desktop Only */}
          <div className="hidden md:flex items-center border-b border-gray-200 bg-gray-50">
            <div className="px-6 py-3 flex-shrink-0 flex items-center">
              <input 
                type="checkbox" 
                checked={selectedItems.size === categories.length && categories.length > 0}
                onChange={toggleSelectAll}
                className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer accent-primary"
              />
            </div>
            <div className="flex-1 py-3 text-xs font-semibold text-gray-700 uppercase">
              Category
            </div>
            <div className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase  w-36">
              Count
            </div>
            <div className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
              Actions
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="text-xs font-semibold text-gray-700 uppercase">Categories</h3>
          </div>

          {/* Category Rows */}
          <div>
            {categories.slice(0, displayedCategories).map((category) => renderCategoryRow(category, 0))}
          </div>
        </div>

        {/* Load More Button */}
        {displayedCategories < categories.length && (
          <div className="flex justify-center py-8">
            <Button 
              variant="outline" 
              onClick={loadMoreCategories}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More Categories'}
            </Button>
          </div>
        )}

        {displayedCategories >= categories.length && categories.length > 0 && (
          <div className="flex justify-center py-8">
            <p className="text-sm text-gray-500">Showing all {categories.length} categories</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default CategoryPage