export interface School {
  id: string
  name: string
  location: string
  buildingCount: number
  color: string
}

export const schools: School[] = [
  {
    id: 'ucla',
    name: 'UCLA',
    location: 'Los Angeles, CA',
    buildingCount: 14,
    color: 'bg-blue-700',
  },
  {
    id: 'stanford',
    name: 'Stanford',
    location: 'Stanford, CA',
    buildingCount: 12,
    color: 'bg-red-700',
  },
  {
    id: 'usc',
    name: 'USC',
    location: 'Los Angeles, CA',
    buildingCount: 8,
    color: 'bg-red-800',
  },
  {
    id: 'nyu',
    name: 'NYU',
    location: 'New York, NY',
    buildingCount: 16,
    color: 'bg-violet-700',
  },
  {
    id: 'ut-austin',
    name: 'UT Austin',
    location: 'Austin, TX',
    buildingCount: 10,
    color: 'bg-orange-600',
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    buildingCount: 11,
    color: 'bg-yellow-600',
  },
]
