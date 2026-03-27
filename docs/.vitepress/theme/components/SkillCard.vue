<script setup lang="ts">
import type { Skill } from '../../utils/skills'

defineProps<{
  skill: Skill
  postCount?: number
}>()

const levelLabels: Record<number, string> = {
  1: '了解',
  2: '入门',
  3: '熟练',
  4: '精通',
  5: '专家',
}

function stars(level: number): string {
  return '★'.repeat(level) + '☆'.repeat(5 - level)
}
</script>

<template>
  <a
    :href="`/skills/#${encodeURIComponent(skill.name)}`"
    class="skill-card"
  >
    <div class="skill-card__header">
      <span v-if="skill.icon" class="skill-card__icon">{{ skill.icon }}</span>
      <span class="skill-card__name">{{ skill.name }}</span>
    </div>
    <div class="skill-card__level" :title="`${levelLabels[skill.level]} (${skill.level}/5)`">
      {{ stars(skill.level) }}
    </div>
    <div v-if="postCount !== undefined" class="skill-card__count">
      {{ postCount }} 篇相关内容
    </div>
  </a>
</template>

<style scoped>
.skill-card {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
  min-width: 120px;
}

.skill-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: var(--vp-c-brand-1);
}

.skill-card__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-card__icon {
  font-size: 1.25rem;
}

.skill-card__name {
  font-weight: 600;
  font-size: 0.95rem;
}

.skill-card__level {
  color: #f59e0b;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.skill-card__count {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}
</style>
