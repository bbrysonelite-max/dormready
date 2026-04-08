import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/resend';

const router = Router();

const leadSchema = z.object({
  email: z.string().email(),
  school_id: z.string().uuid(),
  building_id: z.string().uuid().optional(),
  source: z.string().min(1).max(100),
});

// POST /api/leads — capture email, trigger welcome email
router.post('/', async (req: Request, res: Response) => {
  const parsed = leadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues[0].message,
      code: 'VALIDATION_ERROR',
    });
  }

  const { email, school_id, building_id, source } = parsed.data;

  // Fetch school name for the welcome email
  const { data: school, error: schoolError } = await supabase
    .from('schools')
    .select('name')
    .eq('id', school_id)
    .single();

  if (schoolError || !school) {
    return res.status(400).json({ error: 'School not found', code: 'INVALID_SCHOOL' });
  }

  // Upsert lead (idempotent: same email + school = no duplicate)
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .upsert(
      { email, school_id, building_id: building_id ?? null, source },
      { onConflict: 'email,school_id', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (leadError) {
    return res.status(500).json({ error: leadError.message, code: 'DB_ERROR' });
  }

  // Send welcome email (non-blocking — don't fail the request if email fails)
  sendWelcomeEmail(email, school.name).catch((err) => {
    console.error('Welcome email failed:', err);
  });

  return res.status(201).json({ success: true, lead_id: lead.id });
});

export default router;
