<script setup lang="ts">
defineProps<{
  platform: 'bilibili' | 'youtube' | 'douyin'
  bvid?: string
  youtubeId?: string
  videoUrl?: string
}>()

function getEmbedUrl(platform: string, props: Record<string, string | undefined>): string {
  switch (platform) {
    case 'bilibili':
      return `https://player.bilibili.com/player.html?bvid=${props.bvid}&high_quality=1&autoplay=0`
    case 'youtube':
      return `https://www.youtube.com/embed/${props.youtubeId}`
    default:
      return ''
  }
}
</script>

<template>
  <div class="video-embed">
    <div class="video-embed__wrapper">
      <iframe
        v-if="platform === 'bilibili' && bvid"
        :src="getEmbedUrl(platform, { bvid })"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        loading="lazy"
      />
      <iframe
        v-else-if="platform === 'youtube' && youtubeId"
        :src="getEmbedUrl(platform, { youtubeId })"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      />
      <a
        v-else-if="videoUrl"
        :href="videoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="video-embed__external"
      >
        <span>点击观看视频</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.video-embed {
  margin: 1.5rem 0;
}

.video-embed__wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  border-radius: 12px;
  overflow: hidden;
  background: #000;
}

.video-embed__wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-embed__external {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}

.video-embed__external:hover {
  background: var(--vp-c-brand-soft);
}
</style>
