'use client'

import TopNav from './TopNav'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Determine active menu based on pathname
  const getActiveMenu = () => {
    if (pathname.includes('/courses')) return 'Courses'
    if (pathname.includes('/programs')) return 'My Programs'
    if (pathname.includes('/reports')) return 'My Reports'
    if (pathname.includes('/products')) return 'Buy Products'
    return 'My Media'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <TopNav activeMenu={getActiveMenu()} />
      <main className="pt-3">
        <div className="px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
