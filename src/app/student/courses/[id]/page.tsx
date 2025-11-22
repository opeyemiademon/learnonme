'use client'

import { useState } from 'react'
import StudentLayout from '@/components/StudentLayout'
import { ChevronDown, ChevronLeft, ChevronRight, X, Menu, Play, MessageCircle, Send, Search } from 'lucide-react'
import Button from '@/components/Button'

interface Lesson {
  id: string
  title: string
  type: 'lesson' | 'video' | 'quiz'
  duration?: string
  completed: boolean
}

interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

interface CourseContent {
  id: string
  title: string
  type: 'lesson' | 'video'
  content: string
  videoUrl?: string
}

interface Question {
  id: string
  title: string
  answers: number
}

interface Answer {
  id: string
  author: string
  content: string
  timestamp: string
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>(['section-1'])
  const [currentLessonId, setCurrentLessonId] = useState('lesson-1')
  const [mode, setMode] = useState<'lessons' | 'questions'>('lessons')
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({
    'q-1': [
      { id: 'a-1', author: 'Instructor', content: 'This is how it works...', timestamp: '2 days ago' },
    ],
  })

  const sections: Section[] = [
    {
      id: 'section-1',
      title: 'Lesson Types That Actually Teach',
      lessons: [
        { id: 'lesson-1', title: 'Write it Right: Crafting Impactful Text Lessons', type: 'lesson', completed: false },
        { id: 'lesson-2', title: 'Video That Just Works: Embed from Anywhere', type: 'video', duration: '12:45', completed: false },
        { id: 'lesson-3', title: 'Teach with PDFs: Upload & Present Like a Pro', type: 'lesson', completed: false },
        { id: 'lesson-4', title: 'Audio Lessons for the Ears-On Learner', type: 'lesson', completed: false },
      ],
    },
    {
      id: 'section-2',
      title: 'Go Live: Teach in Real Time',
      lessons: [
        { id: 'lesson-5', title: 'Make it Stick with Quizzes', type: 'quiz', completed: false },
        { id: 'lesson-6', title: 'Real Work = Real Learning (Assignments)', type: 'lesson', completed: false },
        { id: 'lesson-7', title: 'Structure Like a Pro', type: 'lesson', completed: false },
      ],
    },
  ]

  const courseContents: Record<string, CourseContent> = {
    'lesson-1': {
      id: 'lesson-1',
      title: 'Seamless Google Meet Integration',
      type: 'lesson',
      content: `Unlock the power of live virtual sessions by mastering Google Meet integration within Masteriyo LMS. This course equips course creators and instructors with everything they need to plan, launch, and manage Google Meet–based live lessons seamlessly in their LMS environment.

Key Topics:
• Setting up the Google Meet add-on and configuring OAuth credentials via Google Cloud Console
• Uploading and integrating your JSON credentials into Masteriyo
• Creating live lesson sessions: scheduling, describing, and assigning participants directly from the Course Builder
• Managing meetings within the Masteriyo dashboard, edit, delete, and launch sessions with ease
• Enabling students to join meetings right from your course learning page, complete with embedded link and countdown timer
• Best practices and troubleshooting tips for a smooth setup and learner experience

Who This Course Is For:
• Course creators and LMS administrators using Masteriyo LMS (Free, Basic, Pro, or Elite)
• Instructors wanting to deliver live classes without relying on external plugins
• Educational organizations integrating synchronous learning virtually`,
    },
    'lesson-2': {
      id: 'lesson-2',
      title: 'Video That Just Works: Embed from Anywhere',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: 'This lesson teaches you how to embed videos from various sources into your course.',
    },
    'lesson-3': {
      id: 'lesson-3',
      title: 'Set Passing Scores, Feedback & Retakes: Smart Assessment',
      type: 'lesson',
      content: `Turn your quizzes into powerful learning milestones, rather than mere checkpoints, by leveraging customizable pass marks, targeted feedback, and controlled retakes. Masteriyo's Smart Assessment tools give you the precision to motivate learners and the flexibility to reinforce mastery.

1. Define Your Pass Criteria
• Flexible Pass Points: Specify the minimum score required to pass in points or percentages, perfect for courses that range from quick quizzes to in-depth exams.
• Auto-Calculate Scoring: Let Masteriyo distribute point values evenly across questions, or manually assign weights for greater control.

2. Deliver Instant, Insightful Feedback
• Per-Question Explanations: Add answer explanations that display immediately after submission, so learners understand why an answer is correct or where they went wrong.
• Custom Pass/Fail Messages: Craft global feedback that appears only on success or only on failure, include next-step resources, encouragement, or links to remedial lessons.

3. Control Retakes & Reveal Modes
• Attempts Allowed: Choose unlimited attempts for low-stakes practice or set a strict limit to simulate real-world exams.
• Reveal Mode: Enable a one-attempt "locked" quiz that shows correct answers only after submission ideal for mastery checks or certification tests.

4. Integrate with Gradebook & Weighted Scoring
• Weighted Assessments: Assign relative importance to each quiz or assignment so that critical evaluations carry more weight toward the final grade.
• Custom Grade Scales: Build bespoke grading ranges (A+, Excellent, 0–30%, etc.) to match your institution's standards or your personal grading rubric.
• Centralized Results Dashboard: View all quiz and assignment outcomes in one place, filter, export, and track performance trends effortlessly.

5. Leverage Global Quiz Settings
• Guest Access Rules: Offer read-only previews to visitors or lock quizzes completely behind enrollment, choose per-quiz access with a simple toggle.
• Learner Feedback Collection: Enable students to leave quiz reviews, giving you actionable insights on question quality and user experience.`,
    },
  }

  const currentContent = courseContents[currentLessonId] || courseContents['lesson-1']

