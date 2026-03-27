---
title: 从零搭建一个 Vue3 组合式函数库
date: 2026-03-27
category: 工具效率
tags: [教程, Vue3, TypeScript, 前端]
skills: [Vue3, TypeScript, Vite]
tutorial: true
cover: /images/vue3-composables.jpg
---

# 从零搭建一个 Vue3 组合式函数库

组合式函数（Composables）是 Vue3 最强大的特性之一。本文手把手带你从零搭建一个可复用的 Composable 库。

<SkillTag :skills="['Vue3', 'TypeScript', 'Vite']" />

## 什么是组合式函数

组合式函数是利用 Vue3 的响应式 API 封装的、有状态逻辑的函数。类似于 React 的 Hooks，但更灵活。

```ts
// 一个简单的计数器 composable
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)

  const increment = () => count.value++
  const decrement = () => count.value--

  return { count, increment, decrement }
}
```

## 项目初始化

用 Vite 创建一个 TypeScript 库项目：

```bash
npm create vite@latest my-composables -- --template vue-ts
cd my-composables
```

推荐的项目结构：

```
src/
├── composables/
│   ├── useCounter.ts
│   ├── useStorage.ts
│   ├── useMouse.ts
│   └── index.ts        # 统一导出
└── index.ts            # 库入口
```

## 实战：3 个实用的组合式函数

### 1. useStorage — 响应式 localStorage

将 localStorage 和 Vue 响应式系统结合，数据变化自动持久化：

```ts
import { ref, watch } from 'vue'

export function useStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}
```

### 2. useMouse — 实时鼠标位置追踪

```ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

### 3. useDebounce — 防抖工具

```ts
import { ref } from 'vue'

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  return debounced
}
```

## 发布到 npm

配置 `vite.config.ts` 使用库模式构建：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyComposables',
      fileName: 'my-composables',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
```

```bash
npm run build
npm publish
```

## 最佳实践

1. **命名规范**：始终以 `use` 开头，如 `useCounter`、`useStorage`
2. **参数默认值**：提供合理的默认值，降低使用门槛
3. **类型安全**：善用泛型，让 TypeScript 帮你做类型推导
4. **清理副作用**：在 `onUnmounted` 中清除事件监听、定时器等
5. **单一职责**：每个 Composable 只做一件事

---

> 以上就是搭建 Vue3 Composable 库的完整流程。核心思想是：**把有状态的逻辑抽离成可复用的函数**，让组件保持简洁。

<SkillTag :skills="['Vue3', 'TypeScript', 'Vite']" />
