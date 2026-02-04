'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Walk {
  id: string
  pet_id: string
  walker_id: string
  created_at: string
  ended_at: string
}

const WalkLog = () => {
  const [walks, setWalks] = useState<Walk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWalkLogs()
  }, [])

  const fetchWalkLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/walklogs')
      const result = await response.json()

      if (response.ok) {
        setWalks(result.data || [])
      } else {
        setError('Failed to load walk logs')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const diffMinutes = Math.round((endTime - startTime) / (1000 * 60))
    
    if (diffMinutes < 1) return '< 1 min'
    if (diffMinutes < 60) return `${diffMinutes} min`
    
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full mx-auto flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <header className="bg-white shadow-sm rounded-t-lg">
          <div className="px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Walk Log</h1>
            <button 
              onClick={fetchWalkLogs}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Refresh
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 px-4 py-6 overflow-y-auto">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Walks</p>
                <p className="text-4xl font-bold ">{walks.length}</p>
              </div>
              <div className="text-6xl">🐕</div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600 mt-4">Loading walks...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Walk List */}
          {!loading && !error && walks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-gray-600 text-lg">No walks yet</p>
              <p className="text-gray-500 text-sm mt-2">Complete your first walk to see it here!</p>
            </div>
          )}

          {!loading && !error && walks.length > 0 && (
            <div className="space-y-4">
              {walks.map((walk) => (
                <div 
                  key={walk.id} 
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {formatDate(walk.created_at)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Cooper • Pet ID: {walk.pet_id}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-500">Start Time</p>
                          <p className="font-medium text-gray-900">
                            {formatTime(walk.created_at)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">End Time</p>
                          <p className="font-medium text-gray-900">
                            {formatTime(walk.ended_at)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Duration</span>
                          <span className="font-semibold text-blue-600">
                            {calculateDuration(walk.created_at, walk.ended_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="bg-white border-t border-gray-200 shadow-lg rounded-b-lg">
          <div className="px-4">
            <div className="flex justify-around items-center h-16">
              <Link href="/dashboard" className="flex flex-col items-center justify-center flex-1 text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xs mt-1">Home</span>
              </Link>

              <Link href="/walklog" className="flex flex-col items-center justify-center flex-1 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1 font-medium">Walk Log</span>
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

export default WalkLog
