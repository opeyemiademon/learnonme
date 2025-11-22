'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Tag,
  Users,
  Award,
  MessageSquare,
  GraduationCap,
  Presentation,
  Video,
  School,
  Calendar,
  Settings,
  Package,
  ChevronRight,
  Mail,
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  badge?: number
  submenu?: { label: string; href: string }[]
}

const menuItems: MenuItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <BookOpen size={20} />, label: 'Courses', href: '/courses' },
  { icon: <ShoppingCart size={20} />, label: 'Orders', href: '/orders', badge: 3 },
  { icon: <Tag size={20} />, label: 'Coupons', href: '/coupons' },
  { icon: <Users size={20} />, label: 'Users', href: '/users' },
  { icon: <Award size={20} />, label: 'Certificates', href: '/certificates' },
  { icon: <MessageSquare size={20} />, label: 'Question & Answers', href: '/qa' },
  { icon: <GraduationCap size={20} />, label: 'Gradebook', href: '/gradebook' },
  { icon: <Calendar size={20} />, label: 'Announcements', href: '/announcements' },
  { icon: <Video size={20} />, label: 'Zoom', href: '/zoom' },
  { icon: <School size={20} />, label: 'Google Classroom', href: '/google-classroom' },
  { icon: <Presentation size={20} />, label: 'Google Meet', href: '/google-meet' },
]

const bottomMenuItems: MenuItem[] = [
  { icon: <Package size={20} />, label: 'Posts', href: '/posts' },
  { icon: <BookOpen size={20} />, label: 'Media', href: '/media' },
  { icon: <BookOpen size={20} />, label: 'Pages', href: '/pages' },
  { icon: <School size={20} />, label: 'Google Classroom', href: '/google-classroom-2' },
  { icon: <Presentation size={20} />, label: 'Google Meet', href: '/google-meet-2' },
  {
    icon: <Settings size={20} />,
    label: 'Settings',
    href: '/settings',
    submenu: [
      { label: 'General', href: '/settings/general' },
      { label: 'Courses Page', href: '/settings/courses' },
      { label: 'Learn Page', href: '/settings/learn' },
      { label: 'Accounts Page', href: '/settings/accounts' },
      { label: 'Payments', href: '/settings/payments' },
      { label: 'Quiz', href: '/settings/quiz' },
      { label: 'Emails', href: '/settings/emails' },
    ],
  },
  { icon: <Package size={20} />, label: 'Addons', href: '/addons' },
]

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Settings')

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <aside className={`w-64 bg-primary text-white h-screen overflow-y-auto flex flex-col fixed left-0 top-0 transition-transform duration-300 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-primary/20">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <BookOpen className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg">LearnOnMe</h1>
          <p className="text-xs text-white/60">Dashboard</p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-secondary text-white'
                    : 'text-white/80 hover:bg-primary/50'
                }`}
              >
                {item.icon}
                <span className="flex-1 text-sm">{item.label}</span>
                {item.badge && (
                  <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-primary/20 my-4"></div>

        {/* Bottom Menu */}
        <ul className="space-y-1 px-2">
          {bottomMenuItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-secondary text-white'
                        : 'text-white/80 hover:bg-primary/50'
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 text-sm text-left">{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        expandedMenu === item.label ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedMenu === item.label && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                              isActive(subItem.href)
                                ? 'bg-secondary text-white'
                                : 'text-white/60 hover:bg-primary/50 hover:text-white'
                            }`}
                          >
                            {subItem.label === 'Emails' && <Mail size={16} />}
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-secondary text-white'
                      : 'text-white/80 hover:bg-primary/50'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-sm">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary/20 text-xs text-white/60">
        Thank you for using LearnOnMe.
      </div>
    </aside>
  )
}
