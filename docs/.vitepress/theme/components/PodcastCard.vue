<script setup lang="ts">
defineProps<{
  title: string
  cover?: string
  platform?: string
  link?: string
  description?: string
}>()

const platformMap: Record<string, string> = {
  xiaoyuzhou: '小宇宙',
  apple: 'Apple Podcasts',
  spotify: 'Spotify',
  ximalaya: '喜马拉雅',
  netease: '网易云音乐',
}
</script>

<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="podcast-card"
  >
    <div v-if="cover" class="podcast-card__cover">
      <img :src="cover" :alt="title" loading="lazy" />
    </div>
    <div class="podcast-card__content">
      <div class="podcast-card__title">{{ title }}</div>
      <p v-if="description" class="podcast-card__desc">{{ description }}</p>
      <div class="podcast-card__meta">
        <span v-if="platform" class="podcast-card__platform">{{ platformMap[platform] || platform }}</span>
        <span class="podcast-card__link-text">收听 →</span>
      </div>
    </div>
  </a>
  <div v-else class="podcast-card">
    <div v-if="cover" class="podcast-card__cover">
      <img :src="cover" :alt="title" loading="lazy" />
    </div>
    <div class="podcast-card__content">
      <div class="podcast-card__title">{{ title }}</div>
      <p v-if="description" class="podcast-card__desc">{{ description }}</p>
      <div v-if="platform" class="podcast-card__meta">
        <span class="podcast-card__platform">{{ platformMap[platform] || platform }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.podcast-card {
  display: flex;
  gap: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  padding: 1rem;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  text-decoration: none;
  color: inherit;
  margin: 1rem 0;
}

.podcast-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.podcast-card__cover {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.podcast-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.podcast-card__content {
  flex: 1;
  min-width: 0;
}

.podcast-card__title {
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.podcast-card__desc {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.podcast-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.podcast-card__platform {
  font-size: 0.7rem;
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.podcast-card__link-text {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
