export interface RoomType {
  type: string
  length_ft: number
  width_ft: number
  sqft: number
  notes: string
  photo_urls: string[]
  tour_url: string | null
}

export interface Building {
  building_id: string
  building_name: string
  type: string
  room_types: RoomType[]
}

export interface School {
  school_id: string
  school_name: string
  location: string
  buildings: Building[]
}
