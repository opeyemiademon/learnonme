'use client'

import StudentLayout from '@/components/StudentLayout'
import Button from '@/components/Button'
import { Clock, Download, Eye } from 'lucide-react'

interface Certificate {
  id: string
  courseTitle: string
  badge: string
  duration: string
  startDate: string
  image: string
}

export default function StudentCertificatesPage() {
  const certificates: Certificate[] = [
    {
      id: '1',
      courseTitle: 'Unlock Progress: Certificates of Achievement',
      badge: 'Build Your First Course',
      duration: '0m',
      startDate: '10/15/2025',
      image: '/certificate-1.jpg',
    },
  ]

  return (
    <StudentLayout>
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Certificates</h1>

        {/* Certificates List */}
        <div className="space-y-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Certificate Image */}
                <div className="w-full md:w-64 h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-center p-6">
                    <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center">
                      <span className="text-6xl">🎓</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge */}
                    <span className="inline-block px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-medium rounded-full mb-3">
                      {certificate.badge}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {certificate.courseTitle}
                    </h3>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                      <Clock size={18} />
                      <span>{certificate.duration}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Started on {certificate.startDate}
                    </span>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button variant="primary" size="sm">
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no certificates) */}
        {certificates.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-5xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete courses to earn certificates and showcase your achievements.
            </p>
            <Button variant="primary" size="md">
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
