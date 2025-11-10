<script setup lang="ts">
//@ts-nocheck
import { markRaw, nextTick, ref, watch } from 'vue';
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';

import StartNode from '@/components/vue-flow/nodes/start-node.vue';
import EndNode from '@/components/vue-flow/nodes/end-node.vue';
import LLMNode from '@/components/vue-flow/nodes/LLM-node.vue';
import CodeNode from '@/components/vue-flow/nodes/code-node.vue';
import KnowledgeNode from '@/components/vue-flow/nodes/knowledge-node.vue';
import ApiNode from '@/components/vue-flow/nodes/api-node.vue';
import NestedNode from '@/components/vue-flow/nodes/nested-node.vue';
import CommonNode from '@/components/vue-flow/nodes/common-node.vue';

import EdgeWithButton from '@/components/vue-flow/EdgeWithButton.vue';


import type { Dimensions, Elements } from '@vue-flow/core';

const elements = ref<Elements>()
const nodeTypes = {
  start: markRaw(StartNode),
  end: markRaw(EndNode),
  LLM: markRaw(LLMNode),
  code: markRaw(CodeNode),
  knowledge: markRaw(KnowledgeNode),
  nested: markRaw(NestedNode),
  commonNode: markRaw(CommonNode),
  api: markRaw(ApiNode)
};

const { findNode, nodes, addNodes, onNodeClick, addEdges, getConnectedEdges, project, vueFlowRef, onConnect, setNodes, setEdges, setViewport, onNodesChange } =
  useVueFlow({
    nodes: [
      {
        id: '1',
        type: 'start',
        label: 'start',
        position: { x: 25, y: 400 }
      },
      {
        id: '2',
        type: 'end',
        label: '종료',
        position: { x: 1000, y: 400 }
      }
    ]
  });

// add edges
onConnect((params) => {
  addEdges({
    ...params,
    type: 'button',
    data: { text: 'custom edge' },
    markerEnd: MarkerType.ArrowClosed,
    // style: 'stroke: #3b81e7'
  })
});
// node click event
import { usePropertyPanelStore, useSelectedNodeStore } from '@/stores/panelStore.ts';
const storePropertyPanel = usePropertyPanelStore();

const storeSelectedNode = useSelectedNodeStore();
const { inputData, getNodesInfo } = storeSelectedNode;
const selectedEdges = ref([]);

const addTemporaryClass = () => {
  selectedEdges.value.forEach(edge => {
    edge.class = 'selectedEdge';
  });
};

const removeTemporaryClass = () => {
  selectedEdges.value.forEach(edge => {
    edge.class = '';

  });
};

onNodeClick(({ node }) => {
  console.log("🚀 ~ onNodeDoubleClick ~ node:", node);
  removeTemporaryClass();
  storePropertyPanel.toggleVisible(true);
  selectedEdges.value = getConnectedEdges(node.id);
  console.log("🚀 ~ onNodeClick ~ selectedEdges.value:", selectedEdges.value)
  addTemporaryClass();
  inputData(node);
});

function handlePaneClick() {
  console.log('바닥 클릭 이벤트:');
  storePropertyPanel.toggleVisible(false);
  removeTemporaryClass();
};

function handleOnDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')
  let nodeData = []
  if(type){
    switch (type) {
      case 'textarea':
        console.log('textarea');
        nodeData = {
        'index':0
        ,data:[{
          type: 'textarea'
          , data: ''
        }]}
        break;
      case 'btn':
        console.log('btn');
        nodeData = {
          'index':0
          ,data:[{
            type: 'btn'
            , data: ''
        }]}
        break;
      case 'img':
        console.log('img');
        nodeData = {
          'index':0
          ,data:[{
          type: 'img'
          , data: ''
        }]}
        break;
      default:
        console.log(type);
        nodeData = {
          'index':0
          ,data:[{
          'type': type
          , data: ''
        }]}
        break;
    }
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
    id: (nodes.value.length + 1).toString(),
    type,
    position,
    label: `${type} node`,
    data: {
      title: type
      , block: [nodeData]
    }
  };

  addNodes([newNode]);

  getNodesInfo(nodes.value);

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

//노드 변경 이벤트
onNodesChange((node) => {
  getNodesInfo(nodes.value);
});

</script>

<template>
  <div class="relative h-[calc(100vh-122px)] w-full" id="main-canvas" @drop="handleOnDrop" @dragover="handleOnDragOver">
    <VueFlow
      v-model="elements"
      :node-types="nodeTypes"
      fit-view-on-init
      @paneClick="handlePaneClick"
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
      <Background />
    </VueFlow>
  </div>
</template>

<style>
</style>
