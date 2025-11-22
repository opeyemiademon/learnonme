'use client'

import { useState } from 'react'

interface EnrolledStudent {
  id: string
  username: string
  email: string
  progress: number
}

interface Instructor {
  id: string
  name: string
  username: string
  email: string
}

export default function SalesReport() {
  const [dateRange, setDateRange] = useState('last-30')
  const [courseFilter, setCourseFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const enrolledStudents: EnrolledStudent[] = [
    { id: '1', username: 'johndoe6514402', email: 'johndoe6514@gmail.com', progress: 0 },
    { id: '2', username: 'Carah', email: 'coachmore88@gmail.com', progress: 0 },
    { id: '3', username: 'goldgoldgoldgoldgoldgolds', email: 'mike.goldsmith@gmail.com', progress: 0 },
  ]

  const instructors: Instructor[] = [
    { id: '1', name: 'Mastery Team', username: 'slearnovs5884', email: 'jylemon@gmail.com' },
    { id: '2', name: 'Instructor02', username: 'instructor02', email: 'instructor02@gmail.com' },
    { id: '3', name: 'Instructor01', username: 'instructor01', email: 'instructor01@gmail.com' },
  ]

  const stats = [
    { label: 'Total Lessons', value: '2', icon: '📚', color: 'bg-orange-100' },
    { label: 'Total Quizzes', value: '1', icon: '📝', color: 'bg-teal-100' },
    { label: 'Total Questions', value: '5', icon: '❓', color: 'bg-pink-100' },
    { label: 'Total Reviews', value: '0', icon: '⭐', color: 'bg-yellow-100' },
    { label: 'Total Q/A', value: '0', icon: '💬', color: 'bg-purple-100' },
    { label: 'Total Students', value: '3', icon: '👥', color: 'bg-green-100' },
  ]

  const filteredStudents = enrolledStudents.filter(
    (student) =>
      student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  return (
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
          <div className="flex items-center gap-2">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Courses</option>
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
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

      {/* Show Less Link */}
      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        Show Less ↑
      </button>

      {/* Enrolled Students Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enrolled Students</h3>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Add Student Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">USERNAME</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">EMAIL</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">PROGRESS</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{student.username}</td>
                  <td className="py-3 px-4 text-gray-600">{student.email}</td>
                  <td className="py-3 px-4 text-gray-600">{student.progress}%</td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                      Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}
          </span>
          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Instructors</h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">NAME</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">USERNAME</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{instructor.name}</td>
                  <td className="py-3 px-4 text-gray-600">{instructor.username}</td>
                  <td className="py-3 px-4 text-gray-600">{instructor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
