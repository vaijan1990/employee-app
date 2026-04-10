'use client'

import { useState } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import EmployeeCard from '@/components/EmployeeCard'

function CardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="skeleton flex flex-col items-center gap-3 rounded-2xl p-5"
      style={{ animationDelay: `${index * 60}ms` }}
      aria-hidden="true"
    >
      <div className="h-16 w-16 rounded-full skeleton" />
      <div className="h-3 w-24 rounded-full skeleton" />
      <div className="h-2 w-16 rounded-full skeleton" />
    </div>
  )
}

export default function EmployeeGrid() {
  const { data, isLoading, error, refetch } = useEmployees()

  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    refetch()
    // Reset animation after a short delay
    setTimeout(() => setIsRetrying(false), 1000)
  }

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Laddar medarbetare"
        aria-busy="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} index={i} />
        ))}
      </div>
    )
  }


  if (error) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center animate-fade-in">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl">
          <span aria-hidden="true">😵</span>
        </div>
        <div>
          <p className="font-semibold text-red-700">Kunde inte nå servern</p>
          <p className="mt-1 text-sm text-red-400">
            Tjänsten är tillfälligt otillgänglig. Försök igen om en stund.
          </p>
        </div>
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isRetrying
            ? 'animate-spin cursor-not-allowed opacity-75'
            : 'hover:scale-105 hover:shadow-lg'
            }`}
        >
          <span className="text-base">{isRetrying ? '⟳' : '↺'}</span> {isRetrying ? 'Försöker...' : 'Försök igen'}
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Lista över medarbetare" >
      {data?.map((employee, i) => (
        <EmployeeCard key={employee.id} employee={employee} index={i} />
      ))}
    </div>
  )
}
