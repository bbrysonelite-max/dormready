import Link from 'next/link'
import { schools } from '@/data/schools'
import SearchBar from '@/components/SearchBar'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-700">DormReady</span>
          <span className="text-sm text-gray-500">Know your room before you arrive</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-blue-700 px-4 py-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Find Your Dorm Room Size</h1>
        <p className="text-blue-100 mb-6 text-sm">
          Exact dimensions, layouts, and move-in guides for every dorm at top universities.
        </p>
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-around text-center">
          <div>
            <span className="block text-xl font-bold text-blue-700">71</span>
            <span className="text-xs text-gray-500">Dorm Rooms</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-blue-700">6</span>
            <span className="text-xs text-gray-500">Universities</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-blue-700">100%</span>
            <span className="text-xs text-gray-500">Free</span>
          </div>
        </div>
      </section>

      {/* School cards */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Browse by University</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {schools.map((school) => (
            <Link
              key={school.id}
              href={`/schools/${school.id}`}
              className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className={`${school.color} h-2`} />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{school.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{school.location}</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  {school.buildingCount} buildings →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © 2026 DormReady. Helping students move in smarter.
      </footer>
    </main>
  )
}
