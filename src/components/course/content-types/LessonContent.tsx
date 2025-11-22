'use client'

import { useState } from 'react'

interface LessonContentProps {
  onCancel: () => void
  onSave: (data: any) => void
}

export default function LessonContent({ onCancel, onSave }: LessonContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    enableLessonPreview: false,
    featuredImage: null as File | null,
    imagePreview: '',
    downloadMaterials: [] as File[],
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Add Lesson</h2>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lesson Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your lesson Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Lesson Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Description
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
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-4 py-3 min-h-[300px] focus:outline-none resize-none"
                    placeholder="Enter lesson description..."
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Enable Lesson Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Enable Lesson Preview
                  </label>
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        enableLessonPreview: !prev.enableLessonPreview,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.enableLessonPreview ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.enableLessonPreview ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Featured" className="w-full h-auto rounded" />
                  ) : (
                    <>
                      <svg className="h-8 w-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <span className="text-sm text-orange-600 hover:text-orange-700">
                          Upload Image
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">JPG and PNG formats, Max size 64 MB</p>
                    </>
                  )}
                </div>
              </div>

              {/* Download Materials */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Download Materials
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <svg className="h-6 w-6 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          downloadMaterials: Array.from(e.target.files || []),
                        }))
                      }
                      className="hidden"
                    />
                    <span className="text-sm text-orange-600 hover:text-orange-700">
                      Drop documents or click here to upload
                    </span>
                  </label>
                  <button className="mt-2 px-3 py-1.5 text-xs text-orange-600 border border-orange-600 rounded hover:bg-orange-50">
                    WP Media Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Footer */}
      <div className="flex gap-2 justify-start pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
        >
          Publish Lesson
        </button>
        <button className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
          Save Lesson To Draft
        </button>
      </div>
    </div>
  )
}
