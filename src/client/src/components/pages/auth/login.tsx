import React, { useState, useContext } from 'react'
import { Button, Form, Input } from 'antd'
import UsersContext from '../../../contexts/users'

import './auth.css'
import validateEmail, { emailFormRule } from '../../../utils/form/validateEmail'

interface Props {}
const Login = function (props: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formValid, setFormValid] = useState(false)

  const { login, isLoading } = useContext(UsersContext)

  const handleLogin = async () => {
    login(email, password)
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 10, span: 16 }
  }

  const validateForm = (values: { email: string; password: string }) => {
    const { email, password } = values
    setFormValid(validateEmail(email) && password !== '')
  }

  return (
    <div>
      <Form
        {...layout}
        className='auth-form'
        onValuesChange={(changed, values) => validateForm(values)}
      >
        <Form.Item
          label='Email'
          name='email'
          labelAlign='left'
          rules={[emailFormRule]}
        >
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Password' name='password' labelAlign='left'>
          <Input.Password
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type='primary'
            onClick={handleLogin}
            loading={isLoading}
            disabled={!formValid}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
