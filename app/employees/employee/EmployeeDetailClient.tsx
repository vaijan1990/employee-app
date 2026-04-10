'use client'

import { useEmployee } from '@/hooks/useEmployees'
import Image from 'next/image'

function getInitials(name: string): string {
        return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
}

export default function EmployeeDetail({ id }: { id: number }) {
    
    const { data: employee, isLoading, error, refetch } = useEmployee(id)

    if (isLoading) {
        return <DetailSkeleton />
    }

    if (error || !employee) {
        return (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center animate-fade-in">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl">
                    <span aria-hidden="true">😵</span>
                </div>
                <div>
                    <p className="font-semibold text-red-700"> Tjänsten är tillfälligt otillgänglig</p>
                    <p className="mt-1 text-sm text-red-400">
                        Försök igen om en stund.
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-150 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                    <span className="text-base">↺</span> Försök igen
                </button>
            </div>
        )
    }

    return (
        <article
            className="animate-fade-in flex flex-col items-center gap-8"
            aria-label={`Medarbetarprofil för ${employee.employee_name}`}
        >
            <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 blur-sm opacity-75" />
                {employee.profile_image ? (
                    <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-white shadow-xl">
                        <Image
                            src={employee.profile_image}
                            alt={employee.employee_name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            unoptimized
                        />
                    </div>
                ) : (
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-4 ring-white shadow-xl text-white text-4xl font-bold select-none">
                        {getInitials(employee.employee_name)}
                    </div>
                )}
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {employee.employee_name}
                </h1>
                <p className="mt-1 text-sm text-gray-400 tracking-widest uppercase">Medarbetarprofil</p>
            </div>

            <dl className="grid w-full grid-cols-2 gap-4">
                <div className="group flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-5 shadow-sm ring-1 ring-indigo-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <span className="text-2xl" role="img" aria-label="Ålder">🎂</span>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Ålder</dt>
                    <dd className="text-2xl font-bold text-indigo-700">{employee.employee_age}</dd>
                </div>

                <div className="group flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 p-5 shadow-sm ring-1 ring-emerald-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <span className="text-2xl" role="img" aria-label="Lön">💰</span>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Lön</dt>
                    <dd className="text-2xl font-bold text-emerald-700">
                        {Number(employee.employee_salary).toLocaleString()} kr
                    </dd>
                </div>
            </dl>
        </article>
    )
}

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
