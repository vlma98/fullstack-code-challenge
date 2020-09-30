import { Rule } from 'antd/lib/form'

/**
 * Does not cover all possible invalid emails.
 * Proper verification is done with email confirmation flows.
 */
export const emailBasicRegex = /.+\@.+\..+/

export default function (email: string): boolean {
  return emailBasicRegex.test(email)
}

export const emailFormRule: Rule = {
  message: 'InvalidEmail',
  pattern: emailBasicRegex
}
