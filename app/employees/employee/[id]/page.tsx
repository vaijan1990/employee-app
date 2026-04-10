import { Suspense } from 'react'
import Link from 'next/link'
import EmployeeDetail from './../EmployeeDetailClient'

function DetailSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 animate-pulse" aria-busy="true" aria-label="Laddar medarbetarprofil">
      <div className="h-36 w-36 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-52 rounded-full bg-gray-200" />
        <div className="h-3 w-28 rounded-full bg-gray-100" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="h-28 rounded-2xl bg-gray-100" />
        <div className="h-28 rounded-2xl bg-gray-100" />
      </div>
    </div>
  )
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main role="main" className="mx-auto max-w-sm px-4 py-10">
      <Link
        href="/employees"
        className="mb-10 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Tillbaka till personalregistret"
      >
        <span aria-hidden="true">←</span> Tillbaka till registret
      </Link>

      <Suspense fallback={<DetailSkeleton />}>
        <EmployeeDetail id={Number(id)} />
      </Suspense>
    </main>
  )
}
