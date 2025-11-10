<script setup lang="ts">
//@ts-nocheck
import { markRaw, nextTick, ref, watch } from 'vue';
import { VueFlow, useVueFlow, MarkerType, } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';

// layout
import ChatbotPropertyLayout from '@/components/chatbotPropertyLayout.vue'
import ChatbotPreview from '@/components/chatbot-preview.vue'
import ChatbotDeployDialog from '@/pages/chatbot-deploy-dialog.vue'

// node
import StartNode from '@/components/vue-flow/nodes/chatbot-start-node.vue';
import CommonNode from '@/components/vue-flow/nodes/common-node.vue';
import NestedNode from '@/components/vue-flow/nodes/nested-node.vue';

// edge
import EdgeWithButton from '@/components/vue-flow/EdgeWithButton.vue';

import type { Dimensions, Elements } from '@vue-flow/core';

import { useGetImageUrl } from "@/composables/common.js";

const elements = ref<Elements>()
const nodeTypes = {
  start: markRaw(StartNode),
  nested: markRaw(NestedNode),
  blockText: markRaw(CommonNode),
  blockImg: markRaw(CommonNode),
  blockCard: markRaw(CommonNode),
  blockCarouselGroup: markRaw(CommonNode),
  blockIntentGroup: markRaw(CommonNode),
  blockConditionGroup: markRaw(CommonNode),
  // blockAi: markRaw(CommonNode),
  blockResponseai: markRaw(CommonNode),
  blockSetai: markRaw(CommonNode),
  blockApi: markRaw(CommonNode),
  action: markRaw(CommonNode),
  blockCapture: markRaw(CommonNode),
  blockEnd: markRaw(CommonNode),
};

const {
  findNode
  , nodes
  , edges
  , addNodes
  , onNodeClick
  , addEdges
  , updateEdge
  , onEdgeClick
  , getConnectedEdges
  , project
  , vueFlowRef
  , onConnect
  , setNodes
  , setEdges
  , setViewport } =
  useVueFlow({
    nodes: [
      {
        id: '1',
        type: 'start',
        label: 'start',
        position: { x: 25, y: 400 }
      },
    ]
  });

// add edges
onConnect((params) => {
  addEdges({
    ...params,
    type: 'button',
    markerEnd: MarkerType.ArrowClosed,
    connectable: function(edge) {
      // 현재 핸들에 이미 edge가 있는지 확인

      // return !this.edges.some(edge => edge.type === 'target');
      console.log("🚀 ~ onConnect ~ edge:", edge)
    }
  })
});
// node click event
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore, useSelectedEdgeStore } from '@/stores/panelStore.ts';
const storePropertyPanel = usePropertyPanelStore();
const storeChatbotPreview = useChatobtPreviewStore()

const storeSelectedNode = useSelectedNodeStore();
const { inputData, getNodesInfo, getEdgeInfo } = storeSelectedNode;

import { makeNodeStore } from '@/stores/nodeStore.ts';
const storeMakeNode = makeNodeStore();
let { makeNodeId, makeNode } = storeMakeNode;

const selectedEdges = useSelectedEdgeStore()

const addTemporaryClass = () => {
  selectedEdges.selectedEdges.forEach(edge => {
    edge.class = 'selectedEdge';
  });
};

const removeTemporaryClass = () => {
  selectedEdges.selectedEdges.forEach(edge => {
    edge.class = '';
  });
};

onNodeClick(({ node }) => {
  removeTemporaryClass();
  storePropertyPanel.toggleVisible(true);
  selectedEdges.selectedEdges = getConnectedEdges(node.id);
  addTemporaryClass();
  inputData(node);
});


function handlePaneClick() {
  storePropertyPanel.toggleVisible(false);
  removeTemporaryClass();
};

function handleOnDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')
  let nodeData = []
  if(type){
    nodeData = makeNode(type)
  } else {
    console.log('not block!!');
    return;
  }

  const { left, top } = vueFlowRef.value!.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  });

  const newNode = {
    id: (makeNodeId + 1).toString(),
    type,
    position,
    label: `${type} node`,
    data: {
      title: '새로운 노드 #'+makeNodeId.toString()
      , block: [nodeData]
      , shortcut: makeNode('shortcut')
      , nodeColor: '#e4eaef'
    }
  };

  console.log("newNode", newNode);
  addNodes([newNode]);
  makeNodeId = makeNodeId + 1

  getNodesInfo(nodes.value);
  console.log("edges", edges);

  getEdgeInfo(edges.value)

  nextTick(() => {
    const node = findNode(newNode.id)
    const stop = watch(
      () => node!.dimensions,
      (dimensions: Dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0 && node) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2
          }
          stop()
        }
      },
      { deep: true, flush: 'post' }
    )
  });

};
function handleOnDragOver(event: DragEvent) {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
};





// 상단 툴바
const togglePreview = () =>{
  storePropertyPanel.toggleVisible(false);
  storeChatbotPreview.toggleVisible(true);
}

// avatar
const avatarList = ref<[]>([
  { url: '@avatar01.svg' },
  { url: '@avatar02.png' },
  { url: '@avatar03.png' },
])

// 배포하기
const dialogDeploy = ref<boolean>(false)

</script>

<template>
  <!-- toolbar -->
  <div class="flex align-center w-full px-4 py-2 border-b border-gray-200">
    <h2 class="text-[18px] font-bold">
      <v-btn
        prepend-icon="pl-icon20 teletalk"
        variant="text"
        ><span class="text-[16px]">나의 첫번째 챗봇</span></v-btn>
    </h2>

    <div class="flex gap-x-2 align-center ml-auto">
      <!-- share profile -->
      <div>
        <v-avatar
          v-for="item in avatarList" :key="item.id"
          size="34px"
          style="margin-left: -12px;"
          :image=useGetImageUrl(item.url)></v-avatar>
      </div>
      <!-- btn -->
      <v-btn
        class="pl-btn ml-2"
        prepend-icon="pl-icon20 share"
        color="#4f62cd"
        oulined
        @click=""
        variant="tonal">
        <span class="normal-case">공유</span>
      </v-btn>
      <div>
        <v-divider vertical inset color="#000" style="opacity: 1;"></v-divider>
      </div>
      <v-btn
        class="pl-btn"
        prepend-icon="pl-icon20 vars"
        color="#4f62cd"
        oulined
        @click=""
        variant="tonal">
        <span class="normal-case">변수</span>
      </v-btn>
      <v-btn
        class="pl-btn ml-2"
        prepend-icon="pl-icon20 run"
        color="#4f62cd"
        oulined
        @click="togglePreview()"
        variant="tonal">
        <span class="normal-case">실행</span>
      </v-btn>
      <v-btn
        prepend-icon="pl-icon20 reload-white"
        color="#4f62cd"
        class="pl-btn"
        @click="dialogDeploy = true"
        variant="flat">
        배포하기
      </v-btn>
    </div>
  </div>
  <!-- canvas -->
  <div
    class="relative h-[calc(100vh-103px)] w-full"
    id="chatbot-canvas"
    @drop="handleOnDrop"
    @dragover="handleOnDragOver">
    <!-- vu flow -->
    <VueFlow
      v-model="elements"
      :node-types="nodeTypes"
      @paneClick="handlePaneClick"
      style="background-color: #F3F5F4"
    >
      <template #edge-button="buttonEdgeProps">
        <EdgeWithButton
          :id="buttonEdgeProps.id"
          :source-x="buttonEdgeProps.sourceX"
          :source-y="buttonEdgeProps.sourceY"
          :target-x="buttonEdgeProps.targetX"
          :target-y="buttonEdgeProps.targetY"
          :source-position="buttonEdgeProps.sourcePosition"
          :target-position="buttonEdgeProps.targetPosition"
          :marker-end="buttonEdgeProps.markerEnd"
          :style="buttonEdgeProps.style"
        />
      </template>
      <Controls />
      <MiniMap pannable/>
      <Background
        size=2
        gap=20
        patternColor="#D8D8DE" />
    </VueFlow>

  </div>
  <!-- property panel -->
  <ChatbotPropertyLayout />
  <!-- preview -->
  <ChatbotPreview />
  <!-- dialog -->
  <v-dialog
    v-model="dialogDeploy"
    width="auto"
  >
    <ChatbotDeployDialog
      @close="dialogDeploy = false"
    />
  </v-dialog>

</template>

<style>

</style>
