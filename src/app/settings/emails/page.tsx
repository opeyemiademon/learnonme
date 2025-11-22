'use client'

import DashboardLayout from '@/components/AdminLayout'
import { Mail, Upload, Trash2, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function EmailsSettingsPage() {
  const [formData, setFormData] = useState({
    fromName: 'eLearning',
    fromAddress: 'wpadmin@instapp.com',
    templateLogo: 'masteriyo-email-template-logo.png',
    headerBackground: 'email-template-header-bg-img.png',
    footerText: 'Thanks,\n{site_title} Team',
  })

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-secondary" size={20} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Emails</h1>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* General Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">General</h2>

                {/* From Name */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    From Name
                    <HelpCircle size={14} className="text-gray-400" />
                  </label>
                  <input
                    type="text"
                    value={formData.fromName}
                    onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                {/* From Address */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    From Address
                    <HelpCircle size={14} className="text-gray-400" />
                  </label>
                  <input
                    type="email"
                    value={formData.fromAddress}
                    onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                {/* Template Logo */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Template Logo
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-secondary rounded-lg"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Upload size={16} />
                          Upload Image
                        </button>
                        <button className="px-4 py-2 bg-white border border-secondary text-secondary rounded-lg text-sm font-medium hover:bg-secondary/10 flex items-center gap-2">
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Size: 150x50 pixels, Max Width: 180 pixels and Max Height: 80 pixels
                      </p>
                      <p className="text-xs text-gray-500">
                        File Support: jpg, jpeg or .png
                      </p>
                    </div>
                  </div>
                </div>

                {/* Header Background */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Header Background
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-secondary/20 border-2 border-dashed border-gray-300 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Upload size={16} />
                          Upload Image
                        </button>
                        <button className="px-4 py-2 bg-white border border-secondary text-secondary rounded-lg text-sm font-medium hover:bg-secondary/10 flex items-center gap-2">
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Size: 960x90 pixels, Max Width: 600 pixels;
                      </p>
                      <p className="text-xs text-gray-500">
                        File Support: jpg, jpeg or .png
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Text */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Footer Text
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
                      <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                        <option>Paragraph</option>
                      </select>
                      <div className="flex gap-1 ml-2">
                        <button className="p-1.5 hover:bg-gray-200 rounded" title="Bold">
                          <strong>B</strong>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded" title="Italic">
                          <em>I</em>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded" title="Underline">
                          <u>U</u>
                        </button>
                      </div>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≡</button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≡</button>
                      <button className="p-1.5 hover:bg-gray-200 rounded text-sm">≡</button>
                    </div>
                    {/* Editor */}
                    <textarea
                      value={formData.footerText}
                      onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                    <button className="hover:text-gray-700">≡ HSP</button>
                    <button className="hover:text-gray-700">Math</button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button className="px-6 py-2.5 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  )
}
