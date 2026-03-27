<script setup lang="ts">
import type { CommunityMember } from '../../utils/community-skills'

defineProps<{
  member: CommunityMember
}>()

function maskContact(contact: string, type: string): string {
  if (type === 'email') {
    const [local, domain] = contact.split('@')
    return `${local[0]}***@${domain}`
  }
  if (type === 'wechat') {
    return contact[0] + '***'
  }
  return contact
}
</script>

<template>
  <div class="member-card">
    <div class="member-card__header">
      <img
        v-if="member.avatar"
        :src="member.avatar"
        :alt="member.name"
        class="member-card__avatar"
        loading="lazy"
      />
      <div v-else class="member-card__avatar member-card__avatar--placeholder">
        {{ member.name[0] }}
      </div>
      <div class="member-card__info">
        <div class="member-card__name">{{ member.name }}</div>
        <div class="member-card__date">{{ member.date }}</div>
      </div>
    </div>

    <div class="member-card__body">
      <div class="member-card__section">
        <span class="member-card__label member-card__label--have">我会</span>
        <div class="member-card__tags">
          <span v-for="skill in member.have" :key="skill" class="member-card__tag member-card__tag--have">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="member-card__section">
        <span class="member-card__label member-card__label--want">想学</span>
        <div class="member-card__tags">
          <span v-for="skill in member.want" :key="skill" class="member-card__tag member-card__tag--want">
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <div class="member-card__footer">
      <span class="member-card__contact-type">
        {{ member.contactType === 'email' ? '邮箱' : member.contactType === 'wechat' ? '微信' : 'GitHub' }}
      </span>
      <span class="member-card__contact">{{ maskContact(member.contact, member.contactType) }}</span>
    </div>
  </div>
</template>

<style scoped>
.member-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.member-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: var(--vp-c-brand-1);
}

.member-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.member-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.member-card__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 1rem;
}

.member-card__name {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3;
}

.member-card__date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.member-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.member-card__section {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.member-card__label {
  flex-shrink: 0;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
  line-height: 1.6;
}

.member-card__label--have {
  background: #dcfce7;
  color: #16a34a;
}

.member-card__label--want {
  background: #fef3c7;
  color: #d97706;
}

.member-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.member-card__tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  line-height: 1.5;
}

.member-card__tag--have {
  background: #f0fdf4;
  color: #15803d;
}

.member-card__tag--want {
  background: #fffbeb;
  color: #b45309;
}

.member-card__footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.member-card__contact-type {
  padding: 1px 5px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
}

.member-card__contact {
  color: var(--vp-c-text-2);
}
</style>
