import type { School } from '@/types/dorms'
import { getSchoolStatic } from '@/data/dorms'

export async function getSchool(schoolId: string): Promise<School | null> {
  return getSchoolStatic(schoolId)
}
