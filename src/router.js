import { createRouter, createWebHashHistory } from 'vue-router'

// Layouts
import defaultLayout from './layouts/defaultLayout.vue'
import contentLayout from './layouts/contentLayout.vue'
import contentLayout2 from './layouts/contentLayout2.vue'
import noLayout from './layouts/noLayout.vue'
import playgroundLayout from './layouts/playgroundLayout.vue'

// Pages
import Login from './pages/Login.vue'

// 워크스페이스
import Home from './pages/Home.vue'
import HomeCatalogue from './pages/Home-catalogue.vue'
import HomePrompt from './pages/Home-prompt.vue'
import HomeBookmark from './pages/Home-bookmark.vue'


import ArsFlowBuilder from './pages/ArsFlowBuilder.vue'
import ChatbotBulider from './pages/ChatbotBulider.vue'
import SettingAgent from './pages/SettingAgent.vue'
import SettingChannelSync from './pages/SettingChannelSync.vue'
import GenAi from './pages/Genai.vue'
import LibraryCompo from './pages/LibraryCompo.vue'
import LibraryVarsManage from './pages/LibraryVarsManage.vue'
import LibraryIntentManage from './pages/LibraryIntentManage.vue'
import LibraryEntityManage from './pages/LibraryEntityManage.vue'

import PlaygroundHome from './pages/Playground-home.vue'

const routes = [
  {
    path: '/',
    component: Login,
    meta: { layout: noLayout,  }
  },
  // 플레이그라운드
  {
    path: '/playground',
    component: PlaygroundHome,
    meta: { layout: playgroundLayout, base: 'playground' }
  },

  // 워크스페이스
  {
    path: '/home',
    name: 'My 에이전트',
    component: Home,
    meta: { layout: contentLayout, parentName: '워크스페이스', width: 'content', base: 'workspace' }
  },
  {
    path: '/homeCatalogue',
    name: '지식 카탈로그',
    component: HomeCatalogue,
    meta: { layout: contentLayout, parentName: '워크스페이스', width: 'content', base: 'workspace' }
  },
  {
    path: '/homePrompt',
    name: '프롬프트',
    component: HomePrompt,
    meta: { layout: contentLayout, parentName: '워크스페이스', width: 'content', base: 'workspace' }
  },
  {
    path: '/homeBookmark',
    name: '북마크',
    component: HomeBookmark,
    meta: { layout: contentLayout, parentName: '워크스페이스', width: 'content', base: 'workspace' }
  },

  // 설정
  {
    path: '/settingAgent',
    name: '에이전트 관리',
    component: SettingAgent,
    meta: { layout: contentLayout, parentName: '설정', width: 'content', base: 'workspace'}
  },
  {
    path: '/settingChannelSync',
    name: '채널 연동',
    component: SettingChannelSync,
    meta: { layout: contentLayout, parentName: '설정' , width: 'content', base: 'workspace'}
  },

  // ars
  {
    path: '/ars',
    component: ArsFlowBuilder,
    meta: { layout: defaultLayout, width: 'default' , base: 'workspace'}
  },

  // 에이전트
  {
    path: '/chatbot',
    name: '에이전트',
    component: ChatbotBulider,
    meta: { layout: defaultLayout, width: 'default' , base: 'workspace'}
  },

  // Generate Ai
  {
    path: '/genai',
    name: 'Generate Ai',
    component: GenAi,
    meta: { layout: contentLayout2, parentName: 'Generative AI', width: 'content2', base: 'workspace'}
  },

  // 라이브러리
  {
    path: '/libraryCompo',
    name: '컴포넌트',
    component: LibraryCompo,
    meta: { layout: contentLayout, parentName: '라이브러리', width: 'content', base: 'workspace'}
  },
  {
    path: '/libraryVarsManage',
    name: '변수 관리',
    component: LibraryVarsManage,
    meta: { layout: contentLayout, parentName: '라이브러리', width: 'content', base: 'workspace'}
  },
  {
    path: '/libraryIntentManage',
    name: '인텐트 관리',
    component: LibraryIntentManage,
    meta: { layout: contentLayout, parentName: '라이브러리', width: 'content', base: 'workspace'}
  },
  {
    path: '/libraryEntityManage',
    name: '엔티티 관리',
    component: LibraryEntityManage,
    meta: { layout: contentLayout, parentName: '라이브러리', width: 'content', base: 'workspace'}
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router