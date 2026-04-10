import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { useEmployees, useEmployee } from './useEmployees'
import * as api from '../lib/api'

vi.mock('../lib/api')

const mockedFetchEmployees = vi.mocked(api.fetchEmployees)
const mockedFetchEmployee = vi.mocked(api.fetchEmployee)

function makeWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client }, children)
}

const validEmployee = {
  id: 1,
  employee_name: 'Alice',
  employee_salary: '50000',
  employee_age: '30',
  profile_image: '',
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('useEmployees', () => {
  it('isLoading is true on initial render before the query resolves', () => {
    mockedFetchEmployees.mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => useEmployees(), { wrapper: makeWrapper() })
    expect(result.current.isLoading).toBe(true)
  })

  it('error is set when fetchEmployees rejects', async () => {
    const err = new Error('network failure')
    mockedFetchEmployees.mockRejectedValue(err)
    const { result } = renderHook(() => useEmployees(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    expect(result.current.error?.message).toBe('network failure')
  })
})

describe('useEmployee', () => {
  it('isLoading is true on initial render before the query resolves', () => {
    mockedFetchEmployee.mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => useEmployee(1), { wrapper: makeWrapper() })
    expect(result.current.isLoading).toBe(true)
  })

  it('error is set when fetchEmployee rejects', async () => {
    const err = new Error('not found')
    mockedFetchEmployee.mockRejectedValue(err)
    const { result } = renderHook(() => useEmployee(1), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    expect(result.current.error?.message).toBe('not found')
  })
})
