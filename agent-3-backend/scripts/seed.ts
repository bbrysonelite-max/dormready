import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { supabase } from '../src/lib/supabase';

interface RoomType {
  type: string;
  length_ft: number;
  width_ft: number;
  sqft: number;
  photo_urls: string[];
  tour_url: string;
  notes: string;
}

interface Building {
  building_id: string;
  building_name: string;
  type: string;
  room_types: RoomType[];
}

interface School {
  school_id: string;
  school_name: string;
  location: string;
  buildings: Building[];
}

async function seed() {
  const dormsPath = path.resolve(__dirname, '../../agent-1-data/data/dorms.json');
  const schools: School[] = JSON.parse(fs.readFileSync(dormsPath, 'utf-8'));

  console.log(`Seeding ${schools.length} schools...`);

  for (const school of schools) {
    // Upsert school
    const { error: schoolErr } = await supabase
      .from('schools')
      .upsert({ school_id: school.school_id, school_name: school.school_name, location: school.location });
    if (schoolErr) throw new Error(`School upsert failed: ${schoolErr.message}`);
    console.log(`  ✓ ${school.school_name}`);

    for (const building of school.buildings) {
      // Upsert building
      const { data: b, error: buildingErr } = await supabase
        .from('buildings')
        .upsert(
          {
            school_id: school.school_id,
            building_id: building.building_id,
            building_name: building.building_name,
            type: building.type,
          },
          { onConflict: 'school_id,building_id' }
        )
        .select('id')
        .single();
      if (buildingErr || !b) throw new Error(`Building upsert failed: ${buildingErr?.message}`);

      // Delete existing room_types for this building then re-insert (clean seed)
      await supabase.from('room_types').delete().eq('building_id', b.id);

      if (building.room_types.length > 0) {
        const { error: rtErr } = await supabase.from('room_types').insert(
          building.room_types.map((rt) => ({
            building_id: b.id,
            type: rt.type,
            length_ft: rt.length_ft,
            width_ft: rt.width_ft,
            sqft: rt.sqft,
            photo_urls: rt.photo_urls,
            tour_url: rt.tour_url || null,
            notes: rt.notes || null,
          }))
        );
        if (rtErr) throw new Error(`Room types insert failed: ${rtErr.message}`);
      }

      console.log(`    ✓ ${building.building_name} (${building.room_types.length} room types)`);
    }
  }

  console.log('\nSeed complete.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
