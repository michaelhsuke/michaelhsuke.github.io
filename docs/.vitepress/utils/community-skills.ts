export interface CommunityMember {
  id: string
  name: string
  avatar?: string
  have: string[]
  want: string[]
  contact: string
  contactType: 'email' | 'wechat' | 'github'
  date: string
}

export const data: CommunityMember[] = [
  {
    id: '1',
    name: '阿杰',
    avatar: 'https://picsum.photos/seed/avatar1/80/80',
    have: ['React', 'Node.js', 'Docker'],
    want: ['Vue3', '摄影'],
    contact: 'ajie@example.com',
    contactType: 'email',
    date: '2026-03-27',
  },
  {
    id: '2',
    name: '小鱼',
    avatar: 'https://picsum.photos/seed/avatar2/80/80',
    have: ['摄影', '视频剪辑', 'PS'],
    want: ['钢琴', '3D 建模'],
    contact: 'xiaoyu_123',
    contactType: 'wechat',
    date: '2026-03-26',
  },
  {
    id: '3',
    name: '老王',
    avatar: 'https://picsum.photos/seed/avatar3/80/80',
    have: ['钢琴', '吉他', '音乐制作'],
    want: ['Rust', '编程入门'],
    contact: 'laowang-dev',
    contactType: 'github',
    date: '2026-03-25',
  },
]
