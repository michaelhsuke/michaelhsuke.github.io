import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date?: string
  category?: string
  tags?: string[]
  skills?: string[]
  tutorial?: boolean
  cover?: string
  excerpt?: string
}

export declare const data: Post[]

export default createContentLoader('**/*.md', {
  transform(rawData): Post[] {
    return rawData
      .filter((page) => !page.url.includes('/index'))
      .map((page) => ({
        title: page.frontmatter.title || '无标题',
        url: page.url,
        date: page.frontmatter.date,
        category: page.frontmatter.category,
        tags: page.frontmatter.tags,
        skills: page.frontmatter.skills,
        tutorial: page.frontmatter.tutorial,
        cover: page.frontmatter.cover,
        excerpt: page.frontmatter.description || page.excerpt,
      }))
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
  },
})
