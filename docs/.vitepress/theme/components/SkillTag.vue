<script setup lang="ts">
defineProps<{
  skills: string[]
}>()
</script>

<template>
  <div class="skill-tags">
    <a
      v-for="skill in skills"
      :key="skill"
      :href="`/skills/#${encodeURIComponent(skill)}`"
      class="skill-tag"
    >
      {{ skill }}
    </a>
  </div>
</template>

<style scoped>
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.skill-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.2s ease;
  line-height: 1.6;
}

.skill-tag:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}
</style>
