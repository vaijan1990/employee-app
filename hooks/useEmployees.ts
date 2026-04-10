'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchEmployees, fetchEmployee } from '../lib/api'
import type { Employee, EmployeeList } from '../types'

export function useEmployees() {
  const queryClient = useQueryClient()
  const { data, isLoading, error, refetch } = useQuery<EmployeeList, Error>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    staleTime: 25 * 60 * 1000,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 15,
  })


  return { data, isLoading, error, refetch }
}

export function useEmployee(id: number) {
  const queryClient = useQueryClient()
  const { data, isLoading, error, refetch } = useQuery<Employee, Error>({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployee(id),
    staleTime: 25 * 60 * 1000,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 15,
  })

  return { data, isLoading, error, refetch }
}
