'use client'

import { useState } from 'react'
import { Upload, X, FileText, Image as ImageIcon, Settings, Eye, Download, Video, Clock, Play, Link, Subtitles } from 'lucide-react'

interface URLContentProps {
  onCancel: () => void
  onSave: (data: any) => void
}


export default function URLContent({ onCancel, onSave }: URLContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    videoSource: 'youtube',
    videoUrl: '', 
    enableVideoShare: false,
    enableRightClick: false,
    enableVideoPreview: false,
    enableLessonPreview: false,
    featuredImage: null as File | null,
    imagePreview: '',
    downloadMaterials: [] as File[],
    slideTimestamp: 0,
    timecodeStart: '0:00',
    timecodeEnd: '0:00',
    titleName: '',
    subtitles: [] as any[],
    videoDuration: { hours: 0, minutes: 0, seconds: 0 },
    lessonDescription: '',
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Video Content</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Create engaging video lessons from YouTube, Vimeo, or custom URLs</p>
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
                  placeholder="video 1.2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Video Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Source
                </label>
                <select
                  value={formData.videoSource}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, videoSource: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="custom">Custom URL</option>
                </select>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/embed/"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Video Preview */}
              {formData.videoUrl && (
                <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                    <p className="text-sm">Video Preview</p>
                  </div>
                </div>
              )}

              {/* Remove Button */}
              <button className="px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50">
                Remove
              </button>

              {/* Slide to Select Timestamp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slide To Select Timestamp
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">0:00</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.slideTimestamp}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slideTimestamp: parseInt(e.target.value),
                        }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">0:00</span>
                  </div>
                </div>
              </div>

              {/* Timecode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timecode 5:00 - 0:00
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.timecodeStart}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, timecodeStart: e.target.value }))
                    }
                    placeholder="0:00"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">-</span>
                  <input
                    type="text"
                    value={formData.timecodeEnd}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, timecodeEnd: e.target.value }))
                    }
                    placeholder="0:00"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Title Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Name
                </label>
                <input
                  type="text"
                  value={formData.titleName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, titleName: e.target.value }))
                  }
                  placeholder="Title Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium">
                  Add
                </button>
              </div>

              {/* Subtitles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitles
                </label>
                <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
                  <svg className="h-8 w-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                  </svg>
                  <p className="text-sm">No subtitles available.</p>
                </div>
              </div>

              {/* Video Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Duration (hh:mm:ss)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={formData.videoDuration.hours}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        videoDuration: {
                          ...prev.videoDuration,
                          hours: parseInt(e.target.value) || 0,
                        },
                      }))
                    }
                    placeholder="0"
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={formData.videoDuration.minutes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        videoDuration: {
                          ...prev.videoDuration,
                          minutes: parseInt(e.target.value) || 0,
                        },
                      }))
                    }
                    placeholder="0"
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={formData.videoDuration.seconds}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        videoDuration: {
                          ...prev.videoDuration,
                          seconds: parseInt(e.target.value) || 0,
                        },
                      }))
                    }
                    placeholder="0"
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Lesson Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Description
                </label>
                <textarea
                  value={formData.lessonDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, lessonDescription: e.target.value }))
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Video Settings */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-gray-900">Video Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.enableVideoShare}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          enableVideoShare: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Enable Video Share</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.enableRightClick}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          enableRightClick: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Enable Right Click</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.enableVideoPreview}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          enableVideoPreview: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Enable Video Preview</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.enableLessonPreview}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          enableLessonPreview: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Enable Lesson Preview</span>
                  </label>
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
    </div>
  )
}
