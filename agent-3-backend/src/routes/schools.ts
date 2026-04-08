import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET /api/schools — return all schools
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('name');

  if (error) {
    return res.status(500).json({ error: error.message, code: 'DB_ERROR' });
  }

  return res.json(data);
});

// GET /api/schools/:school_id — return one school with buildings
router.get('/:school_id', async (req: Request, res: Response) => {
  const { school_id } = req.params;

  const { data, error } = await supabase
    .from('schools')
    .select('*, buildings(*)')
    .eq('id', school_id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'School not found', code: 'NOT_FOUND' });
    }
    return res.status(500).json({ error: error.message, code: 'DB_ERROR' });
  }

  return res.json(data);
});

export default router;
