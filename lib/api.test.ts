import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchEmployees, fetchEmployee } from './api'

const validEmployee = {
  id: 1,
  employee_name: 'Alice',
  employee_salary: '50000',
  employee_age: '30',
  profile_image: '',
}

function makeFetchResponse(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
  })
}

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// --- fetchEmployees ---

describe('fetchEmployees', () => {
  it('returns validated array on success', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({ status: 'success', data: [validEmployee] }))
    const result = await fetchEmployees()
    expect(result).toEqual([validEmployee])
  })

  it('throws with HTTP status code on non-2xx response', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({}, false, 429))
    await expect(fetchEmployees()).rejects.toThrow('429')
  })

  it('throws ZodError when data is malformed', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({ status: 'success', data: [{ id: 'not-a-number' }] }))
    await expect(fetchEmployees()).rejects.toThrow()
  })
})

// --- fetchEmployee ---

describe('fetchEmployee', () => {
  it('returns validated employee on success', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({ status: 'success', data: validEmployee }))
    const result = await fetchEmployee(1)
    expect(result).toEqual(validEmployee)
  })

  it('throws with HTTP status code on non-2xx response', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({}, false, 404))
    await expect(fetchEmployee(99)).rejects.toThrow('404')
  })

  it('throws ZodError when data is malformed (missing required fields)', async () => {
    vi.stubGlobal('fetch', makeFetchResponse({ status: 'success', data: { id: 1 } }))
    await expect(fetchEmployee(1)).rejects.toThrow()
  })

  it('unwraps .data before validation', async () => {
    const wrapped = { status: 'success', data: validEmployee }
    vi.stubGlobal('fetch', makeFetchResponse(wrapped))
    const result = await fetchEmployee(1)
    expect(result.employee_name).toBe('Alice')
  })
})
