'use client'

import { useState } from 'react'
import Image from 'next/image'

interface OverviewStepProps {
  formData: {
    courseName: string
    courseDescription: string
    courseHighlights: string[]
    featured: boolean
    categories: string[]
    slug: string
    featuredImage: File | null
    featuredVideo: File | null
    attachments: File[]
  }
  onChange: (field: string, value: any) => void
}

export default function OverviewStep({ formData, onChange }: OverviewStepProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showCategorySearch, setShowCategorySearch] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')

  const availableCategories = [
    'Build Your First Course',
    'Monetize & Grow Your Academy',
    'Engage & Retain Your Learners',
    'Customize & Automate Your Platform',
    'demo course'
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange('featuredImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleCategory = (category: string) => {
    const categories = formData.categories || []
    if (categories.includes(category)) {
      onChange('categories', categories.filter(c => c !== category))
    } else {
      onChange('categories', [...categories, category])
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange('courseDescription', e.target.value)
  }

  const handleHighlightsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const highlights = e.target.value.split('\n').filter(h => h.trim())
    onChange('courseHighlights', highlights)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Name
          </label>
          <input
            type="text"
            value={formData.courseName}
            onChange={(e) => onChange('courseName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Challenge Yourself: Quizzes, Exams & Gradebook"
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Description
          </label>
          <div className="border border-gray-300 rounded-lg">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap">
              <select className="text-sm border-0 bg-transparent">
                <option>Paragraph</option>
              </select>
              <div className="h-4 w-px bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded" title="Bold">
                <span className="font-bold text-sm">B</span>
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded" title="Italic">
                <span className="italic text-sm">I</span>
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded" title="Underline">
                <span className="underline text-sm">U</span>
              </button>
              <div className="h-4 w-px bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≡</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≣</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">"</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≡</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">⊕</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">⊖</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">🔗</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">⊗</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">🖼</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">⚙</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-sm">▤</button>
              <button className="p-1.5 hover:bg-gray-200 rounded text-xs">H&P</button>
            </div>
            {/* Editor Area */}
            <textarea
              value={formData.courseDescription}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-3 min-h-[300px] focus:outline-none resize-none"
              placeholder="Enter course description..."
            />
          </div>
        </div>

        {/* Course Highlights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Highlights
          </label>
          <textarea
            value={formData.courseHighlights.join('\n')}
            onChange={handleHighlightsChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
            placeholder="• Test Your Knowledge with Engaging Quizzes&#10;• Prepare with Real Exam Experience&#10;• Track Progress with an Intelligent Gradebook&#10;• Turn Weakness into Strength&#10;• Stay Motivated with Clear Milestones&#10;• Build Confidence for the Real World"
          />
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* Featured Toggle */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Featured</label>
            <button
              onClick={() => onChange('featured', !formData.featured)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.featured ? 'bg-orange-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Categories
          </label>
          
          {/* Search Input */}
          <div className="relative mb-3">
            <input
              type="text"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              onFocus={() => setShowCategorySearch(true)}
              className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search Categories"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category List */}
          <div className="space-y-2 mb-3">
            {availableCategories
              .filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()))
              .map((category) => (
                <label key={category} className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories?.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mt-0.5 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
          </div>

          {/* Add New Category */}
          <button className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Category
          </button>
        </div>

        {/* Slug */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="challenge-yourself-quizzes-exams-grade"
          />
        </div>

        {/* Featured Image */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <div className="text-xs text-gray-500 mb-2">
            {formData.featuredImage?.name || '20251104quiz-...jpg'}
          </div>
          {imagePreview && (
            <div className="mb-3 rounded-lg overflow-hidden border border-gray-200">
              <img src={imagePreview} alt="Featured" className="w-full h-auto" />
            </div>
          )}
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </span>
            </label>
            <button className="text-sm text-gray-600 hover:text-gray-800">✕</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">👁</button>
          </div>
        </div>

        {/* Featured Video */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Video
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-2">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
              </svg>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => onChange('featuredVideo', e.target.files?.[0] || null)}
                className="hidden"
              />
              <span className="text-sm text-orange-600 hover:text-orange-700">Upload Video</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">MP4 and WebM formats, Max size 64 MB</p>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-2">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                onChange={(e) => onChange('attachments', Array.from(e.target.files || []))}
                className="hidden"
              />
              <span className="text-sm text-orange-600 hover:text-orange-700">
                Drop documents or click here to upload
              </span>
            </label>
            <div className="mt-2">
              <button className="px-3 py-1.5 text-xs text-orange-600 border border-orange-600 rounded hover:bg-blue-50">
                WP Media Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
