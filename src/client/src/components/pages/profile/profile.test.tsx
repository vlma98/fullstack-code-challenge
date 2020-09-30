import React from 'react'
import {
  render,
  act,
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement,
  wait
} from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import Profile from '.'
import UserContext, { UserContextProvider } from '../../../contexts/users'
import { notification } from 'antd'

const mockProfile = () => (
  <UserContext.Provider
    value={{
      changePassword: jest.fn(async (password, newPassword) => {
        console.log('called with ' + password + ' ' + newPassword)
      }),
      signUp: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      updateMe: jest.fn(),
      deleteMe: jest.fn(),
      user: {
        email: 'mocked@user.com',
        name: { first: 'Unreal', last: 'User' },
        _id: '0',
        active: true,
        gender: 2
      },
      isLoading: false
    }}
  >
    <Profile />
  </UserContext.Provider>
)

describe('The Profile page', () => {
  let container: HTMLDivElement | null = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container)
      container.remove()
      container = null
    }
  })

  test('gives feedback of field email with value "a.com" as invalid and disables button', async () => {
    const { getByTestId, getByText } = render(mockProfile())
    const editButton = getByText(/Edit Profile/)
    act(() => {
      fireEvent.click(editButton)
    })
    const emailInput = getByTestId('email')
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'a.com' } })
    })
    const saveButton = getByText(/Save/)
    await waitForElement(() => getByText(/Invalid email/))
    expect(saveButton).toBeDisabled()
  })

  test('shows error notification when changes password but "New Password" and "Confirm Password" fields differ', async () => {
    const { getByTestId, getByText } = render(mockProfile())

    const changePasswordButton = getByText('Change Password')
    act(() => {
      fireEvent.click(changePasswordButton)
    })
    const newPasswordInput = getByTestId('newPassword')
    const confirmPasswordInput = getByTestId('confirmPassword')
    const okButton = getByText('OK')

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: '123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: '321' } })
      fireEvent.click(okButton)
    })

    waitForElement(() => getByText(/Passwords differ/))
  })
})
