import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSchool } from '@/lib/api'
import { dormsData } from '@/data/dorms'

export async function generateStaticParams() {
  return dormsData.map((school) => ({ school_id: school.school_id }))
}

export default async function SchoolPage({
  params,
}: {
  params: { school_id: string }
}) {
  const school = await getSchool(params.school_id)
  if (!school) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← DormReady
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-700">{school.school_name}</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{school.school_name}</h1>
        <p className="text-sm text-gray-500 mb-6">{school.location}</p>

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {school.buildings.length} Building{school.buildings.length !== 1 ? 's' : ''}
        </h2>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {school.buildings.map((building) => {
            const primary = building.room_types[0]
            return (
              <li key={building.building_id}>
                <Link
                  href={`/schools/${school.school_id}/${building.building_id}`}
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-gray-900 text-sm">{building.building_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 capitalize">{building.type}</p>
                  {primary && (
                    <p className="text-sm text-blue-600 font-medium mt-2">
                      {primary.length_ft}′ × {primary.width_ft}′ · {primary.sqft} sq ft
                    </p>
                  )}
                  {building.room_types.length > 1 && (
                    <p className="text-xs text-gray-400 mt-1">
                      +{building.room_types.length - 1} more room type{building.room_types.length > 2 ? 's' : ''}
                    </p>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
