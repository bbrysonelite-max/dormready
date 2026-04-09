import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSchool } from '@/lib/api'
import { dormsData } from '@/data/dorms'
import RoomTypeTabs from '@/components/ui/RoomTypeTabs'
import LeadCapture from '@/components/ui/LeadCapture'

export async function generateStaticParams() {
  return dormsData.flatMap((school) =>
    school.buildings.map((building) => ({
      school_id: school.school_id,
      building_id: building.building_id,
    }))
  )
}

const affiliateProducts = [
  { label: 'Bed Risers', search: 'dorm+bed+risers' },
  { label: 'Loft Bed', search: 'dorm+loft+bed+twin' },
  { label: 'Over-door Organizer', search: 'over+door+organizer+dorm' },
  { label: 'Desk Lamp', search: 'dorm+desk+lamp+LED' },
  { label: 'Under-bed Storage', search: 'under+bed+storage+bins' },
  { label: 'Mini Fridge', search: 'dorm+mini+fridge' },
]

export async function generateMetadata({
  params,
}: {
  params: { school_id: string; building_id: string }
}): Promise<Metadata> {
  const school = await getSchool(params.school_id)
  const building = school?.buildings.find((b) => b.building_id === params.building_id)
  if (!school || !building) return {}

  const primary = building.room_types[0]
  const dims = primary ? ` — ${primary.length_ft}′ × ${primary.width_ft}′ (${primary.sqft} sq ft)` : ''

  return {
    title: `${building.building_name} Dorm Room Size${dims} — ${school.school_name} | DormReady`,
    description: `${building.building_name} at ${school.school_name}${dims}. Plan your layout before move-in day.`,
  }
}

export default async function DormProfilePage({
  params,
}: {
  params: { school_id: string; building_id: string }
}) {
  const school = await getSchool(params.school_id)
  const building = school?.buildings.find((b) => b.building_id === params.building_id)
  if (!school || !building) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/schools/${school.school_id}`}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            ← {school.school_name}
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/schools/${school.school_id}`} className="hover:text-blue-600">
            {school.school_name}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-700">{building.building_name}</span>
        </nav>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{building.building_name}</h1>
          <p className="text-sm text-gray-500">
            {school.school_name} · {school.location} ·{' '}
            <span className="capitalize">{building.type}</span>
          </p>
        </div>

        {/* Room dimensions + tabs */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Room Dimensions
          </h2>
          <RoomTypeTabs roomTypes={building.room_types} />
        </section>

        {/* Lead capture */}
        <section>
          <LeadCapture schoolId={school.school_id} buildingId={building.building_id} />
        </section>

        {/* Affiliate strip */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Shop for Your Room
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {affiliateProducts.map((p) => (
              <a
                key={p.label}
                href={`https://www.amazon.com/s?k=${p.search}&tag=dormready-20`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-blue-400 transition-colors"
              >
                <p className="text-sm font-medium text-gray-800">{p.label}</p>
                <p className="text-xs text-blue-600 mt-0.5">Amazon →</p>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            DormReady earns a commission from qualifying Amazon purchases.
          </p>
        </section>
      </div>
    </main>
  )
}
