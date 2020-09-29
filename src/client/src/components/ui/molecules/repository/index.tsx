import { Badge, Card, Input, Tag, Tooltip } from 'antd'
import React, { useState } from 'react'
import { IRepo } from '../../../../types'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { getIssues } from '../../../../api/github'
import './repository.css'

interface Props {
  repo: IRepo
}
const Repository = function (props: Props) {
  const { repo } = props

  const { owner, name, labels } = repo

  const [editInputIndex, setEditInputIndex] = useState<number | null>(null)
  const [label, setLabel] = useState('')
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  // const [issues, setIssues] = useState<IIssue[] | null>(null)

  // if (issues === null) {
  //   getIssues(owner, name, labels)
  //     .then((response) => {
  //       setIssuesLoading(false)
  //       setIssues(response.data.issues)
  //     })
  //     .catch((err) => {
  //       setIssuesLoading(false)
  //     })
  // }

  const handleEditConfirm = async () => {
    alert('Edited label now is ' + label)
    setEditInputIndex(null)
  }

  const renderTag = (
    label: string,
    index: number,
    onClose: (label: string) => Promise<void>
  ) => {
    const isLong = label.length > 20
    const tag = (
      <Tag
        color='geekblue'
        key={label}
        onClick={() => setEditInputIndex(index)}
        closable
        onClose={() => onClose(label)}
      >
        {label.length > 20 ? label.slice(0, 17) + '...' : label}
      </Tag>
    )
    return isLong ? (
      <Tooltip title={label} key={label}>
        {tag}
      </Tooltip>
    ) : (
      tag
    )
  }

  const handleRemoveLabel = async (label: string) => {
    alert('Removing label ' + label)
  }

  const handleAddLabel = async () => {
    alert('Adding ' + newLabel)
    setAddingLabel(false)
    setNewLabel('')
  }

  // const renderIssue = (issue: IIssue, index: number, A: IIssue[]) => {
  //   const { title, labels, url, id } = issue
  //   return (
  //     <div key={id} style={{ marginBottom: 30 }}>
  //       <a href={url}>
  //         <Text strong>{title}</Text>
  //         <div>
  //           {labels.map(({ color, name }) => (
  //             <Tag color={color} key={name}>
  //               {name}
  //             </Tag>
  //           ))}
  //         </div>
  //       </a>
  //     </div>
  //   )
  // }

  return (
    <Card
      title={`${owner}/${name}`}
      className='repo-container'
      extra={<Badge count={10} style={{ backgroundColor: 'green' }}></Badge>}
    >
      <div className='repo-labels'>
        <p>Labels you're following:</p>
        {labels.map((l, idx) =>
          editInputIndex === idx ? (
            <Input
              key={idx}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              size='small'
              autoFocus
              onBlur={handleEditConfirm}
              onPressEnter={handleEditConfirm}
            />
          ) : (
            renderTag(l, idx, handleRemoveLabel)
          )
        )}
        {!addingLabel && (
          <Tag className='plus-tag' onClick={() => setAddingLabel(true)}>
            <PlusCircleOutlined /> New Label
          </Tag>
        )}
        {addingLabel && (
          <Input
            size='small'
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={handleAddLabel}
            onPressEnter={handleAddLabel}
          />
        )}
      </div>
      {/* 
      <Collapse style={{ marginTop: 15 }}>
        <Collapse.Panel key='0' header='See more...'>
          {issuesLoading && <Spin />}
          {issues && issues.map(renderIssue)}
        </Collapse.Panel>
      </Collapse>
      */}
    </Card>
  )
}

export default Repository
