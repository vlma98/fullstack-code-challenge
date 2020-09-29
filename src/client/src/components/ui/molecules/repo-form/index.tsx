import React, { useState, useContext } from 'react'
import { Form, Modal, Input, Divider, Tag } from 'antd'
import ctes from '../../../../constants'
import ReposContext from '../../../../contexts/repos'
import { PlusOutlined } from '@ant-design/icons'

const { githubUrl } = ctes

interface Props {
  visible: boolean
  onCancel: () => void
}
const RepoForm = function (props: Props) {
  const [adding, setAdding] = useState(false)
  const [repoURL, setRepoURL] = useState('')
  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  const [labels, setLabels] = useState<string[]>([])
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const { isLoading, createRepo } = useContext(ReposContext)

  const handleAddLabel = async () => {
    if (newLabel) {
      setLabels([...labels, newLabel])
      setNewLabel('')
    }
    setAddingLabel(false)
  }

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

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
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
            prefix={githubUrl}
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
  )
}

export default RepoForm
