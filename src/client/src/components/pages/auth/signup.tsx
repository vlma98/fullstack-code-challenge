import React, { useState, useContext } from 'react'
import { Button, Form, Input } from 'antd'
import UsersContext from '../../../contexts/users'
import './auth.css'
import validateEmail, { emailFormRule } from '../../../utils/form/validateEmail'
import requiredFieldRule from '../../../utils/form/validateRequiredField'
import useError from '../../../hooks/useError'

interface Props {}
const SignUp = function (props: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [, setError] = useError()
  const { signUp, isLoading } = useContext(UsersContext)
  const [validForm, setValidForm] = useState(false)
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('Passwords differ!')
      return
    }
    signUp(email, password, 2, { first: firstName, last: lastName })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
  }

  const validateForm = (values: {
    email: string
    firstName: string
    lastName: string
    password: string
  }) => {
    const { email, firstName, lastName, password } = values
    const valid = Boolean(
      validateEmail(email) && firstName && lastName && password
    )
    setValidForm(valid)
  }

  return (
    <div>
      <Form
        {...layout}
        className='auth-form'
        onValuesChange={(changed, values) => validateForm(values)}
      >
        <Form.Item
          label='First name'
          name='firstName'
          labelAlign='left'
          rules={[requiredFieldRule]}
        >
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label='Last name'
          name='lastName'
          labelAlign='left'
          rules={[requiredFieldRule]}
        >
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          labelAlign='left'
          rules={[emailFormRule]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          labelAlign='left'
          rules={[requiredFieldRule]}
        >
          <Input.Password
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm Password'
          labelAlign='left'
        >
          <Input.Password
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            disabled={!validForm}
            type='primary'
            onClick={handleSubmit}
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
