import { IRepo } from '../types'

const mock: IRepo[] = [
  {
    _id: '0',
    owner: 'facebook',
    name: 'react',
    labels: ['good first issue']
  },
  {
    _id: '1',
    owner: 'ornicar',
    name: 'lila',
    labels: ['bug', 'feature']
  },
  {
    _id: '2',
    owner: 'gjgd',
    name: 'should-i-play-f6',
    labels: []
  },
  {
    _id: '3',
    owner: 'katspaugh',
    name: 'wavesurfer.js',
    labels: ['typescript', 'plugins', 'ajsdijasd', 'kaosdkaoskd', 'koskdalskd']
  }
]

export default mock
