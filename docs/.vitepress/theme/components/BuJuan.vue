<script setup lang="ts">
import { ref, onMounted } from 'vue'

const pv = ref('--')
const uv = ref('--')

onMounted(() => {
  // 不蒜子通过全局脚本加载，手动获取数据
  const fetchBusuanzi = () => {
    // @ts-expect-error busuanzi global
    if (window.busuanzi?.fetch) {
      // @ts-expect-error busuanzi global
      window.busuanzi.fetch()
    }
  }

  // 等待不蒜子脚本加载
  const timer = setInterval(() => {
    // @ts-expect-error busuanzi global
    if (window.busuanzi) {
      clearInterval(timer)
      fetchBusuanzi()
      // @ts-expect-error busuanzi element
      const pvEl = document.getElementById('busuanzi_value_site_pv')
      // @ts-expect-error busuanzi element
      const uvEl = document.getElementById('busuanzi_value_site_uv')
      if (pvEl) {
        const observer = new MutationObserver(() => {
          pv.value = pvEl.textContent || '--'
        })
        observer.observe(pvEl, { childList: true })
        pv.value = pvEl.textContent || '--'
      }
      if (uvEl) {
        const observer = new MutationObserver(() => {
          uv.value = uvEl.textContent || '--'
        })
        observer.observe(uvEl, { childList: true })
        uv.value = uvEl.textContent || '--'
      }
    }
  }, 500)
  setTimeout(() => clearInterval(timer), 5000)
})
</script>

<template>
  <span class="bujuan" aria-label="访问统计">
    <span id="busuanzi_container_site_pv" style="display:none"></span>
    <span id="busuanzi_value_site_pv" style="display:none"></span>
    <span id="busuanzi_container_site_uv" style="display:none"></span>
    <span id="busuanzi_value_site_uv" style="display:none"></span>
    <span class="bujuan__item">
      <span class="bujuan__label">访问</span>
      <span class="bujuan__value">{{ pv }}</span>
    </span>
  </span>
</template>

<style scoped>
.bujuan {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.bujuan__label {
  margin-right: 0.125rem;
}

.bujuan__value {
  font-weight: 500;
}
</style>
