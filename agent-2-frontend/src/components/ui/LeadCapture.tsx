'use client'

import { useState } from 'react'

interface LeadCaptureProps {
  schoolId: string
  buildingId: string
}

export default function LeadCapture({ schoolId, buildingId }: LeadCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          school_id: schoolId,
          building_id: buildingId,
          source: 'dorm-profile',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <p className="font-semibold text-green-800">You&apos;re on the list!</p>
        <p className="text-sm text-green-700 mt-1">Layout guide coming to your inbox.</p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
      <p className="font-semibold text-gray-900 mb-1">Get Your Free Layout Guide</p>
      <p className="text-sm text-gray-500 mb-4">
        We&apos;ll send a room checklist sized exactly for this dorm.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Send My Guide'}
        </button>
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  )
}
