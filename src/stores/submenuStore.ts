
//@ts-nocheck
import { defineStore } from 'pinia'
import { ref } from 'vue'


// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.
export const useSubmenuStore = defineStore('submenu', () => {
  // 임시 초기메뉴 값
  const submenuList = ref<[]>([
    {
      name: '워크스페이스',
      icon: 'home',
      link: '/home',
      sublist: [
        { name: 'My 에이전트', icon: 'home-dashboard', link: '/home', },
        { name: '지식 카탈로그', icon: 'home-catalogue', link: '/homeCatalogue', },
        { name: '프롬프트', icon: 'home-prompt', link: '/homePrompt', },
        { name: '북마크', icon: 'home-bookmark', link: '/homeBookmark', },
      ]
    },
    {
      name: 'ARS 플로우 빌드',
      icon: 'ars',
      link: '/ars',
      class: 'mt-[10px]',
    },
    {
      name: '에이전트',
      icon: 'chatbot',
      link: '/chatbot'
    },
    {
      name: '라이브러리',
      icon: 'ai-agent',
      link: '/libraryCompo',
      sublist: [
        { name: '컴포넌트', icon: 'agent-component', link: '/libraryCompo', },
        { name: '변수관리', icon: 'agent-vars', link: '/libraryVarsManage', },
        { name: '인텐트 관리', icon: 'agent-intent', link: '/libraryIntentManage', },
        { name: '엔티티 관리', icon: 'agent-entity', link: '/libraryEntityManage', },
      ]

    },
    {
      name: 'Generative AI',
      icon: 'gen-ai',
      link: '/genai'
    },
    {
      name: '애널리틱스',
      icon: 'cs-assistant',
      sublist: [
        { name: '대시보드', icon: 'cs-dashboard', link: '/', },
        { name: '대화분석', icon: 'cs-converse', link: '/', },
        { name: '피드백 분석', icon: 'cs-feedback', link: '/', },
        { name: '트랜잭션', icon: 'cs-transaction', link: '/', },
        { name: '봇 로그', icon: 'cs-bot', link: '/', },
      ]
    },
    {
      name: '설정',
      icon: 'setting',
      link: '/settingAgent',
      sublist: [
        { name: '에이전트 관리', icon: 'setting-agent', link: '/settingAgent', },
        { name: '채널 연동', icon: 'setting-channel', link: '/settingChannelSync', },
        { name: '학습 관리', icon: 'setting-edu', link: '/',
          children: [
            { name: '학습 진행 현황', link: '/' },
            { name: '수집 관리', link: '/' },
            { name: '학습 관리', link: '/' },
            { name: '학습 결과 관리', link: '/' },
          ]
        },
        { name: '색인 관리', icon: 'setting-index', link: '/', },
        { name: '시스템 관리', icon: 'setting-system', link: '/', }
      ]
    },
    {
      name: '사용자 가이드',
      icon: 'cs-guide',
      link: '/',
      class: 'mt-[370px]',
    },
    {
      name: '기술지원',
      icon: 'support-book',
      link: '/',
    },
  ])

  const currentSubmenu = ref<array>()

  const selectedSub = ref<string>()

  return { submenuList, currentSubmenu, selectedSub }
})

