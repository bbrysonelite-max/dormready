import Link from 'next/link'
import { getAllSchools } from '@/lib/dorms'

export default function HomePage() {
  const schools = getAllSchools().slice(0, 6)
  const totalBuildings = getAllSchools().reduce((acc, s) => acc + s.buildings.length, 0)

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      {/* Hero */}
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Know Your Room Before Move-In Day
        </h1>
        <p className="text-gray-600 text-base mb-6">
          Exact dorm room dimensions for every building, every school.
        </p>

        {/* Search — client-side filtering in Stage 2 */}
        <form action="/schools" method="get" className="flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search your school..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold text-base"
          >
            Search
          </button>
        </form>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-3 gap-3 mb-8 text-center">
        <div className="bg-blue-50 rounded-lg py-4">
          <p className="text-2xl font-bold text-blue-700">{schools.length}+</p>
          <p className="text-xs text-gray-600 mt-1">Schools</p>
        </div>
        <div className="bg-blue-50 rounded-lg py-4">
          <p className="text-2xl font-bold text-blue-700">{totalBuildings}+</p>
          <p className="text-xs text-gray-600 mt-1">Buildings</p>
        </div>
        <div className="bg-blue-50 rounded-lg py-4">
          <p className="text-2xl font-bold text-blue-700">Free</p>
          <p className="text-xs text-gray-600 mt-1">Always</p>
        </div>
      </section>

      {/* School cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Browse Schools</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {schools.map((school) => (
            <li key={school.school_id}>
              <Link
                href={`/schools/${school.school_id}`}
                className="block border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <p className="font-semibold text-base">{school.school_name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{school.location}</p>
                <p className="text-sm text-blue-600 mt-1">
                  {school.buildings.length} building{school.buildings.length !== 1 ? 's' : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
