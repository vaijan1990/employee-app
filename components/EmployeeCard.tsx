'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Employee } from '../types'

// Cycle through distinct gradient combos per card index
const GRADIENTS = [
  'from-indigo-400 to-purple-500',
  'from-pink-400 to-rose-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-500',
  'from-violet-400 to-fuchsia-500',
  'from-lime-400 to-green-500',
  'from-cyan-400 to-indigo-500',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export default function EmployeeCard({
  employee,
  index = 0,
}: {
  employee: Employee
  index?: number
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <Link
      href={`/employees/employee/${employee.id}`}
      className="animate-card-in group flex flex-col items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      style={{ animationDelay: `${index * 50}ms` }}
      aria-label={`Visa profil för ${employee.employee_name}`}
    >
      {/* Avatar */}
      {employee.profile_image ? (
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow-md">
          <Image
            src={employee.profile_image}
            alt={employee.employee_name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
        </div>
      ) : (
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-xl font-bold shadow-md select-none transition-transform duration-300 group-hover:scale-110`}
        >
          {getInitials(employee.employee_name)}
        </div>
      )}

      {/* Name */}
      <span className="text-sm font-semibold text-gray-800 text-center leading-snug group-hover:text-indigo-600 transition-colors duration-150">
        {employee.employee_name}
      </span>

      {/* View indicator */}
      <span className="mt-auto text-[10px] font-medium text-indigo-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        Visa profil →
      </span>
    </Link>
  )
}
