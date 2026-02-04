'use client'
import Link from 'next/link'
import { useState } from 'react'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleWalkComplete = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/walks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: 'pet_001',      
          walkerId: 'user_123'   
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('✅ Saved to database:', data)
        setMessage('✅ Walk completed and saved!')
      
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000)
      } else {
        console.error('❌ Failed:', data)
        setMessage('❌ Failed to save')
      }
    } catch (error) {
      console.error('❌ Error:', error)
      setMessage('❌ Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full mx-auto flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <header className="bg-white shadow-sm rounded-t-lg">
          <div className="px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Cooper</h1>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 px-4 py-6 overflow-y-auto">
          {/* Weather Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Weather</p>
                <p className="text-3xl font-bold text-gray-900">23°C</p>
              </div>
              <div className="text-5xl">☀️</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Perfect day for a walk!</p>
          </div>

          {/* Dog Display Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🐕</div>
              <p className="text-lg font-semibold text-gray-900">Cooper</p>
              <p className="text-sm text-gray-600">Ready for a walk!</p>
            </div>
          </div>

          {/* Walk Complete Button */}
          <button 
            onClick={handleWalkComplete}
            disabled={loading}
            className={`w-full py-4 px-6 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white text-lg font-semibold rounded-full transition shadow-lg`}
          >
            {loading ? 'Saving...' : 'Walk Complete'}
          </button>

          {/* Success/Error Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg text-center font-medium ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          {/* Next Walk Schedule */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">In 2 hrs 30 mins</p>
              <p className="text-sm text-gray-600">Next Walk</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">5:35 PM</p>
              <p className="text-sm text-gray-600">Schedule</p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="bg-white border-t border-gray-200 shadow-lg rounded-b-lg">
          <div className="px-4">
            <div className="flex justify-around items-center h-16">
              <Link href="/dashboard" className="flex flex-col items-center justify-center flex-1 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xs mt-1 font-medium">Home</span>
              </Link>

              <Link href="/walklog" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">Walk Log</span>
              </Link>

              <Link href="/calendar" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">Calendar</span>
              </Link>

              <Link href="/profile" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">Profile</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Dashboard
