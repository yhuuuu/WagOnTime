import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg" style={{ maxHeight: '90vh' }}>
        <h1 className="text-4xl font-bold text-center mb-4 p-8 text-gray-900">WagOnTime</h1>

        <p className="text-left md:text-center text-gray-600 mb-8 text-sm leading-relaxed">
          Welcome to WagOnTime. The WagOnTime app keeps your dog's walks on schedule with smart reminders, weather alerts, and calendar-aware planning.
        </p>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link href="/signup" className="block">
            <button className="w-full py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home