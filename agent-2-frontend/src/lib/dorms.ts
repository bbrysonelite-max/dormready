import type { School, Building } from '@/types/dorms'
import dormsData from '../../../agent-1-data/data/dorms.json'

const schools = dormsData as School[]

export function getAllSchools(): School[] {
  return schools
}

export function getSchool(schoolId: string): School | undefined {
  return schools.find((s) => s.school_id === schoolId)
}

export function getBuilding(schoolId: string, buildingId: string): Building | undefined {
  return getSchool(schoolId)?.buildings.find((b) => b.building_id === buildingId)
}

export function getAllBuildingParams(): { school_id: string; building_id: string }[] {
  return schools.flatMap((school) =>
    school.buildings.map((building) => ({
      school_id: school.school_id,
      building_id: building.building_id,
    }))
  )
}
