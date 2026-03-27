<script setup lang="ts">
import { computed } from 'vue'
import { data as profile } from '../../utils/skills'
import { data as posts } from '../../utils/posts.data'
import SkillCard from './SkillCard.vue'

// 统计每个技能关联的文章数
const postCountMap = computed(() => {
  const map: Record<string, number> = {}
  for (const post of posts) {
    if (post.skills) {
      for (const skill of post.skills) {
        map[skill] = (map[skill] || 0) + 1
      }
    }
  }
  return map
})
</script>

<template>
  <div class="skills-profile">
    <!-- 我会的 -->
    <section class="skills-section">
      <h2 class="skills-section__title">我会的</h2>
      <p class="skills-section__desc">以下技能可以交流，也接受相关咨询</p>
      <div class="skills-grid">
        <SkillCard
          v-for="skill in profile.have"
          :key="skill.name"
          :skill="skill"
          :post-count="postCountMap[skill.name]"
        />
      </div>
    </section>

    <!-- 我想学的 -->
    <section class="skills-section">
      <h2 class="skills-section__title">我想学的</h2>
      <p class="skills-section__desc">如果你擅长以下技能，欢迎交流</p>
      <div class="skills-grid">
        <SkillCard
          v-for="skill in profile.want"
          :key="skill.name"
          :skill="skill"
          :post-count="postCountMap[skill.name]"
        />
      </div>
    </section>

    <!-- 联系方式 -->
    <section v-if="profile.contact" class="skills-contact">
      <div class="skills-contact__inner">
        <p class="skills-contact__text">{{ profile.contact }}</p>
      </div>
    </section>

    <!-- 相关文章（按技能分组） -->
    <section class="skills-section">
      <h2 class="skills-section__title">相关教程与文章</h2>
      <div class="skills-posts">
        <template v-for="skill in profile.have" :key="skill.name">
          <div v-if="postCountMap[skill.name]" :id="encodeURIComponent(skill.name)" class="skills-posts__group">
            <h3 class="skills-posts__group-title">
              {{ skill.icon }} {{ skill.name }}
            </h3>
            <ul class="skills-posts__list">
              <li v-for="post in posts.filter(p => p.skills?.includes(skill.name))" :key="post.url">
                <a :href="post.url" class="skills-posts__link">
                  {{ post.title }}
                  <span v-if="post.tutorial" class="skills-posts__badge">教程</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.skills-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

.skills-section {
  margin-bottom: 2.5rem;
}

.skills-section__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.375rem;
}

.skills-section__desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 0 0 1.25rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.skills-contact__inner {
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.skills-contact__text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.skills-posts__group {
  margin-bottom: 1.5rem;
}

.skills-posts__group-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.skills-posts__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.skills-posts__list li {
  padding: 0.25rem 0;
}

.skills-posts__link {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.skills-posts__link:hover {
  color: var(--vp-c-brand-1);
}

.skills-posts__badge {
  font-size: 0.65rem;
  padding: 1px 5px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 0.75rem;
  }
}
</style>
