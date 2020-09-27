import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import './auth.css'

interface Props {}
const SignUp = function (props: Props) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = () => {
    alert('Sign up with ' + email + ' ' + password + ' ' + confirmPassword)
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
        <Form.Item name='email' label='Email' labelAlign='left'>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item name='password' label='Password' labelAlign='left'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm Password'
          labelAlign='left'
        >
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
