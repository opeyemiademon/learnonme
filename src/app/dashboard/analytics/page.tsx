'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Button from '@/components/Button'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('sales')
  const [dateRange, setDateRange] = useState('last-30')

  const tabs = ['Sales', 'Enrollment', 'Courses']

  const stats = [
    { label: 'Total Earnings', value: '$0', icon: '💰', color: 'bg-blue-100' },
    { label: 'Total Refunds', value: '$0', icon: '↩️', color: 'bg-red-100' },
    { label: 'Total Discounts', value: '$0', icon: '🏷️', color: 'bg-yellow-100' },
    { label: 'Total Courses', value: '10', icon: '📚', color: 'bg-green-100' },
    { label: 'Total Enrolled Courses', value: '13', icon: '✅', color: 'bg-purple-100' },
    { label: 'Total Lessons', value: '53', icon: '📖', color: 'bg-orange-100' },
  ]

  const popularCourses = [
    { name: 'Marketing For Course Builder', status: 'FREE', enrolled: 2, reviews: 0 },
    { name: 'Unlock Progress: Certificates of Achievement', status: 'FREE', enrolled: 1, reviews: 0 },
    { name: 'Creating Your First Course', status: 'FREE', enrolled: 1, reviews: 0 },
    { name: 'Getting Started with Masteriyo', status: 'LIVE', enrolled: 1, reviews: 0 },
    { name: 'Smart Monetization: Group Courses', status: 'PRO', enrolled: 1, reviews: 0 },
  ]

  const newStudents = [
    { username: 'kimberly01', fullName: 'Kimberly Pattie', email: 'kimberly.pattie@gmail.com', date: 'November 11, 2025 at 10:27 AM' },
    { username: 'vileoguin', fullName: 'Molly Tillman', email: 'vileoguin@mailinator.com', date: 'November 7, 2025 at 11:55 AM' },
    { username: 'juliafroyes', fullName: 'Juan Nunez', email: 'juanunez0219@gmail.com', date: 'November 5, 2025 at 03:55 PM' },
    { username: 'andreass1914', fullName: 'Andres Sanchez', email: 'andreass1914@gmail.com', date: 'October 21, 2025 at 01:36 PM' },
    { username: 'Coach', fullName: 'Mckenzie Okuneva', email: 'coachmorekole@gmail.com', date: 'October 17, 2025 at 08:22 PM' },
  ]

  const newInstructors = [
    { username: 'instructor02', fullName: 'Instructor02', email: 'instructor02@gmail.com', date: 'September 11, 2025 at 09:30 AM' },
    { username: 'instructor01', fullName: 'Instructor01', email: 'instructor01@gmail.com', date: 'September 11, 2025 at 08:31 AM' },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sales Tab Content */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Chart Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Oct 15, 2025 - Nov 13, 2025</span>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="last-7">Last 7 days</option>
                    <option value="last-30">Last 30 days</option>
                    <option value="last-90">Last 90 days</option>
                  </select>
                </div>
                <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Courses</option>
                </select>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-end justify-center gap-1 p-4">
                <div className="flex-1 h-12 bg-blue-400 rounded-t"></div>
                <div className="flex-1 h-8 bg-blue-400 rounded-t"></div>
                <div className="flex-1 h-16 bg-blue-400 rounded-t"></div>
                <div className="flex-1 h-20 bg-blue-400 rounded-t"></div>
                <div className="flex-1 h-24 bg-blue-400 rounded-t"></div>
                <div className="flex-1 h-32 bg-blue-400 rounded-t"></div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-600">Earnings</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className={`${stat.color} rounded-lg p-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Link */}
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Show More ↓
            </button>

            {/* Most Popular Courses */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Most Popular Courses</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">COURSE NAME</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ENROLLED COUNT</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">REVIEWS COUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularCourses.map((course, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">{course.name}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              course.status === 'FREE' ? 'bg-green-100 text-green-800' :
                              course.status === 'LIVE' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{course.enrolled}</td>
                        <td className="py-3 px-4 text-gray-600">{course.reviews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
              <p className="text-gray-600 text-sm">No reviews found</p>
            </div>

            {/* Newly Registered Students */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Newly Registered Students</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">USERNAME</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">FULL NAME</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">EMAIL</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">REGISTERED DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newStudents.map((student, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{student.username}</td>
                        <td className="py-3 px-4 text-gray-600">{student.fullName}</td>
                        <td className="py-3 px-4 text-gray-600">{student.email}</td>
                        <td className="py-3 px-4 text-gray-600">{student.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Newly Registered Instructors */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Newly Registered Instructors</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">USERNAME</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">FULL NAME</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">EMAIL</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">REGISTERED DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newInstructors.map((instructor, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{instructor.username}</td>
                        <td className="py-3 px-4 text-gray-600">{instructor.fullName}</td>
                        <td className="py-3 px-4 text-gray-600">{instructor.email}</td>
                        <td className="py-3 px-4 text-gray-600">{instructor.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Tab Content */}
        {activeTab === 'enrollment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Enrollment analytics coming soon...</p>
            </div>
          </div>
        )}

        {/* Courses Tab Content */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Courses analytics coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
