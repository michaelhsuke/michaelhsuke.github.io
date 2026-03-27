<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../utils/posts.data'

const props = defineProps<{
  category?: string
  title?: string
  description?: string
}>()

const filtered = computed(() => {
  if (!props.category) return posts
  return posts.filter((p) => p.category === props.category)
})
</script>

<template>
  <div class="post-list">
    <div v-if="title" class="post-list__header">
      <h1>{{ title }}</h1>
      <p v-if="description" class="post-list__desc">{{ description }}</p>
    </div>

    <div v-if="filtered.length === 0" class="post-list__empty">
      暂无内容，敬请期待...
    </div>

    <div v-else class="post-list__grid">
      <a
        v-for="post in filtered"
        :key="post.url"
        :href="post.url"
        class="post-card"
      >
        <div v-if="post.cover" class="post-card__cover">
          <img :src="post.cover" :alt="post.title" loading="lazy" />
        </div>
        <div class="post-card__body">
          <h3 class="post-card__title">{{ post.title }}</h3>
          <p v-if="post.excerpt" class="post-card__excerpt">{{ post.excerpt }}</p>
          <div class="post-card__meta">
            <span v-if="post.date" class="post-card__date">{{ post.date }}</span>
            <span v-if="post.category" class="post-card__category">{{ post.category }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

.post-list__header {
  margin-bottom: 2rem;
}

.post-list__header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.post-list__desc {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0;
}

.post-list__empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.post-list__grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  display: flex;
  gap: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.post-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: var(--vp-c-brand-1);
}

.post-card__cover {
  flex-shrink: 0;
  width: 160px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.post-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-card__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 0.375rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__excerpt {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.post-card__category {
  padding: 1px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

@media (max-width: 640px) {
  .post-card {
    flex-direction: column;
  }

  .post-card__cover {
    width: 100%;
    height: 160px;
  }
}
</style>
