import type { School } from '@/types/dorms'

export const dormsData: School[] = [
  {
    school_id: 'ucla',
    school_name: 'UCLA',
    location: 'Los Angeles, CA',
    buildings: [
      {
        building_id: 'hedrick-hall',
        building_name: 'Hedrick Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Standard double room', photo_urls: [], tour_url: null },
          { type: 'Triple', length_ft: 12, width_ft: 14, sqft: 168, notes: 'Triple occupancy', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'dykstra-hall',
        building_name: 'Dykstra Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 11, width_ft: 10, sqft: 110, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'sproul-hall',
        building_name: 'Sproul Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Single', length_ft: 10, width_ft: 9, sqft: 90, notes: 'Single occupancy', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 10, width_ft: 12, sqft: 120, notes: 'Double occupancy', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'rieber-hall',
        building_name: 'Rieber Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 11, sqft: 132, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
  {
    school_id: 'stanford',
    school_name: 'Stanford',
    location: 'Stanford, CA',
    buildings: [
      {
        building_id: 'branner-hall',
        building_name: 'Branner Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 13, width_ft: 10, sqft: 130, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'serra-house',
        building_name: 'Serra House',
        type: 'themed house',
        room_types: [
          { type: 'Single', length_ft: 11, width_ft: 10, sqft: 110, notes: 'Single room', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 14, width_ft: 11, sqft: 154, notes: 'Double room', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'wilbur-hall',
        building_name: 'Wilbur Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
  {
    school_id: 'usc',
    school_name: 'USC',
    location: 'Los Angeles, CA',
    buildings: [
      {
        building_id: 'new-north',
        building_name: 'New North',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'parkside-arts',
        building_name: 'Parkside Arts & Humanities',
        type: 'residential college',
        room_types: [
          { type: 'Single', length_ft: 11, width_ft: 10, sqft: 110, notes: 'Single occupancy', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 13, width_ft: 11, sqft: 143, notes: 'Double occupancy', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'mccullouch',
        building_name: 'McAlister Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 11, width_ft: 10, sqft: 110, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
  {
    school_id: 'nyu',
    school_name: 'NYU',
    location: 'New York, NY',
    buildings: [
      {
        building_id: 'rubin-hall',
        building_name: 'Rubin Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 11, width_ft: 9, sqft: 99, notes: 'NYC-style double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'lipton-hall',
        building_name: 'Lipton Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Single', length_ft: 10, width_ft: 9, sqft: 90, notes: 'Single room', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Double room', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: '3rd-avenue-north',
        building_name: '3rd Avenue North',
        type: 'suite-style',
        room_types: [
          { type: 'Single', length_ft: 10, width_ft: 8, sqft: 80, notes: 'Suite single', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
  {
    school_id: 'ut-austin',
    school_name: 'UT Austin',
    location: 'Austin, TX',
    buildings: [
      {
        building_id: 'jester-east',
        building_name: 'Jester East',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'kinsolving',
        building_name: 'Kinsolving',
        type: 'residence hall',
        room_types: [
          { type: 'Single', length_ft: 11, width_ft: 10, sqft: 110, notes: 'Single room', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 13, width_ft: 11, sqft: 143, notes: 'Double room', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'moore-hill',
        building_name: 'Moore-Hill Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 11, sqft: 132, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
  {
    school_id: 'umich',
    school_name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    buildings: [
      {
        building_id: 'south-quad',
        building_name: 'South Quad',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 10, sqft: 120, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'markley-hall',
        building_name: 'Markley Hall',
        type: 'residence hall',
        room_types: [
          { type: 'Single', length_ft: 11, width_ft: 9, sqft: 99, notes: 'Single room', photo_urls: [], tour_url: null },
          { type: 'Double', length_ft: 13, width_ft: 10, sqft: 130, notes: 'Double room', photo_urls: [], tour_url: null },
        ],
      },
      {
        building_id: 'west-quad',
        building_name: 'West Quad',
        type: 'residence hall',
        room_types: [
          { type: 'Double', length_ft: 12, width_ft: 11, sqft: 132, notes: 'Standard double', photo_urls: [], tour_url: null },
        ],
      },
    ],
  },
]

export function getSchoolStatic(schoolId: string): School | null {
  return dormsData.find((s) => s.school_id === schoolId) ?? null
}
