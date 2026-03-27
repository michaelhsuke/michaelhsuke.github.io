<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as members } from '../../utils/community-skills'
import CommunitySkillCard from './CommunitySkillCard.vue'
import SkillSubmitForm from './SkillSubmitForm.vue'

type FilterType = 'all' | 'have' | 'want'
type FilterValue = 'all' | string

const filterType = ref<FilterType>('all')
const filterValue = ref<FilterValue>('all')

// 收集所有出现的技能
const allHaveSkills = computed(() => {
  const set = new Set<string>()
  members.forEach(m => m.have.forEach(s => set.add(s)))
  return [...set].sort()
})

const allWantSkills = computed(() => {
  const set = new Set<string>()
  members.forEach(m => m.want.forEach(s => set.add(s)))
  return [...set].sort()
})

const filtered = computed(() => {
  if (filterValue.value === 'all') return members
  if (filterType.value === 'have') {
    return members.filter(m => m.have.includes(filterValue.value))
  }
  return members.filter(m => m.want.includes(filterValue.value))
})

function setFilter(type: FilterType, value: FilterValue) {
  filterType.value = type
  filterValue.value = value
}
</script>

<template>
  <div class="exchange-board">
    <SkillSubmitForm />

    <!-- 筛选栏 -->
    <div v-if="members.length > 0" class="exchange-board__filter">
      <span class="filter-label">筛选：</span>
      <button
        class="filter-btn"
        :class="{ 'filter-btn--active': filterValue === 'all' }"
        @click="setFilter('all', 'all')"
      >
        全部
      </button>
      <template v-if="allHaveSkills.length">
        <span class="filter-divider">我会：</span>
        <button
          v-for="skill in allHaveSkills"
          :key="'h-' + skill"
          class="filter-btn filter-btn--have"
          :class="{ 'filter-btn--active': filterType === 'have' && filterValue === skill }"
          @click="setFilter('have', skill)"
        >
          {{ skill }}
        </button>
      </template>
      <template v-if="allWantSkills.length">
        <span class="filter-divider">想学：</span>
        <button
          v-for="skill in allWantSkills"
          :key="'w-' + skill"
          class="filter-btn filter-btn--want"
          :class="{ 'filter-btn--active': filterType === 'want' && filterValue === skill }"
          @click="setFilter('want', skill)"
        >
          {{ skill }}
        </button>
      </template>
    </div>

    <!-- 成员列表 -->
    <div v-if="filtered.length > 0" class="exchange-board__grid">
      <CommunitySkillCard
        v-for="member in filtered"
        :key="member.id"
        :member="member"
      />
    </div>

    <div v-else class="exchange-board__empty">
      <div class="exchange-board__empty-icon">🤝</div>
      <p v-if="filterValue !== 'all'" class="exchange-board__empty-text">
        没有匹配「{{ filterValue }}」的成员
      </p>
      <template v-else>
        <p class="exchange-board__empty-text">还没有人登记技能</p>
        <p class="exchange-board__empty-hint">成为第一个登记技能的人吧！</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.exchange-board {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

.exchange-board__filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 0.8rem;
}

.filter-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.filter-divider {
  color: var(--vp-c-text-3);
  margin-left: 0.25rem;
}

.filter-btn {
  padding: 3px 8px;
  font-size: 0.75rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

.filter-btn:hover {
  background: var(--vp-c-bg);
}

.filter-btn--active {
  color: #fff;
}

.filter-btn--have.filter-btn--active {
  background: #16a34a;
}

.filter-btn--want.filter-btn--active {
  background: #d97706;
}

.exchange-board__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.exchange-board__empty {
  text-align: center;
  padding: 3rem 0;
}

.exchange-board__empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.exchange-board__empty-text {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  margin: 0 0 0.375rem;
}

.exchange-board__empty-hint {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 640px) {
  .exchange-board__grid {
    grid-template-columns: 1fr;
  }

  .exchange-board__filter {
    gap: 0.25rem;
  }
}
</style>
