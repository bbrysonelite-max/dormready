import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBuildingParams, getBuilding, getSchool } from '@/lib/dorms'
import LeadCapture from '@/components/ui/LeadCapture'

export async function generateStaticParams() {
  return getAllBuildingParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ school_id: string; building_id: string }>
}) {
  const { school_id, building_id } = await params
  const school = getSchool(school_id)
  const building = getBuilding(school_id, building_id)
  if (!school || !building) return {}

  const primaryRoom = building.room_types[0]
  const dims = primaryRoom
    ? ` — ${primaryRoom.length_ft}′ × ${primaryRoom.width_ft}′ (${primaryRoom.sqft} sq ft)`
    : ''

  return {
    title: `${building.building_name} Dorm Room Size${dims} — ${school.school_name} | DormReady`,
    description: `${building.building_name} at ${school.school_name} dorm room dimensions${dims}. Plan your layout before move-in day.`,
  }
}

// Affiliate products matched generically to dorm life — Agent 2 Stage 2 will personalize
const affiliateProducts = [
  { label: 'Bed Risers', search: 'dorm+bed+risers' },
  { label: 'Loft Bed', search: 'dorm+loft+bed+twin' },
  { label: 'Over-door Organizer', search: 'over+door+organizer+dorm' },
  { label: 'Desk Lamp', search: 'dorm+desk+lamp+LED' },
  { label: 'Under-bed Storage', search: 'under+bed+storage+bins' },
  { label: 'Mini Fridge', search: 'dorm+mini+fridge' },
]

export default async function DormProfilePage({
  params,
}: {
  params: Promise<{ school_id: string; building_id: string }>
}) {
  const { school_id, building_id } = await params
  const school = getSchool(school_id)
  const building = getBuilding(school_id, building_id)
  if (!school || !building) notFound()

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/schools/${school.school_id}`} className="hover:text-blue-600">
          {school.school_name}
        </Link>
        <span className="mx-2">/</span>
        <span>{building.building_name}</span>
      </nav>

      {/* Header */}
      <h1 className="text-2xl font-bold tracking-tight mb-1">{building.building_name}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {school.school_name} · {school.location}
      </p>

      {/* Room dimensions */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Room Dimensions</h2>
        <ul className="grid grid-cols-1 gap-3">
          {building.room_types.map((room, i) => (
            <li key={i} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold capitalize">{room.type} Room</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {room.sqft} sq ft
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-700 mb-1">
                {room.length_ft}′ × {room.width_ft}′
              </p>
              {room.notes && <p className="text-sm text-gray-500">{room.notes}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Lead capture */}
      <section className="mb-8">
        <LeadCapture schoolId={school_id} buildingId={building_id} />
      </section>

      {/* Affiliate strip */}
      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-3">
          Shop for Your Room
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {affiliateProducts.map((product) => (
            <li key={product.label}>
              <a
                href={`https://www.amazon.com/s?k=${product.search}&tag=dormready-20`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block border border-gray-200 rounded-xl p-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-800">{product.label}</p>
                <p className="text-xs text-blue-600 mt-1">Shop Amazon →</p>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          DormReady earns a commission from qualifying Amazon purchases.
        </p>
      </section>
    </div>
  )
}
