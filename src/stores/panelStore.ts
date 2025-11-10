
//@ts-nocheck
import { defineStore } from 'pinia'
import { ref } from 'vue'

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.
export const usePropertyPanelStore = defineStore('propertyPanel', () => {
  const isVisible = ref<boolean>(false);

  function toggleVisible(state: boolean) {
    isVisible.value = state;
  }

  return { isVisible, toggleVisible }
})

export const useChatobtPreviewStore = defineStore('chatbotPreview', () => {
  const isVisible = ref<boolean>(false);

  function toggleVisible(state: boolean) {
    isVisible.value = state;
  }

  return { isVisible, toggleVisible }
})

export const useSelectedNodeStore = defineStore('selectedNode', () => {
  const nodeData = ref<object>({});

  const allNode = ref<string[]>([]);
  const allEdge = ref<string[]>([]);

  const btnId = ref<number>(0);

  function inputData(data: object) {
    nodeData.value = data;
  }

  function getNodesInfo(data) {
    allNode.value = data;
  }

  function getEdgeInfo(data) {
    allEdge.value = data;
  }

  return { nodeData, allNode, allEdge, btnId, inputData, getNodesInfo, getEdgeInfo }
})

export const useSelectedEdgeStore = defineStore('selectedEdges', () => {

  const selectedEdges = ref<string[]>([])

  function changeEdgeInfo(data) {
    selectedEdges.value = data;
  }


  return { selectedEdges, changeEdgeInfo }
})

