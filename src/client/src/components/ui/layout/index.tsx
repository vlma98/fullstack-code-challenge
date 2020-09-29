import React, { useState, useContext } from 'react'
import { Layout as ALayout, Menu, Typography } from 'antd'
import {
  LogoutOutlined,
  ProfileOutlined,
  DashboardOutlined
} from '@ant-design/icons'
import UsersContext from '../../../contexts/users'
import './layout.css'
import { navigate } from '@reach/router'
const { Header, Content, Sider } = ALayout
const { Title } = Typography

interface Props {
  children?: React.ReactNode
}
const Layout: React.FC = function (props: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useContext(UsersContext)
  return (
    <ALayout style={{ maxHeight: '100vh' }}>
      <Sider
        className='lsider'
        collapsible
        collapsed={collapsed}
        onCollapse={(v) => setCollapsed(v)}
      >
        <Menu theme='dark' title='Find me issues'>
          <Menu.Item
            icon={<DashboardOutlined />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon={<ProfileOutlined />}
            onClick={() => navigate('/profile')}
          >
            Perfil
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
            Sign out
          </Menu.Item>
        </Menu>
      </Sider>
      <ALayout>
        <Header>
          <Title style={{ color: 'white' }}>Where my issues at?</Title>
        </Header>
        <Content style={{ height: '100%' }}>{props.children}</Content>
      </ALayout>
    </ALayout>
  )
}

export default Layout
