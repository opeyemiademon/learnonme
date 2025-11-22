'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, LayoutDashboard, User, Heart, Award, FileText, Target, BookMarked, Video, ShoppingCart, Calendar, LogOut, ChevronRight, Menu, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, toggleTheme, mounted } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />
  }

  const menuItems = [
    { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Your Courses', href: '/student/courses', icon: BookOpen },
    { label: 'Profile', href: '/student/profile', icon: User },
    { label: 'Wishlist', href: '/student/wishlist', icon: Heart },
    { label: 'Your Certificates', href: '/student/certificates', icon: Award },
    { label: 'Your Assignments', href: '/student/assignments', icon: FileText },
    { label: 'Your Quiz Attempts', href: '/student/quiz-attempts', icon: Target },
    { label: 'Your Gradebook', href: '/student/gradebook', icon: BookMarked },
    { label: 'Zoom Session', href: '/student/zoom', icon: Video },
    { label: 'Order History', href: '/student/orders', icon: ShoppingCart },
    { label: 'Subscriptions', href: '/student/subscriptions', icon: Calendar },
    { label: 'Calendar', href: '/student/calendar', icon: Calendar },
    { label: 'Logout', href: '/logout', icon: LogOut },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
         <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <BookOpen className="text-white" size={24} />
          </div>
          <div className="flex-col hidden sm:flex">
            <span className="text-lg md:text-xl font-bold text-primary dark:text-white">Learn On Me</span>
          </div>
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/student/courses" className="text-gray-900 dark:text-white font-medium hover:text-secondary">
              Courses
            </Link>
            <Link href="/student/profile" className="text-secondary font-medium">
              Account
            </Link>
            <button className="text-gray-900 dark:text-white font-medium hover:text-secondary flex items-center gap-1">
              Learn From Home
              <ChevronRight size={16} className="rotate-90" />
            </button>
            <button className="px-4 py-2 border-2 border-secondary text-secondary rounded-full font-medium hover:bg-secondary/10">
             Download Mobile App
            </button>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Collapse/Expand Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`fixed top-1/5 z-50 p-2 bg-secondary text-white hover:bg-secondary/90 rounded-r-lg transition-all duration-300 ease-in-out shadow-lg ${
          sidebarCollapsed ? 'left-20' : 'left-64'
        }`}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronRight size={20} className={`transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
      </button>


      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transform transition-all duration-300 ease-in-out z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}>
          {/* Header */}
          <div className={`border-b border-gray-200 dark:border-gray-700 ${sidebarCollapsed ? 'p-3' : 'p-6'}`}>
            <div className="flex flex-col items-center">
              <div className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-16 h-16'} bg-primary rounded-lg flex items-center justify-center`}>
                <BookOpen className="text-white" size={sidebarCollapsed ? 20 : 32} />
              </div>
              {!sidebarCollapsed && <h3 className="font-semibold text-gray-900 dark:text-white text-center mt-3">Opeyemi Mansoor</h3>}
            </div>
          </div>

          {/* Navigation */}
          <nav className={`overflow-y-auto h-[calc(100%-100px)] ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
            <ul className={sidebarCollapsed ? 'space-y-2' : 'space-y-1'}>
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-secondary text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="font-medium flex-1">{item.label}</span>
                          <ChevronRight size={16} />
                        </>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 flex justify-center">
          <div className="w-full max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
