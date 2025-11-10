
//@ts-nocheck
import { defineStore } from 'pinia'
import { ref } from 'vue'

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.
export const useActionStore = defineStore('action', () => {
  const actionList = ref<Element>([
    { icon: 'actionNodeLink', title: '노드연결', value: 1 },
    { icon: 'actionUrlLink', title: 'URL링크', value: 2 },
    { icon: 'actionMsg', title: '메시지전송', value: 3 },
    { icon: 'actionPhone', title: '전화', value: 4 },
    { icon: 'actionManager', title: '상담사 연결', value: 5 },
    { icon: 'actionQuit', title: '종료', value: 6 },
    { icon: 'actionVars', title: '변수 설정', value: 7, class: 'border-t' },
    { icon: 'actionApi', title: 'API', value: 8 },
  ]);

  return { actionList }
})

