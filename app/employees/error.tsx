'use client'

import { useState } from 'react'

export default function EmployeesError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    reset()
    // Reset animation after a short delay
    setTimeout(() => setIsRetrying(false), 1000)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-center">
      <p className="mb-4 text-red-600">
        Något gick fel när personalregistret laddades.
      </p>
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className={`rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isRetrying
            ? 'animate-pulse scale-95 cursor-not-allowed opacity-75'
            : 'hover:bg-indigo-700 hover:scale-105'
          }`}
      >
        {isRetrying ? 'Försöker...' : 'Försök igen'}
      </button>
    </main>
  )
}
