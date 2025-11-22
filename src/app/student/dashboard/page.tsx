'use client'

import StudentLayout from '@/components/StudentLayout'
import { BookOpen, Award, FileText, TrendingUp } from 'lucide-react'
import Button from '@/components/Button'

export default function StudentDashboardPage() {
  const stats = [
    { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'bg-secondary' },
    { label: 'Active Courses', value: '2', icon: TrendingUp, color: 'bg-secondary' },
    { label: 'Completed Courses', value: '1', icon: Award, color: 'bg-secondary' },
    { label: 'Certificates', value: '1', icon: FileText, color: 'bg-secondary' },
  ]

  const recentCourses = [
    {
      id: '1',
      title: 'Mastering the Course Builder',
      progress: 25,
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Getting Started with Masteriyo LMS',
      progress: 5,
      status: 'in-progress',
    },
  ]

  return (
    <StudentLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Masteriyo Team! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Recent Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Continue Learning
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {course.title}
                  </h3>
                  <span className="text-sm font-medium text-secondary">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <Button variant="primary" size="sm">
                  Continue
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
