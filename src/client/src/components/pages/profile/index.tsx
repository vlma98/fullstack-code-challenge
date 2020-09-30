import React, { useState, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Button, Input, Typography, Form, Spin, Modal, Space } from 'antd'
import UsersContext from '../../../contexts/users'
import Layout from '../../ui/layout'
import './profile.css'
import useError from '../../../hooks/useError'
import validateEmail, {
  emailBasicRegex,
  emailFormRule
} from '../../../utils/form/validateEmail'

const { Paragraph: p } = Typography

interface Props extends RouteComponentProps {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 }
}

const ProfilePage = function (props: Props) {
  const { user, isLoading, updateMe } = useContext(UsersContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [updating, setUpdating] = useState(false)
  const [changingPassword, setChanginPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [formValid, setFormValid] = useState(true)
  const [, setError] = useError()
  const handleChangePassword = async () => {
    alert(`Changin password with ${password} ${confirmPassword} ${newPassword}`)
    setChanginPassword(false)
  }

  if (!user) {
    return <Spin />
  }

  const handleUpdate = async () => {
    if (email !== user.email && !validateEmail(email)) {
      setError('Email invalid')
      return
    }
    setUpdating(false)
    updateMe({
      name: {
        first: firstName || user.name.first,
        last: lastName || user.name.last
      },
      email: email || user.email
    })
  }

  const validateForm = (values: { email: string }) => {
    const { email } = values
    const valid = email !== '' && validateEmail(email)
    setFormValid(valid)
  }

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 600,
          margin: 'auto auto'
        }}
      >
        {!updating && (
          <div className='profile-container'>
            <div className='profile-item'>
              <label>First Name</label>
              <p>{user.name.first}</p>
            </div>
            <div className='profile-item'>
              <label>Last Name</label>
              <p>{user.name.last}</p>
            </div>
            <div className='profile-item'>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        )}

        {!updating && (
          <Button onClick={() => setUpdating(true)}>Edit Profile</Button>
        )}

        {updating && (
          <Form
            initialValues={{
              email: user.email,
              firstName: user.name.first,
              secondName: user.name.last
            }}
            {...layout}
            onValuesChange={(changed, values) => validateForm(values)}
          >
            <Form.Item name='firstName' label='First name' labelAlign='left'>
              <Input onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>
            <Form.Item name='secondName' label='Second name' labelAlign='left'>
              <Input onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              labelAlign='left'
              rules={[emailFormRule]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space direction='horizontal'>
                <Button onClick={() => setUpdating(false)} danger>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  type='primary'
                  disabled={!formValid}
                >
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}

        <Button onClick={() => setChanginPassword(true)}>
          Change Password
        </Button>

        <Modal
          visible={changingPassword}
          onCancel={() => setChanginPassword(false)}
          onOk={handleChangePassword}
        >
          <Form {...layout} style={{ marginTop: 15 }}>
            <Form.Item name='password' label='Password'>
              <Input.Password
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item name='newPassword' label='New Password'>
              <Input.Password
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item name='confirmPassword' label='Confirm Password'>
              <Input.Password
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  )
}

export default ProfilePage
