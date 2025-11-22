'use client'

import DashboardLayout from '@/components/AdminLayout'
import Button from '@/components/Button'
import { Search, ChevronDown, Edit, MoreVertical, Plus, Trash2, Eye, Copy } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Course {
  id: number
  title: string
  category: string
  instructor: string
  price: string
  students: number
  date: string
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [displayedCourses, setDisplayedCourses] = useState(10)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const courses: Course[] = [
    {
      id: 1,
      title: 'Coming Soon: Build Excitement Before You Launch',
      category: 'Build Your First Course',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:11 AM',
    },
    {
      id: 2,
      title: 'Challenge Yourself: Quizzes, Exams & Gradebook',
      category: 'Build Your First Course',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:10 AM',
    },
    {
      id: 3,
      title: 'Extend Without Limits: Webhooks, Zapier & Integrations',
      category: 'Customize &amp; Automate Your Platform',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:10 AM',
    },
    {
      id: 4,
      title: 'Private Learning Spaces: Invite-Only & Password-Protected Courses',
      category: 'Customize &amp; Automate Your Platform',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:10 AM',
    },
    {
      id: 5,
      title: 'Stay Connected: Tracking & Analytics Made Simple',
      category: 'Customize &amp; Automate Your Platform',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:08 AM',
    },
    {
      id: 6,
      title: 'Your Brand, Your Way: White Label & Customization',
      category: 'Customize &amp; Automate Your Platform',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:07 AM',
    },
    {
      id: 7,
      title: 'Engage & Inspire: Virtual Classes & Social Learning',
      category: 'Engage &amp; Retain Your Learners',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:07 AM',
    },
    {
      id: 8,
      title: 'Learn Together: Multi-Instructor & Group Enrollments',
      category: 'Monetize &amp; Grow Your Academy',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:06 AM',
    },
    {
      id: 9,
      title: 'Keep Learners Coming Back: Content Drip & Prerequisites',
      category: 'Engage &amp; Retain Your Learners',
      instructor: 'Mastoyo Team',
      price: 'Free',
      students: 0,
      date: '2025-09-25, 09:05 AM',
    },
    {
      id: 10,
      title: 'Smart Monetization: Groups Courses',
      category: 'Monetize &amp; Grow Your Academy',
      instructor: 'Mastoyo Team',
      price: '$15.00',
      students: 0,
      date: '2025-09-25, 09:05 AM',
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

  const loadMoreCourses = () => {
    setDisplayedCourses((prev) => Math.min(prev + 10, courses.length))
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

            <div className="relative flex-1 sm:flex-none">
              <button className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Pricing
                <ChevronDown size={18} />
              </button>
            </div>

            <div className="flex gap-3 sm:gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                Export
              </Button>

              <Button variant="primary" icon={<Plus size={18} />} className="flex-1 sm:flex-none">
                Add New Course
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
              <div className=" flex-shrink-0 flex items-center" >
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer accent-primary"
            />
          </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Title ↑
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Categories
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Instructors
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Date ↑
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, displayedCourses).map((course) => (
                <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className=" flex-shrink-0 flex items-center" >
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer accent-primary"
            />
          </div>

                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    👥 {course.students}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" icon={<Edit size={14} />}>
                        Edit
                      </Button>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === course.id ? null : course.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <MoreVertical size={16} className="text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === course.id && (
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
                            <div className="border-t border-gray-200 my-1"></div>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {courses.slice(0, displayedCourses).map((course) => (
            <div key={course.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-2">{course.title}</h3>
                  <p className="text-xs text-gray-600">{course.category}</p>
                </div>
                <input type="checkbox" className="rounded mt-1" />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600 text-xs">{course.instructor}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Price:</span>
                  <span className="ml-1 font-medium text-gray-900">{course.price}</span>
                </div>
                <div>
                  <span className="text-gray-500">Students:</span>
                  <span className="ml-1 font-medium text-gray-900">👥 {course.students}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                {course.date}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" icon={<Edit size={14} />} className="flex-1">
                  Edit
                </Button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === course.id ? null : course.id)}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                  >
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>

                  {openDropdown === course.id && (
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
                      <div className="border-t border-gray-200 my-1"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedCourses < courses.length && (
          <div className="flex justify-center py-8">
            <Button variant="outline" onClick={loadMoreCourses}>
              Load More Courses
            </Button>
          </div>
        )}

        {displayedCourses >= courses.length && courses.length > 0 && (
          <div className="flex justify-center py-8">
            <p className="text-sm text-gray-500">Showing all {courses.length} courses</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
