import React, { useState, useContext } from 'react'
import { Button, Form, Input } from 'antd'
import UsersContext from '../../../contexts/users'
import './auth.css'

interface Props {}
const SignUp = function (props: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { signUp, isLoading } = useContext(UsersContext)

  const handleSubmit = () => {
    signUp(email, password, 2, { first: firstName, last: lastName })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
  }

  return (
    <div>
      <Form {...layout} className='auth-form'>
        <Form.Item label='First name' name='firstName' labelAlign='left'>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Last name' name='lastName' labelAlign='left'>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          labelAlign='left'
          rules={[{ message: 'Not a valid email', type: 'email' }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item name='password' label='Password' labelAlign='left'>
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
          <Button type='primary' onClick={handleSubmit} loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
