export interface Skill {
  name: string
  level: 1 | 2 | 3 | 4 | 5  // 1=了解 2=入门 3=熟练 4=精通 5=专家
  icon?: string               // 可选的 emoji 或图标
}

export interface SkillProfile {
  have: Skill[]     // 我会的技能
  want: Skill[]     // 我想学的技能
  contact?: string  // 联系方式描述
}

export const data: SkillProfile = {
  have: [
    { name: 'Vue3', level: 5, icon: '💚' },
    { name: 'TypeScript', level: 4, icon: '🔷' },
    { name: 'CSS', level: 5, icon: '🎨' },
    { name: 'Vite', level: 4, icon: '⚡' },
    { name: 'Node.js', level: 3, icon: '🟢' },
    { name: '咖啡', level: 4, icon: '☕' },
    { name: '摄影', level: 3, icon: '📷' },
  ],
  want: [
    { name: 'Rust', level: 1, icon: '🦀' },
    { name: '钢琴', level: 1, icon: '🎹' },
    { name: '视频剪辑', level: 1, icon: '🎬' },
    { name: '3D 建模', level: 1, icon: '🧊' },
  ],
  contact: '想技能交换？欢迎通过公众号「业娱家」或邮件联系我',
}
