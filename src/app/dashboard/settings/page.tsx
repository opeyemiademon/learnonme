'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Button from '@/components/Button'

interface MenuItem {
  id: string
  label: string
  icon: string
  expanded: boolean
  submenu: { id: string; label: string }[]
}

interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
  hasEdit: boolean
}

export default function SettingsPage() {
  const [selectedMenu, setSelectedMenu] = useState('general')
  const [expandedSections, setExpandedSections] = useState<string[]>(['general-section'])

  interface MenuSection {
    id: string
    label: string
    icon: string
    items: { id: string; label: string }[]
  }

  const menuSections: MenuSection[] = [
    {
      id: 'general-section',
      label: 'General',
      icon: '⚙️',
      items: [
        { id: 'general', label: 'General Settings' },
      ],
    },
    {
      id: 'pages-section',
      label: 'Pages',
      icon: '📄',
      items: [
        { id: 'courses-page', label: 'Courses Page' },
        { id: 'learn-page', label: 'Learn Page' },
        { id: 'accounts-page', label: 'Accounts Page' },
      ],
    },
    {
      id: 'system-section',
      label: 'System',
      icon: '⚙️',
      items: [
        { id: 'payments', label: 'Payments' },
        { id: 'emails', label: 'Emails' },
        { id: 'authentication', label: 'Authentication' },
      ],
    },
    {
      id: 'advanced-section',
      label: 'Advanced',
      icon: '⚡',
      items: [
        { id: 'quiz', label: 'Quiz' },
        { id: 'advanced', label: 'Advanced Settings' },
        { id: 'integrations', label: 'Integrations' },
      ],
    },
  ]

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: 'course-enrollment', label: 'Course Enrollment', description: '', enabled: true, hasEdit: true },
    { id: 'content', label: 'Content', description: '', enabled: true, hasEdit: true },
    { id: 'order-completed', label: 'Order Completed', description: '', enabled: true, hasEdit: true },
    { id: 'order-onhold', label: 'Order OnHold', description: '', enabled: true, hasEdit: true },
    { id: 'course-completion', label: 'Course Completion', description: '', enabled: true, hasEdit: true },
    { id: 'order-cancelled', label: 'Order Cancelled', description: '', enabled: true, hasEdit: true },
    { id: 'order-created', label: 'Order Created', description: '', enabled: true, hasEdit: true },
    { id: 'quiz-attempt', label: 'Quiz Attempt', description: '', enabled: true, hasEdit: true },
    { id: 'qa', label: 'Question & Answers', description: '', enabled: true, hasEdit: true },
    { id: 'assignment-reviewed', label: 'Assignment Reviewed', description: '', enabled: true, hasEdit: true },
    { id: 'course-announcement', label: 'Course Announcement', description: '', enabled: true, hasEdit: true },
    { id: 'zoom', label: 'Zoom', description: '', enabled: true, hasEdit: true },
    { id: 'content-drip', label: 'Content Drip', description: '', enabled: true, hasEdit: true },
  ])

  const toggleSectionExpanded = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    )
  }

  const handleSaveSettings = () => {
    console.log('Settings saved:', notifications)
  }

  const getMenuLabel = (menuId: string) => {
    for (const section of menuSections) {
      const item = section.items.find((i) => i.id === menuId)
      if (item) return item.label
    }
    return 'Settings'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        </div>

        {/* Sidebar and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {menuSections.map((section, index) => (
                <div key={section.id} className="relative">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSectionExpanded(section.id)}
                    className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index !== menuSections.length - 1 || expandedSections.includes(section.id)
                        ? 'border-b border-gray-200'
                        : ''
                    } ${
                      expandedSections.includes(section.id) ? 'border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {section.id === 'general-section' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        )}
                        {section.id === 'pages-section' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                        {section.id === 'system-section' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        )}
                        {section.id === 'advanced-section' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        )}
                      </svg>
                      <span className={`text-sm font-medium ${
                        expandedSections.includes(section.id) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {section.label}
                      </span>
                    </div>
                    <svg
                      className={`h-5 w-5 transition-transform ${
                        expandedSections.includes(section.id) ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Section Menu Items - Collapsible */}
                  {expandedSections.includes(section.id) && (
                    <div className="border-b border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
                      {section.items.map((item, itemIndex) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedMenu(item.id)}
                          className={`w-full px-4 py-3 pl-12 flex items-center gap-3 text-sm transition-colors ${
                            selectedMenu === item.id
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          } ${
                            itemIndex !== section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${
                            selectedMenu === item.id ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getMenuLabel(selectedMenu)}</h2>

              {selectedMenu === 'general' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">General settings content goes here.</p>
                </div>
              )}

              {selectedMenu === 'integrations' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">MailerLite Integration</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <p><strong>MailerLite API Key Setup:</strong></p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Log in to your MailerLite account. If you don't have an account, <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">sign up here</a>.</li>
                            <li>Once logged in, navigate to the "Integrations" section to manage your API keys. <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Go to API Integrations</a></li>
                            <li>Generate a new API key, then copy it and paste it into the "MailerLite API Key" field in the plugin settings.</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        MailerLite API Key
                        <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your API key"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <Button variant="outline" size="md">
                      Connect
                    </Button>
                  </div>
                </div>
              )}

              {selectedMenu !== 'general' && selectedMenu !== 'integrations' && (
                <div className="text-gray-600 dark:text-gray-400">
                  <p>{getMenuLabel(selectedMenu)} settings content goes here.</p>
                </div>
              )}

              <Button variant="primary" size="md" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
