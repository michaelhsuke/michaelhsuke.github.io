import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '业娱家',
  description: '分享有趣的生活内容，顺便种草好物',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '业娱家, 好物推荐, 生活分享, 播客推荐, 短视频精选' }],
    ['meta', { name: 'author', content: '业娱家' }],
    ['script', { async: '', src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
    // 百度统计（替换为你的百度统计 ID）
    // ['script', { src: 'https://hm.baidu.com/hm.js?YOUR_BAIDU_ID' }],
  ],
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://webook.pub',
  },
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '好物推荐', link: '/posts/goods/' },
      { text: '技能', link: '/skills/' },
      { text: '技能交换', link: '/exchange/' },
      { text: '生活灵感', link: '/posts/life/' },
      { text: '播客精选', link: '/podcasts/' },
      { text: '短视频', link: '/videos/' },
      { text: '工具效率', link: '/posts/tools/' },
      { text: '关于', link: '/about' },
    ] as DefaultTheme.NavItem[],
    sidebar: {
      '/posts/goods/': [
        { text: '全部好物', link: '/posts/goods/' },
        { text: '这 5 件厨房好物让我幸福感拉满', link: '/posts/goods/5-kitchen-goods' },
      ],
      '/posts/life/': [
        { text: '全部文章', link: '/posts/life/' },
        { text: '一个人的京都 5 日独行记', link: '/posts/life/kyoto-trip' },
        { text: '养了一年的阳台上种出了这些', link: '/posts/life/balcony-garden' },
      ],
      '/posts/tools/': [
        { text: '全部工具', link: '/posts/tools/' },
        { text: '从零搭建一个 Vue3 组合式函数库', link: '/posts/tools/vue3-composables-guide' },
        { text: '我用了两年的 7 个免费效率工具', link: '/posts/tools/7-free-productivity-tools' },
      ],
      '/posts/chat/': [
        { text: '全部', link: '/posts/chat/' },
        { text: '关于上班这件事，我想了很久', link: '/posts/chat/thinking-about-work' },
        { text: '为什么我放弃了刷短视频', link: '/posts/chat/quit-short-video' },
      ],
      '/podcasts/': [
        { text: '全部播客', link: '/podcasts/' },
        { text: '5 个值得反复听的中文播客', link: '/podcasts/5-chinese-podcasts' },
        { text: '3 个让人停不下来的英文播客', link: '/podcasts/3-english-podcasts' },
      ],
      '/videos/': [
        { text: '全部视频', link: '/videos/' },
        { text: 'B站那些让我笑到不行的宝藏 UP 主', link: '/videos/bilibili-ups' },
        { text: 'YouTube 上让我学到很多的 5 个频道', link: '/videos/youtube-channels' },
      ],
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    footer: {
      message: '© 2026 业娱家 webook.pub',
    },
    // Giscus 评论系统（替换为你的配置）
    // 参考 https://giscus.app 获取以下参数
    comment: {
      provider: 'giscus',
      repo: 'YOUR_GITHUB_USERNAME/YOUR_REPO',
      repoId: 'YOUR_REPO_ID',
      category: 'General',
      categoryId: 'YOUR_CATEGORY_ID',
      mapping: 'pathname',
      lang: 'zh-CN',
      emoji: '+1',
    },
  },
})