  const questions: Question[] = [
    { id: 'q-1', title: 'How does this work', answers: 1 },
    { id: 'q-2', title: 'What is the best practice', answers: 0 },
    { id: 'q-3', title: 'Can I use this with...', answers: 0 },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      // In a real app, this would be sent to a server
      console.log('Question asked:', newQuestion)
      setNewQuestion('')
    }
  }

  const handlePostAnswer = () => {
    if (newAnswer.trim() && selectedQuestion) {
      const newAnswerObj: Answer = {
        id: `a-${Date.now()}`,
        author: 'You',
        content: newAnswer,
        timestamp: 'just now',
      }
      setAnswers((prev) => ({
        ...prev,
        [selectedQuestion]: [...(prev[selectedQuestion] || []), newAnswerObj],
      }))
      setNewAnswer('')
    }
  }

  const handleLessonClick = (lessonId: string) => {
    setCurrentLessonId(lessonId)
  }

  const getAllLessons = () => sections.flatMap((s) => s.lessons)
  const currentLessonIndex = getAllLessons().findIndex((l) => l.id === currentLessonId)
  const previousLesson = currentLessonIndex > 0 ? getAllLessons()[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < getAllLessons().length - 1 ? getAllLessons()[currentLessonIndex + 1] : null

  return (
    <StudentLayout>
    

      <div className="flex h-[calc(100vh-120px)] gap-0 bg-white dark:bg-gray-950 relative">

        {/* Sidebar */}
        <aside
          className={`
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
            transition-all duration-300 overflow-hidden flex flex-col
            ${sidebarOpen ? 'w-64' : 'w-0'}
          `}
        >
          {/* Course Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-secondary text-white">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium opacity-80">Back</p>
                <h3 className="text-sm font-bold truncate">Mastering the Course Build...</h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex-shrink-0 p-1 hover:bg-secondary/80 rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setMode('lessons')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                mode === 'lessons'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Lessons
            </button>
            <button
              onClick={() => setMode('questions')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                mode === 'questions'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Questions
            </button>
          </div>

          {/* Content */}
          {mode === 'lessons' ? (
            // Lessons View
            <nav className="flex-1 overflow-y-auto">
              {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{section.title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-600 dark:text-gray-400 transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Lessons */}
                {expandedSections.includes(section.id) && (
                  <div className="bg-gray-50 dark:bg-gray-800/30">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id)}
                        className={`
                          w-full px-4 py-2.5 text-left flex items-start gap-2 transition-colors text-sm
                          ${
                            currentLessonId === lesson.id
                              ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary border-l-2 border-secondary'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 border-l-2 border-transparent'
                          }
                        `}
                      >
                        <span className="flex-shrink-0 mt-0.5">
                          {lesson.type === 'video' ? (
                            <Play size={14} className="fill-current" />
                          ) : lesson.type === 'quiz' ? (
                            <span className="text-xs font-bold">Q</span>
                          ) : (
                            <span className="text-xs font-bold">L</span>
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">{lesson.title}</p>
                          {lesson.duration && <p className="text-xs opacity-70">{lesson.duration}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              ))}
            </nav>
          ) : (
            // Questions View
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search a Question"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              {/* Questions List */}
              <div className="flex-1 overflow-y-auto">
                {selectedQuestion ? (
                  // Question Detail View
                  <div className="p-4 space-y-4">
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="flex items-center gap-2 text-secondary hover:text-secondary/80 text-sm font-medium mb-4"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {questions.find((q) => q.id === selectedQuestion)?.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {answers[selectedQuestion]?.length || 0} Answers
                    </p>

                    {/* Answers */}
                    <div className="space-y-3 mb-4">
                      {answers[selectedQuestion]?.map((answer) => (
                        <div key={answer.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{answer.author}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{answer.content}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{answer.timestamp}</p>
                        </div>
                      ))}
                    </div>

                    {/* No Replies Message */}
                    {!answers[selectedQuestion] || answers[selectedQuestion].length === 0 ? (
                      <div className="p-3 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">No replies found.</p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  // Questions List View
                  <div className="space-y-2 p-4">
                    {questions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => setSelectedQuestion(question.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{question.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{question.answers} Answers</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Ask Question Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                {selectedQuestion ? (
                  <>
                    <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      placeholder="What is your answer?"
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
                      rows={3}
                    />
                    <button
                      onClick={handlePostAnswer}
                      className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium text-sm"
                    >
                      Send
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="What is your question?"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button
                      onClick={handleAskQuestion}
                      className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium text-sm"
                    >
                      Ask a Question
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">8% COMPLETE</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">12 out of 13 left</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l7-7m0 0l-7-7m7 7H8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{currentContent.title}</h1>

              {/* Content */}
              {currentContent.type === 'video' ? (
                <div className="mb-8">
                  <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video mb-6">
                    <iframe
                      className="w-full h-full"
                      src={currentContent.videoUrl}
                      title="Course Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overview</h3>
                      <p className="text-gray-600 dark:text-gray-400">No content to show.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 space-y-4 whitespace-pre-wrap">
                    {currentContent.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-8 py-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              {previousLesson ? (
                <button className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors group">
                  <ChevronLeft size={20} className="group-hover:text-secondary transition-colors" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Previous</p>
                    <p className="text-sm font-medium">{previousLesson.title}</p>
                  </div>
                </button>
              ) : (
                <div />
              )}

              <Button variant="primary" size="md">
                MARK AS COMPLETE
              </Button>

              {nextLesson ? (
                <button className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors group">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next</p>
                    <p className="text-sm font-medium">{nextLesson.title}</p>
                  </div>
                  <ChevronRight size={20} className="group-hover:text-secondary transition-colors" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>
    </StudentLayout>
  )
}
