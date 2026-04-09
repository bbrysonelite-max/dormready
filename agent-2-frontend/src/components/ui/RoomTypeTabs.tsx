'use client'

import { useState } from 'react'
import type { RoomType } from '@/types/dorms'

export default function RoomTypeTabs({ roomTypes }: { roomTypes: RoomType[] }) {
  const [active, setActive] = useState(0)
  const room = roomTypes[active]

  return (
    <div>
      {roomTypes.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {roomTypes.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                active === i
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
            >
              {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-black text-blue-700 tracking-tight">
            {room.length_ft}′ × {room.width_ft}′
          </span>
          <span className="text-lg font-semibold text-blue-500 pb-0.5">{room.sqft} sq ft</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-0.5">Length</p>
            <p className="font-bold text-gray-900">{room.length_ft} ft</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-0.5">Width</p>
            <p className="font-bold text-gray-900">{room.width_ft} ft</p>
          </div>
          <div className="bg-white rounded-lg p-3 col-span-2">
            <p className="text-gray-500 text-xs mb-0.5">Area</p>
            <p className="font-bold text-gray-900">{room.sqft} sq ft</p>
          </div>
        </div>

        {room.notes && (
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{room.notes}</p>
        )}
      </div>
    </div>
  )
}
