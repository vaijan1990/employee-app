import type { z } from 'zod'
import type { EmployeeSchema } from '../lib/schemas'

export type Employee = z.infer<typeof EmployeeSchema>
export type EmployeeList = Employee[]
