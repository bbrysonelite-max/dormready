import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSchools, getSchool } from '@/lib/dorms'

export async function generateStaticParams() {
  return getAllSchools().map((school) => ({ school_id: school.school_id }))
}

export async function generateMetadata({ params }: { params: Promise<{ school_id: string }> }) {
  const { school_id } = await params
  const school = getSchool(school_id)
  if (!school) return {}
  return {
    title: `${school.school_name} Dorm Rooms — All Buildings | DormReady`,
    description: `Browse all dorm buildings at ${school.school_name} in ${school.location}. Find exact room dimensions before move-in day.`,
  }
}

export default async function SchoolPage({ params }: { params: Promise<{ school_id: string }> }) {
  const { school_id } = await params
  const school = getSchool(school_id)
  if (!school) notFound()

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{school.school_name}</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight mb-1">{school.school_name}</h1>
      <p className="text-gray-500 text-sm mb-6">{school.location}</p>

      <h2 className="text-base font-semibold text-gray-700 mb-3">
        {school.buildings.length} Dorm Building{school.buildings.length !== 1 ? 's' : ''}
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {school.buildings.map((building) => {
          const primaryRoom = building.room_types[0]
          return (
            <li key={building.building_id}>
              <Link
                href={`/schools/${school.school_id}/${building.building_id}`}
                className="block border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <p className="font-semibold text-base">{building.building_name}</p>
                <p className="text-sm text-gray-500 mt-0.5 capitalize">{building.type}</p>
                {primaryRoom && (
                  <p className="text-sm text-blue-700 mt-1">
                    {primaryRoom.sqft} sq ft · {primaryRoom.length_ft}′ × {primaryRoom.width_ft}′
                  </p>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
