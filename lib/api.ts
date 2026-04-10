import { EmployeeSchema, EmployeesSchema } from './schemas'
import type { Employee, EmployeeList } from '../types'

const BASE_URL = 'https://dummy.restapiexample.com/api/v1'

export async function fetchEmployees(): Promise<EmployeeList> {
  const response = await fetch(`${BASE_URL}/employees`)

  if (!response.ok) {
    throw new Error(`Failed to fetch employees: HTTP ${response.status}`)
  }

  const json = await response.json()
  return EmployeesSchema.parse(json.data)
}

export async function fetchEmployee(id: number): Promise<Employee> {
  const response = await fetch(`${BASE_URL}/employee/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch employee ${id}: HTTP ${response.status}`)
  }

  const json = await response.json()
  return EmployeeSchema.parse(json.data)
}
