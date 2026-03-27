<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../utils/posts.data'

// 头条：最新一篇文章
const featured = computed(() => posts[0] || null)

// 次要区：第 2-3 篇
const secondary = computed(() => posts.slice(1, 3))

// 其余文章
const rest = computed(() => posts.slice(3))

// 按分类聚合，每个分类取最新 1 篇
const categories = [
  { name: '好物推荐', icon: '📦', link: '/posts/goods/', color: '#ef4444' },
  { name: '生活灵感', icon: '💡', link: '/posts/life/', color: '#f59e0b' },
  { name: '播客精选', icon: '📻', link: '/podcasts/', color: '#8b5cf6' },
  { name: '短视频', icon: '🎬', link: '/videos/', color: '#ec4899' },
  { name: '工具效率', icon: '🛠', link: '/posts/tools/', color: '#3b82f6' },
  { name: '闲聊观点', icon: '💬', link: '/posts/chat/', color: '#6b7280' },
]

const categoryPosts = computed(() => {
  const map: Record<string, typeof posts[0]> = {}
  for (const post of posts) {
    if (post.category && !map[post.category]) {
      map[post.category] = post
    }
  }
  return map
})

const placeholderImg = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`

const categoryColors: Record<string, string> = {}
categories.forEach(c => { categoryColors[c.name] = c.color })
</script>

<template>
  <div class="magazine">
    <!-- Hero -->
    <header class="magazine__hero">
      <h1 class="magazine__title">业娱家</h1>
      <p class="magazine__slogan">分享有趣的生活内容</p>
    </header>

    <!-- 头条大图 -->
    <section v-if="featured" class="magazine__featured">
      <a :href="featured.url" class="featured-card">
        <div class="featured-card__image">
          <img
            :src="featured.cover || placeholderImg(featured.title)"
            :alt="featured.title"
            loading="eager"
          />
          <div class="featured-card__overlay" />
        </div>
        <div class="featured-card__content">
          <span
            v-if="featured.category"
            class="featured-card__category"
            :style="{ background: categoryColors[featured.category] || '#3b82f6' }"
          >
            {{ featured.category }}
          </span>
          <h2 class="featured-card__title">{{ featured.title }}</h2>
          <p v-if="featured.excerpt" class="featured-card__excerpt">{{ featured.excerpt }}</p>
          <span v-if="featured.date" class="featured-card__date">{{ featured.date }}</span>
        </div>
      </a>
    </section>

    <!-- 主次分区：2 列中卡片 -->
    <section v-if="secondary.length" class="magazine__secondary">
      <a
        v-for="post in secondary"
        :key="post.url"
        :href="post.url"
        class="secondary-card"
      >
        <div class="secondary-card__image">
          <img
            :src="post.cover || placeholderImg(post.title)"
            :alt="post.title"
            loading="lazy"
          />
        </div>
        <div class="secondary-card__body">
          <span
            v-if="post.category"
            class="secondary-card__category"
            :style="{ color: categoryColors[post.category] || '#3b82f6' }"
          >
            {{ post.category }}
          </span>
          <h3 class="secondary-card__title">{{ post.title }}</h3>
          <span v-if="post.date" class="secondary-card__date">{{ post.date }}</span>
        </div>
      </a>
    </section>

    <!-- 分类快捷入口 -->
    <section class="magazine__categories">
      <a
        v-for="cat in categories"
        :key="cat.name"
        :href="cat.link"
        class="category-chip"
        :style="{ '--cat-color': cat.color }"
      >
        <span class="category-chip__icon">{{ cat.icon }}</span>
        <span class="category-chip__name">{{ cat.name }}</span>
        <span v-if="categoryPosts[cat.name]" class="category-chip__dot" />
      </a>
    </section>

    <!-- 其余文章网格 -->
    <section v-if="rest.length" class="magazine__grid">
      <a
        v-for="post in rest"
        :key="post.url"
        :href="post.url"
        class="grid-card"
      >
        <div class="grid-card__image">
          <img
            :src="post.cover || placeholderImg(post.url)"
            :alt="post.title"
            loading="lazy"
          />
        </div>
        <div class="grid-card__body">
          <h3 class="grid-card__title">{{ post.title }}</h3>
          <div class="grid-card__meta">
            <span
              v-if="post.category"
              class="grid-card__category"
              :style="{ color: categoryColors[post.category] || '#3b82f6' }"
            >
              {{ post.category }}
            </span>
            <span v-if="post.date" class="grid-card__date">{{ post.date }}</span>
          </div>
        </div>
      </a>
    </section>

    <!-- 底部 -->
    <footer class="magazine__footer">
      <p>© 2026 业娱家 webook.pub</p>
    </footer>
  </div>
</template>

<style scoped>
.magazine {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero */
.magazine__hero {
  text-align: center;
  padding: 4rem 0 2rem;
}

.magazine__title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.magazine__slogan {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  margin: 0;
}

/* 头条大图 */
.magazine__featured {
  margin-bottom: 2rem;
}

.featured-card {
  display: block;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  transition: transform 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-2px);
}

.featured-card__image {
  width: 100%;
  aspect-ratio: 16 / 8;
  overflow: hidden;
}

.featured-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-card:hover .featured-card__image img {
  transform: scale(1.03);
}

.featured-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%);
}

.featured-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
}

.featured-card__category {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.featured-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 0.5rem;
}

.featured-card__excerpt {
  font-size: 0.9rem;
  opacity: 0.85;
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.featured-card__date {
  font-size: 0.75rem;
  opacity: 0.6;
}

/* 次要区 2 列 */
.magazine__secondary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.secondary-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--vp-c-divider);
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.secondary-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.secondary-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.secondary-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.secondary-card__body {
  padding: 1rem 1.25rem;
}

.secondary-card__category {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.secondary-card__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.25rem 0 0.375rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.secondary-card__date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* 分类入口 */
.magazine__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  transition: all 0.2s ease;
  position: relative;
}

.category-chip:hover {
  border-color: var(--cat-color);
  color: var(--cat-color);
  background: color-mix(in srgb, var(--cat-color) 8%, transparent);
}

.category-chip__icon {
  font-size: 1rem;
}

.category-chip__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cat-color);
}

/* 文章网格 */
.magazine__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.grid-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--vp-c-divider);
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.grid-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.grid-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.grid-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid-card__body {
  padding: 0.875rem 1rem;
}

.grid-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
}

.grid-card__category {
  font-weight: 600;
}

.grid-card__date {
  color: var(--vp-c-text-3);
}

/* Footer */
.magazine__footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  margin: 0;
}

.magazine__footer p {
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .magazine__title {
    font-size: 2rem;
  }

  .featured-card__image {
    aspect-ratio: 16 / 10;
  }

  .featured-card__content {
    padding: 1.25rem;
  }

  .featured-card__title {
    font-size: 1.25rem;
  }

  .magazine__secondary {
    grid-template-columns: 1fr;
  }

  .magazine__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .magazine__grid {
    grid-template-columns: 1fr;
  }

  .magazine__categories {
    justify-content: flex-start;
  }
}
</style>
