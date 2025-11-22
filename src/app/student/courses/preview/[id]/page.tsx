'use client'

import { useState } from 'react'
import StudentLayout from '@/components/StudentLayout'
import { Heart, Share2, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react'
import Button from '@/components/Button'

interface Section {
  id: string
  title: string
  lessons: number
  expanded: boolean
}

interface CoursePreview {
  id: string
  title: string
  badge: string
  image: string
  instructor: string
  instructorLogo: string
  description: string
  lastUpdated: string
  startedAt: string
  status: 'available' | 'coming-soon'
  comingSoonDate?: string
  countdownDays?: number
  countdownHours?: number
  countdownMinutes?: number
  countdownSeconds?: number
  sections?: Section[]
  includes?: string[]
  overview?: string
}

export default function CoursePreviewPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['section-1'])

  const courseData: CoursePreview = {
    id: params.id,
    title: 'Creating Your First Course',
    badge: 'BUILD YOUR FIRST COURSE',
    image: '/course-preview.jpg',
    instructor: 'Masteriyo Team',
    instructorLogo: '/masteriyo-logo.png',
    description: 'Build your dream course today, no coding, no stress.',
    lastUpdated: 'October 15, 2025',
    startedAt: 'July 30, 2025',
    status: 'available',
    sections: [
      {
        id: 'section-1',
        title: 'Start Smart: Build the Backbone of Your Course',
        lessons: 2,
        expanded: true,
      },
      {
        id: 'section-2',
        title: 'Bring Lessons to Life, Fast',
        lessons: 3,
        expanded: false,
      },
      {
        id: 'section-3',
        title: 'Design a Course That Flows Naturally',
        lessons: 2,
        expanded: false,
      },
      {
        id: 'section-4',
        title: 'Customize Everything Like It\'s Made for You',
        lessons: 2,
        expanded: false,
      },
      {
        id: 'section-5',
        title: 'Preview, Polish & Publish',
        lessons: 2,
        expanded: false,
      },
    ],
    overview: `Build your dream course today, no coding, no stress.

• Course Structure Blueprint
Understand the roles of courses, sections, and lessons, and map out your content before you build.

• Fluid, Reload-Free Builder
Use Masteriyo's editor to add and organize sections & lessons without ever reloading the page.

• Lightning-Fast Creation
Spin up a new section or lesson in under a minute, no more tedious setup.

• Versatile Lesson Types
Choose between text, video, quizzes, assignments, and more to deliver the right learning experience.

• Rich Media & Formatting
Embed videos, attach files, and apply polished formatting so your lessons look and feel professional.

• Intuitive Course Flow
Design a seamless learning journey from first click to final quiz rather than a static list of modules.

• Safe, Flexible Editing
Move, tweak, and refine content on the fly with zero risk of breaking your course.

• Total Customization
Control difficulty levels, access rules, visibility, and even make a course private with just a few clicks.

• Student-View Preview
See exactly what learners will see, polish any rough edges, then publish as a draft, public course, or soft-launch.`,
    includes: [
      'Master the art of anticipation',
      'Proven pre-launch strategies',
      'Build loyal followers early',
      'Practical tools & templates',
      'Psychology of anticipation',
    ],
  }

  const comingSoonCourse: CoursePreview = {
    id: params.id,
    title: 'Coming Soon: Build Excitement Before You Launch',
    badge: 'BUILD YOUR FIRST COURSE',
    image: '/course-coming-soon.jpg',
    instructor: 'Masteriyo Team',
    instructorLogo: '/masteriyo-logo.png',
    description: 'Create buzz before your course even launches.',
    lastUpdated: 'October 15, 2025',
    startedAt: 'July 30, 2025',
    status: 'coming-soon',
    comingSoonDate: 'October 26, 2025',
    countdownDays: 344,
    countdownHours: 23,
    countdownMinutes: 23,
    countdownSeconds: 55,
    includes: [
      'Master the art of anticipation',
      'Proven pre-launch strategies',
      'Build loyal followers early',
      'Practical tools & templates',
      'Psychology of anticipation',
    ],
    overview: `Create buzz before your course even launches. This demo shows how Coming Soon mode lets you showcase upcoming programs, collect leads, and build anticipation. By the time your course launches, you'll already have an eager audience ready to enroll.

• Master the Art of Anticipation
Learn how to create irresistible curiosity so your audience can't wait for launch day – ensuring a flood of interest from the start.

• Proven Pre-Launch Strategies
Implement step-by-step tactics that build buzz ahead of time, giving you a confident and successful launch instead of guessing what works.

• Build Loyal Followers Early
Transform casual visitors into engaged fans who are ready to support your launch, boosting sign-ups and sales from day one.

• Ready-to-Use Tools & Templates
Save time and stress with practical resources to design high-impact "coming soon" pages and teaser campaigns that grab attention instantly.

• Tap Into the Psychology of Excitement
Understand why people love anticipation and use it to create a magnetic pull toward your course or product.

• Launch with Confidence
Instead of worrying about crickets on launch day, you'll have a community that's excited, prepared, and eager to take action.`,
  }

  const course = params.id === 'coming-soon' ? comingSoonCourse : courseData

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Course Image & Info */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="relative w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg overflow-hidden aspect-video mb-6 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-500 dark:text-gray-400">{course.title}</p>
              </div>
            </div>

            {/* Course Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-bold rounded-full mb-3">
                {course.badge}
              </span>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Heart
                    size={24}
                    className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-600'}
                  />
                </button>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{course.instructor}</span>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800">
                <button className="pb-3 font-medium text-secondary border-b-2 border-secondary">
                  Overview
                </button>
                {course.sections && (
                  <button className="pb-3 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Curriculum
                  </button>
                )}
                <button className="pb-3 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Reviews
                </button>
              </div>

              {/* Tab Content - Overview */}
              <div className="mt-6 space-y-4">
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {course.overview}
                </div>
              </div>
            </div>

            {/* Curriculum Section */}
            {course.sections && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.sections.length} Sections • {course.sections.reduce((acc, s) => acc + s.lessons, 0)} Lessons • 1h 40m Duration
                  </h3>
                  <button className="text-secondary hover:text-secondary/80 text-sm font-medium">
                    Collapse All
                  </button>
                </div>

                <div className="space-y-2">
                  {course.sections.map((section) => (
                    <div key={section.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 py-3 bg-secondary text-white flex items-center justify-between hover:bg-secondary/90 transition-colors"
                      >
                        <span className="font-medium text-left">{section.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{section.lessons} Lessons</span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 space-y-2">
                          {[...Array(section.lessons)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                              <span className="text-xs">📄</span>
                              <span className="text-sm">Lesson {i + 1}</span>
                              <ChevronDown size={16} className="ml-auto text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              {/* Status */}
              {course.status === 'coming-soon' ? (
                <div className="mb-6">
                  <p className="text-center text-secondary font-medium mb-4">Coming Soon</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.countdownDays}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.countdownHours}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Hours</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.countdownMinutes}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Minutes</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.countdownSeconds}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Seconds</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Button variant="primary" size="lg" className="w-full mb-6">
                  Start Course
                </Button>
              )}

              {/* Course Info */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-sm">📅</span>
                  <span className="text-sm">Last Updated: {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-sm">🎓</span>
                  <span className="text-sm">Started At: {course.startedAt}</span>
                </div>
              </div>

              {/* Share */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Share On Social Media</p>
                <div className="flex gap-3">
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>

              {/* Includes */}
              {course.includes && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">This Course Includes</p>
                  <ul className="space-y-2">
                    {course.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-secondary mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
