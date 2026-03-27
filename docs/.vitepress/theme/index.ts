import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '../styles/index.css'

import CpsCard from './components/CpsCard.vue'
import VideoEmbed from './components/VideoEmbed.vue'
import PodcastCard from './components/PodcastCard.vue'
import AffiliateBadge from './components/AffiliateBadge.vue'
import BuJuan from './components/BuJuan.vue'
import PostList from './components/PostList.vue'
import SkillTag from './components/SkillTag.vue'
import SkillCard from './components/SkillCard.vue'
import SkillsProfile from './components/SkillsProfile.vue'
import CommunitySkillCard from './components/CommunitySkillCard.vue'
import SkillSubmitForm from './components/SkillSubmitForm.vue'
import ExchangeBoard from './components/ExchangeBoard.vue'
import MagazineHome from './components/MagazineHome.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CpsCard', CpsCard)
    app.component('VideoEmbed', VideoEmbed)
    app.component('PodcastCard', PodcastCard)
    app.component('AffiliateBadge', AffiliateBadge)
    app.component('BuJuan', BuJuan)
    app.component('PostList', PostList)
    app.component('SkillTag', SkillTag)
    app.component('SkillCard', SkillCard)
    app.component('SkillsProfile', SkillsProfile)
    app.component('CommunitySkillCard', CommunitySkillCard)
    app.component('SkillSubmitForm', SkillSubmitForm)
    app.component('ExchangeBoard', ExchangeBoard)
    app.component('MagazineHome', MagazineHome)
  },
} satisfies Theme
