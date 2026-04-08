'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { schools } from '@/data/schools'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const results = query.length > 0
    ? schools.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.location.toLowerCase().includes(query.toLowerCase())
      )
    : []

  function handleSelect(id: string) {
    setQuery('')
    setOpen(false)
    router.push(`/schools/${id}`)
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search university or dorm…"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="Search universities"
      />
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.map((s) => (
            <li key={s.id}>
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex justify-between items-center"
                onMouseDown={() => handleSelect(s.id)}
              >
                <span className="font-medium text-gray-900">{s.name}</span>
                <span className="text-xs text-gray-400">{s.location}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
