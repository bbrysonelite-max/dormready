import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET /api/schools
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('schools')
    .select('school_id, school_name, location')
    .order('school_name');

  if (error) {
    return res.status(500).json({ error: error.message, code: 'DB_ERROR' });
  }

  return res.json(data);
});

// GET /api/schools/:school_id
router.get('/:school_id', async (req: Request, res: Response) => {
  const { school_id } = req.params;

  const { data: school, error: schoolError } = await supabase
    .from('schools')
    .select('*')
    .eq('school_id', school_id)
    .single();

  if (schoolError || !school) {
    return res.status(404).json({ error: 'School not found', code: 'NOT_FOUND' });
  }

  const { data: buildings, error: buildingError } = await supabase
    .from('buildings')
    .select(`
      building_id,
      building_name,
      type,
      room_types (
        type,
        length_ft,
        width_ft,
        sqft,
        photo_urls,
        tour_url,
        notes
      )
    `)
    .eq('school_id', school_id)
    .order('building_name');

  if (buildingError) {
    return res.status(500).json({ error: buildingError.message, code: 'DB_ERROR' });
  }

  return res.json({ ...school, buildings });
});

export default router;
