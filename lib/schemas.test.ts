import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { EmployeeSchema } from './schemas'

/**
 * Validates: Requirements 1.4
 *
 * Property 1: `profile_image` always resolves to a defined string after parsing,
 * even when the field is absent or null.
 */
describe('EmployeeSchema', () => {
  const baseEmployee = {
    id: 1,
    employee_name: 'Alice',
    employee_salary: '50000',
    employee_age: '30',
  }

  it('Property 1: profile_image is always a defined string after parse, regardless of input value', () => {
    // Generator for profile_image values: null, undefined (absent), or any string
    const profileImageArb = fc.oneof(
      fc.constant(null),
      fc.constant(undefined),
      fc.string(),
    )

    fc.assert(
      fc.property(profileImageArb, (profileImage) => {
        const input =
          profileImage === undefined
            ? { ...baseEmployee }
            : { ...baseEmployee, profile_image: profileImage }

        const result = EmployeeSchema.parse(input)

        // profile_image must always be a defined string — never null or undefined
        expect(typeof result.profile_image).toBe('string')
        expect(result.profile_image).not.toBeNull()
        expect(result.profile_image).not.toBeUndefined()
      }),
    )
  })
})
