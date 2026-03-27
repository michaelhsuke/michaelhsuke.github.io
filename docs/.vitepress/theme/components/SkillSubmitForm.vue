<script setup lang="ts">
import { ref, computed } from 'vue'

// TODO: 替换为你的 GitHub 仓库信息
const GITHUB_REPO = 'YOUR_USERNAME/YOUR_REPO'

const isOpen = ref(false)
const isSubmitting = ref(false)
const submitted = ref(false)

const form = ref({
  name: '',
  contactType: 'email' as 'email' | 'wechat' | 'github',
  contact: '',
  have: '',
  want: '',
  note: '',
})

const isValid = computed(() => {
  return form.value.name.trim() && form.value.contact.trim() && form.value.have.trim()
})

async function handleSubmit() {
  if (!isValid.value || isSubmitting.value) return

  isSubmitting.value = true
  const title = `[技能登记] ${form.value.name}`
  const contactLabel = form.value.contactType === 'email' ? '邮箱' : form.value.contactType === 'wechat' ? '微信' : 'GitHub'
  const body = `## 基本信息\n\n**昵称**：${form.value.name}\n\n**联系方式**（${contactLabel}）：${form.value.contact}\n\n## 我会的技能\n\n${form.value.have.split(/[,，\n]/).map(s => `- ${s.trim()}`).filter(Boolean).join('\n')}\n\n## 我想学的技能\n\n${form.value.want.split(/[,，\n]/).map(s => `- ${s.trim()}`).filter(Boolean).join('\n')}\n\n${form.value.note ? `## 其他说明\n\n${form.value.note}` : ''}`

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, labels: ['skill-exchange'] }),
    })
    if (res.ok) {
      submitted.value = true
      isOpen.value = false
    }
  } catch {
    // 限流或其他错误，提示用户手动提交
    window.open(`https://github.com/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=skill-exchange`, '_blank')
  } finally {
    isSubmitting.value = false
  }
}

function openForm() {
  submitted.value = false
  form.value = { name: '', contactType: 'email', contact: '', have: '', want: '', note: '' }
  isOpen.value = true
}
</script>

<template>
  <div class="submit-section">
    <button v-if="!isOpen" class="submit-btn" @click="openForm">
      + 登记我的技能
    </button>

    <div v-if="submitted" class="submit-success">
      提交成功！等待审核后即可展示。
    </div>

    <div v-if="isOpen" class="submit-form">
      <h3 class="submit-form__title">登记技能</h3>
      <p class="submit-form__desc">提交后需审核通过才会展示在交换板上</p>

      <div class="submit-form__field">
        <label>昵称 *</label>
        <input v-model="form.name" placeholder="你的昵称" />
      </div>

      <div class="submit-form__field">
        <label>联系方式 *</label>
        <div class="submit-form__row">
          <select v-model="form.contactType">
            <option value="email">邮箱</option>
            <option value="wechat">微信</option>
            <option value="github">GitHub</option>
          </select>
          <input v-model="form.contact" placeholder="你的联系方式" />
        </div>
      </div>

      <div class="submit-form__field">
        <label>我会的技能 *</label>
        <textarea v-model="form.have" placeholder="用逗号分隔，如：Vue3, 摄影, 咖啡" rows="2" />
      </div>

      <div class="submit-form__field">
        <label>我想学的技能</label>
        <textarea v-model="form.want" placeholder="用逗号分隔，如：钢琴, Rust, 剪辑" rows="2" />
      </div>

      <div class="submit-form__field">
        <label>补充说明（可选）</label>
        <textarea v-model="form.note" placeholder="交流时间偏好、城市、其他说明..." rows="2" />
      </div>

      <div class="submit-form__actions">
        <button class="submit-form__cancel" @click="isOpen = false">取消</button>
        <button class="submit-form__submit" :disabled="!isValid || isSubmitting" @click="handleSubmit">
          {{ isSubmitting ? '提交中...' : '提交' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.submit-section {
  margin-bottom: 2rem;
}

.submit-btn {
  padding: 0.625rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-btn:hover {
  background: var(--vp-c-brand-2);
}

.submit-success {
  padding: 0.75rem 1rem;
  background: #f0fdf4;
  color: #16a34a;
  border-radius: 8px;
  font-size: 0.9rem;
}

.submit-form {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.submit-form__title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.submit-form__desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin: 0 0 1.25rem;
}

.submit-form__field {
  margin-bottom: 1rem;
}

.submit-form__field label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
}

.submit-form__field input,
.submit-form__field textarea,
.submit-form__field select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.submit-form__field input:focus,
.submit-form__field textarea:focus,
.submit-form__field select:focus {
  border-color: var(--vp-c-brand-1);
}

.submit-form__field textarea {
  resize: vertical;
}

.submit-form__row {
  display: flex;
  gap: 0.5rem;
}

.submit-form__row select {
  width: 100px;
  flex-shrink: 0;
}

.submit-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.submit-form__cancel {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.submit-form__submit {
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-form__submit:not(:disabled):hover {
  background: var(--vp-c-brand-2);
}
</style>
