'use client'

import { Bell, MessageSquare, Search, Gift, ChevronDown, User, Menu, X, LogOut, Settings, HelpCircle, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface SubMenuItem {
  label: string
  href: string
}

interface MenuItemConfig {
  label: string
  href: string
  submenu?: SubMenuItem[]
}

interface TopNavProps {
  activeMenu?: string
}

export default function TopNav({ activeMenu: initialActiveMenu }: TopNavProps = {}) {
  const { theme, toggleTheme } = useTheme()
  const [activeMenu, setActiveMenu] = useState(initialActiveMenu || 'My Media')
  const [activeSubmenu, setActiveSubmenu] = useState('all courses')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  const menuItems: MenuItemConfig[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      submenu: [
        { label: 'RULES', href: '#rules' },
        { label: 'HISTORY', href: '#history' }
      ],
    },
      {
      label: 'Courses',
      href: '/courses',
      submenu: [
        { label: 'All Courses', href: '#' },
        { label: 'Published', href: '#' }, 
        { label: 'Draft', href: '#' },
        { label: 'Deleted', href: '#' },
        { label: 'Archived', href: '#' },
        { label: 'Settings', href: '#' }
      ],
    },
    {
      label: 'Categories',
      href: '/reports',
      submenu: [
        { label: 'All Categories', href: '#summary' },
        { label: 'DETAILED', href: '#detailed' },
      ],
    },
    {
      label: 'Bundles',
      href: '/products',
      submenu: [
        { label: 'ALL', href: '#all' },
        { label: 'FEATURED', href: '#featured' },
      ],
    },
      {
      label: 'Orders',
      href: '/programs',
      submenu: [
        { label: 'ACTIVE', href: '#active' },
        { label: 'ARCHIVED', href: '#archived' },
      ],
    },
     {
      label: 'Users',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    },
    {
      label: 'Assignments',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    },
    {
      label: 'Gradebook',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    },
      {
      label: 'Questions & Answers',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    },
    {
      label: 'Certificates',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    },
    {
      label: 'Announcements',
      href: '/programs',
      submenu: [
        { label: 'Students', href: '#active' },
        { label: 'Teachers', href: '#archived' },
      ],
    }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <BookOpen className="text-white" size={24} />
          </div>
          <div className="flex-col hidden sm:flex">
            <span className="text-lg md:text-xl font-bold text-primary dark:text-white">Learn On Me</span>
          </div>
        </Link>

        {/* Right side - User controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop user name */}
          <Link href="/courses" className="text-xs md:text-sm font-medium hidden md:block px-2 text-purple-600 dark:text-purple-400">
            Opeyemi
          </Link>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer">
                <User size={16} className="text-white" />
              </div>
              <ChevronDown size={16} className="text-gray-600 dark:text-gray-300 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-primary dark:text-white">Opeyemi</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">opeyemi@example.com</p>
                </div>

                {/* Menu Items */}
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <User size={16} className="text-secondary" />
                  <span>My Profile</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings size={16} className="text-secondary" />
                  <span>Settings</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <HelpCircle size={16} className="text-secondary" />
                  <span>Help & Support</span>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Icons - Hidden on mobile */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:block">
            <MessageSquare size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:block">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden md:block">
            <Search size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          {/* Dark mode toggle - Desktop */}
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden md:block"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Dark mode toggle - Mobile */}
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors md:hidden"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation menu - Desktop */}
      <nav className="bg-primary px-4 md:px-6 hidden md:block">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {menuItems.map((item) => (
            <li key={item.label} className="flex-shrink-0 ">
              <button
                onClick={() => setActiveMenu(item.label)}
                className={` ${activeMenu === item.label ? 'bg-secondary' : ''} block px-3 md:px-4 py-3 text-white hover:bg-white/10 transition-colors text-xs md:text-sm font-medium whitespace-nowrap `}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation menu */}
      {mobileMenuOpen && (
        <nav className="bg-primary px-4 md:hidden">
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    setActiveMenu(item.label)
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Submenu - Visible on all devices */}
      {menuItems.find((item) => item.label === activeMenu)?.submenu && (
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6">
          <ul className="flex items-center gap-4 md:gap-8 overflow-x-auto">
            {menuItems
              .find((item) => item.label === activeMenu)
              ?.submenu?.map((subitem) => (
                <li key={subitem.label} className="flex-shrink-0">
                  <button
                    onClick={() => setActiveSubmenu(subitem.label.toLowerCase())}
                    className={`px-2 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeSubmenu === subitem.label.toLowerCase()
                        ? `text-secondary border-b-2 border-secondary`
                        : `text-primary dark:text-gray-300 hover:text-secondary dark:hover:text-secondary`
                    }`}
                  >
                    {subitem.label}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </header>
  )
}
