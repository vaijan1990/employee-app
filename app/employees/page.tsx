import EmployeeGrid from './EmployeeGrid'

export default function EmployeesPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-12 text-white">
        <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">
            Ditt team
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Personalregister
          </h1>
          <p className="mt-2 text-indigo-200 text-sm">
            Bläddra och ta kontakt med alla i teamet.
          </p>
        </div>
      </div>

      {/* Grid */}
      <main role="main" className="mx-auto max-w-6xl px-4 py-10">
        <EmployeeGrid />
      </main>
    </div>
  )
}
