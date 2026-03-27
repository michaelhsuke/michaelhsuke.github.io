<script setup lang="ts">
defineProps<{
  platform?: 'taobao' | 'jd' | 'pdd'
}>()

const labelMap: Record<string, string> = {
  taobao: '广告',
  jd: '推广',
  pdd: '推广',
}
</script>

<template>
  <span class="affiliate-badge">
    {{ platform ? labelMap[platform] || '推广' : '推广' }}
  </span>
</template>

<style scoped>
.affiliate-badge {
  display: inline-block;
  font-size: 0.7rem;
  padding: 1px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  vertical-align: middle;
  line-height: 1.6;
}
</style>
