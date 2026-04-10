import { z } from 'zod'

export const EmployeeSchema = z.object({
  id: z.number(),
  employee_name: z.string(),
  employee_salary: z.string(),
  employee_age: z.string(),
  profile_image: z.string().nullish().transform(v => v ?? ''),
})

export const EmployeesSchema = z.array(EmployeeSchema)
