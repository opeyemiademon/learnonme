'use client'

import DashboardLayout from '@/components/AdminLayout'
import Button from '@/components/Button'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Masteriyo</h1>
          <p className="text-gray-600 mt-2">Let's get your learning management system set up and ready to go!</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Setup Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Setup Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">1) Payment Setup</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                Configure payment methods to start selling your courses. You can set up multiple payment options for your students.
              </p>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                  </svg>
                  <span className="font-medium text-gray-900">Standard Paypal</span>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>

              <Button variant="primary" size="md">
                Save
              </Button>

              <p className="text-sm text-gray-600">
                Additional payment setup can be configured from{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Payment &gt; Settings
                </a>
              </p>
            </div>

            {/* Starter Templates Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">2) Starter Templates</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                Launch your learning site faster with professionally designed templates optimized for course sales and student engagement.
              </p>

              <Button variant="primary" size="md">
                View Starter Templates
              </Button>

              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                I don't want to use starter templates
              </button>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-4">
            {/* Masteriyo Community Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Masteriyo Community</h3>
              </div>
              <p className="text-sm text-gray-600">
                Join our exclusive group and connect with fellow Masteriyo members. Ask questions, contribute to discussions, and share feedback!
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Join our Facebook Group
              </a>
            </div>

            {/* Getting Started Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Getting Started</h3>
              </div>
              <p className="text-sm text-gray-600">
                Check our documentation for detailed information on Masteriyo features and how to use them.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Documentation
              </a>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Support</h3>
              </div>
              <p className="text-sm text-gray-600">
                Submit a ticket for encountered issues and get help from our support team instantly.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Create a Ticket
              </a>
            </div>

            {/* Feature Request Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Feature Request</h3>
              </div>
              <p className="text-sm text-gray-600">
                Don't find a feature you're looking for? Suggest any features you think would enhance our product.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Request a Feature
              </a>
            </div>

            {/* Submit Review Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Submit a Review</h3>
              </div>
              <p className="text-sm text-gray-600">
                Please take a moment to give us a review. We appreciate honest feedback that'll help us improve the plugin.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Submit a Review
              </a>
            </div>

            {/* Video Tutorials Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V9h4v3h3l-5 5z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Video Tutorials</h3>
              </div>
              <p className="text-sm text-gray-600">
                Watch our step-by-step video tutorials that'll help you get the best out of Masteriyo's features.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Watch Videos
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
