<script setup lang="ts">
defineProps<{
  title: string
  image?: string
  price?: string
  platform?: string
  link?: string
}>()

const platformMap: Record<string, string> = {
  jd: '京东',
  taobao: '淘宝',
  pdd: '拼多多',
  amazon: 'Amazon',
}
</script>

<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener noreferrer nofollow"
    class="cps-card"
  >
    <div v-if="image" class="cps-card__image">
      <img :src="image" :alt="title" loading="lazy" />
    </div>
    <div class="cps-card__content">
      <div class="cps-card__title">{{ title }}</div>
      <div class="cps-card__meta">
        <span v-if="price" class="cps-card__price">¥{{ price }}</span>
        <span v-if="platform" class="cps-card__platform">{{ platformMap[platform] || platform }}</span>
      </div>
      <span class="cps-card__badge">推广</span>
    </div>
  </a>
  <div v-else class="cps-card">
    <div v-if="image" class="cps-card__image">
      <img :src="image" :alt="title" loading="lazy" />
    </div>
    <div class="cps-card__content">
      <div class="cps-card__title">{{ title }}</div>
      <div class="cps-card__meta">
        <span v-if="price" class="cps-card__price">¥{{ price }}</span>
        <span v-if="platform" class="cps-card__platform">{{ platformMap[platform] || platform }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cps-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  text-decoration: none;
  color: inherit;
  margin: 1.5rem 0;
}

.cps-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.cps-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.cps-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cps-card__content {
  padding: 1rem 1.25rem;
  position: relative;
}

.cps-card__title {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.cps-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.cps-card__price {
  color: #ef4444;
  font-weight: 700;
}

.cps-card__platform {
  color: var(--vp-c-text-2);
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.cps-card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  padding: 2px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
}
</style>
