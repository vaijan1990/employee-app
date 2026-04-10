import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import EmployeeCard from './EmployeeCard'
import type { Employee } from '../types'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

const baseEmployee: Employee = {
  id: 42,
  employee_name: 'Jane Doe',
  employee_salary: '60000',
  employee_age: '28',
  profile_image: '',
}

afterEach(cleanup)

describe('EmployeeCard', () => {
  it('renders an img with the correct alt when profile_image is non-empty', () => {
    const employee: Employee = { ...baseEmployee, profile_image: 'https://example.com/photo.jpg' }
    render(<EmployeeCard employee={employee} />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'Jane Doe')
  })

  it('renders the initials placeholder and no img when profile_image is empty', () => {
    render(<EmployeeCard employee={baseEmployee} />)
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('wrapping link has the correct href', () => {
    render(<EmployeeCard employee={baseEmployee} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/employees/employee/42')
  })
})
