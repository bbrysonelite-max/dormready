import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/resend';

const router = Router();

const LeadSchema = z.object({
  email: z.string().email(),
  school_id: z.string().min(1),
  building_id: z.string().optional(),
  source: z.string().optional().default('organic'),
});

// POST /api/leads
router.post('/', async (req: Request, res: Response) => {
  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues[0].message,
      code: 'VALIDATION_ERROR',
    });
  }

  const { email, school_id, building_id, source } = parsed.data;

  // Fetch school name for email
  const { data: school } = await supabase
    .from('schools')
    .select('school_name')
    .eq('school_id', school_id)
    .single();

  const schoolName = school?.school_name ?? school_id;

  // Upsert lead (idempotent on email + school_id)
  const { data: lead, error } = await supabase
    .from('leads')
    .upsert(
      { email, school_id, building_id: building_id ?? null, source },
      { onConflict: 'email,school_id', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (error) {
    return res.status(500).json({ error: error.message, code: 'DB_ERROR' });
  }

  // Fire welcome email (non-blocking — don't fail the request if email fails)
  sendWelcomeEmail(email, schoolName).catch((err) =>
    console.error('Welcome email failed:', err)
  );

  return res.status(201).json({ success: true, lead_id: lead.id });
});

export default router;
