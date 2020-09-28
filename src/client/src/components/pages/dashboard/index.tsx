import React, { useContext, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import Repository from '../../ui/molecules/repository'
import { Row, Col, Button, Modal, Form, Input, Tag, Divider } from 'antd'
import Layout from '../../ui/layout'
import ReposContext from '../../../contexts/repos'
import { PlusOutlined } from '@ant-design/icons'

interface Props extends RouteComponentProps {}
const DashboardPage = function (props: Props) {
  const { repos, isLoading, createRepo } = useContext(ReposContext)
  const [adding, setAdding] = useState(false)
  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  const [labels, setLabels] = useState<string[]>([])
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [repoURL, setRepoURL] = useState('')

  const handleAddRepo = async () => {
    if (repoURL) {
      const [owner, name] = repoURL.split('/')
      createRepo({ owner, name, labels }).then(() => {
        setAdding(false)
        setOwner('')
        setName('')
        setLabels([])
        setRepoURL('')
      })
    } else {
      createRepo({ owner, name, labels }).then(() => {
        setAdding(false)
        setOwner('')
        setName('')
        setLabels([])
        setRepoURL('')
      })
    }
  }

  const handleAddLabel = async () => {
    if (newLabel) {
      setLabels([...labels, newLabel])
      setNewLabel('')
    }
    setAddingLabel(false)
  }

  return (
    <Layout>
      <Button onClick={() => setAdding(true)}>
        <PlusOutlined /> Add repository
      </Button>
      <Row justify='center'>
        {repos.map((r, idx) => (
          <Col xl={9} lg={9} md={18} sm={24} xs={24} key={idx}>
            <Repository repo={r} key={r._id} />
          </Col>
        ))}
      </Row>

      <Modal
        visible={adding}
        onCancel={() => setAdding(false)}
        onOk={handleAddRepo}
        okButtonProps={{ loading: isLoading }}
        title='Add new repository'
      >
        <Form>
          <Form.Item
            label='Repo URL'
            name='url'
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (getFieldValue('url').split('/').length >= 2) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Invalid URL')
                }
              })
            ]}
          >
            <Input
              prefix='https://github.com/'
              value={repoURL}
              onChange={(e) => setRepoURL(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Divider orientation='center'>ou</Divider>
        <Form>
          <Form.Item label='Owner' name='owner'>
            <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </Form.Item>
          <Form.Item label='Name' name='name'>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item>
            {labels.map((l, idx) => (
              <Tag key={idx}>{l}</Tag>
            ))}
            {!addingLabel && (
              <Tag onClick={() => setAddingLabel(true)}>
                New label <PlusOutlined />
              </Tag>
            )}
            {addingLabel && (
              <Input
                autoFocus
                size='small'
                style={{ width: 100 }}
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onBlur={handleAddLabel}
                onPressEnter={handleAddLabel}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default DashboardPage
