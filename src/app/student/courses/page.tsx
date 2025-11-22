'use client'

import { useState } from 'react'
import StudentLayout from '@/components/StudentLayout'
import { Search, Clock, ChevronDown } from 'lucide-react'
import Button from '@/components/Button'

interface Course {
  id: string
  title: string
  badge: string
  image: string
  duration: string
  progress: number
  rating: number
  date: string
  status: 'not-started' | 'in-progress' | 'completed'
}

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedPricing, setSelectedPricing] = useState('Pricing')

  const courses: Course[] = [
    {
      id: '1',
      title: 'Smart Monetization: Groups Courses',
      badge: 'Monetize &amp; Grow Your Academy',
      image: '/course-1.jpg',
      duration: '0m',
      progress: 0,
      rating: 0,
      date: '10/15/2025',
      status: 'not-started',
    },
    {
      id: '2',
      title: 'Unlock Progress: Certificates of Achievement',
      badge: 'Build Your First Course',
      image: '/course-2.jpg',
      duration: '0m',
      progress: 100,
      rating: 0,
      date: '10/15/2025',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Mastering the Course Builder',
      badge: 'Build Your First Course',
      image: '/course-3.jpg',
      duration: '1h 30m',
      progress: 25,
      rating: 0,
      date: '08/07/2025',
      status: 'in-progress',
    },
    {
      id: '4',
      title: 'Creating Your First Course',
      badge: 'Build Your First Course',
      image: '/course-4.jpg',
      duration: '1h 40m',
      progress: 0,
      rating: 0,
      date: '07/30/2025',
      status: 'not-started',
    },
    {
      id: '5',
      title: 'Getting Started with Masteriyo LMS',
      badge: 'Build Your First Course',
      image: '/course-5.jpg',
      duration: '1h 15m',
      progress: 5,
      rating: 0,
      date: '07/30/2025',
      status: 'in-progress',
    },
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Courses</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option>All Categories</option>
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>

          {/* Pricing Dropdown */}
          <div className="relative">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option>Pricing</option>
              <option>Free</option>
              <option>Paid</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">📚</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                {/* Badge */}
                <span className="inline-block px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-medium rounded-full mb-3">
                  {course.badge}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {course.title}
                </h3>

                {/* Rating */}
                <div className="mb-3">
                  {renderStars(course.rating)}
                </div>

                {/* Duration and Progress */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <span className="font-medium">{course.progress}% Complete</span>
                </div>

                {/* Progress Bar */}
                {course.progress > 0 && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}

                {/* Date and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{course.date}</span>
                  <Button
                    variant="primary"
                    size="sm"
                  >
                    {course.status === 'completed' ? 'Completed' : course.status === 'in-progress' ? 'Continue' : 'Start Course'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1 - 5 out of 5
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Courses Per Page:</span>
            <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <div className="flex gap-1 ml-4">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                &lt;
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
