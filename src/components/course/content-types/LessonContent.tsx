'use client'

import { useState } from 'react'
import { Upload, X, FileText, Image as ImageIcon, Settings, Eye, Download } from 'lucide-react'
import TextEditor from '../../TextEditor'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Lesson</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Add engaging content for your students</p>
            </div>
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Lesson Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Lesson Details</h2>
              </div>

              <div className="space-y-6">
                {/* Lesson Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lesson Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your lesson name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                {/* Lesson Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lesson Description *
                  </label>
                  <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <TextEditor 
                      height={400} 
                      placeholder="Enter lesson description..." 
                      value={formData.description}
                      onChange={(content: string) => setFormData((prev) => ({ ...prev, description: content }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Media */}
          <div className="space-y-8">
            {/* Lesson Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
              </div>

              {/* Enable Lesson Preview */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Enable Lesson Preview
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Allow students to preview this lesson</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      enableLessonPreview: !prev.enableLessonPreview,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.enableLessonPreview ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enableLessonPreview ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3 my-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Image</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      onClick={() => {
                        setImagePreview(null)
                        setFormData((prev) => ({ ...prev, featuredImage: null }))
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <span className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        Choose Image
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG, PNG up to 10MB</p>
                  </>
                )}
              </div>
            
            
               <div className="flex items-center gap-3 my-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Download Materials</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
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
                  <span className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Upload Files
                  </span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PDF, DOC, ZIP files allowed</p>
                {formData.downloadMaterials.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {formData.downloadMaterials.length} file(s) selected:
                    </p>
                    <div className="space-y-1">
                      {formData.downloadMaterials.map((file, index) => (
                        <div key={index} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>



              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              Publish Lesson
            </button>
            <button 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
        
          </div>
        </div>

      
      </div>
    </div>
  )
}
