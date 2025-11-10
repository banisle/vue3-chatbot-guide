<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from 'vue'
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'


import { CommonNodeData, CommonNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts';
import { storeToRefs } from 'pinia'

// component block
import BlockTextarea from '@/components/block/block-textarea.vue'
import BlockImg from '@/components/block/block-img.vue'
import BlockCard from '@/components/block/block-card.vue'
import BlockCarousel from '@/components/block/block-carousel.vue'
import BlockButton from '@/components/block/block-button.vue'
import BlockIntent from '@/components/block/block-intent.vue'
import BlockCondition from '@/components/block/block-condition.vue'
import BlockResponseAi from '@/components/block/block-responseAi.vue'
import BlockSetAi from '@/components/block/block-setAi.vue'
import BlockApi from '@/components/block/block-api.vue'
import BlockCapture from '@/components/block/block-userResCapture.vue'
import BlockEnd from '@/components/block/block-end.vue'

import BlockDiscrepancy from '@/components/block/block-discrepancy.vue'

// selected node data
const storeSelectedNode = useSelectedNodeStore()
const { nodeData } = storeToRefs(storeSelectedNode)

const props = defineProps<NodeProps<CommonNodeData, CommonNodeEvents>>()

const nodeColorModel = ref(false)

const node = useNode()
onMounted(() => {
  node.node.data = {
    ...node.node.data,

  }
})

// 노드 툴바
const storePropertyPanel = usePropertyPanelStore();
const storeChatbotPreview = useChatobtPreviewStore()

const togglePreview = () =>{
  storeChatbotPreview.toggleVisible(true);
}
const colorSwatches = ref([
  '#E4EAEF',
  '#D3E5F4',
  '#CFE9D5',
  '#F4E0DC',
  '#EBDEF2',
  '#EBE2CD',
  '#C7EAE4',
  '#F1DEE1'])

// 노드 메뉴 : 삭제
const { removeNodes } = useVueFlow()
const handleClickDeleteBtn = (selNodeData) => {
  removeNodes(selNodeData.id)
  // initLayout();
  nodeData.value = {};
  storePropertyPanel.toggleVisible(false);
}
</script>

<template>
  <div
    :class="`ui-node ${props.data.block[0]?.data[0].type}`"
    :style="`background-color: ${ props.data.nodeColor }`"
    >
    <Handle type="target" :position="Position.Left" :connectableStart="false" class="target-handle" />
    <!-- toolbar -->
    <div class="node-toolbar">
      <div class="node-toolbar-inner">
        <!-- 노드 프리뷰 -->
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="flat"
          color="transparent"
          @click="togglePreview()"
          >
          <v-icon class="pl-icon20 run"></v-icon>
        </v-btn>
        <!-- color picker -->
        <VSwatches
          class="pl-swatches type-nobg"
          :swatches="colorSwatches"
          shapes="circles"
          row-length="5"
          popover-x="right"
          v-model="props.data.nodeColor" >
        </VSwatches>
        <!-- 노드 삭제 -->
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="flat"
          color="transparent"
          @click="handleClickDeleteBtn(nodeData)"
          >
          <v-icon class="pl-icon20 card-remove-red"></v-icon>
        </v-btn>
      </div>
    </div>
    <div
      class="flex flex-col gap-y-2 w-full">
      <div
        v-if="props.data.block[0]?.data[0].type !== 'action'"
        class="flex justify-between">
        <div class="flex align-center w-full">
          <div class="truncate text-[15px]">{{ props.data.title }}</div>
        </div>
      </div>
      <!-- textarea -->
      <div
        v-for="node,seq in props.data.block"
        class="preview-wrap"
        >
        <div
          :class="block.type == 'btnGroup' ? (block.btn.length > 0 ? `ui-block ${block.type}` : '') : `ui-block ${block.type}`"
          v-for="block,index in node.data"
          :key="index"
          >
          <!-- block : textarea -->
          <BlockTextarea
            v-if="block.type == 'blockText'"
            :block="block"
            />
          <!-- block : img -->
          <BlockImg
            v-if="block.type == 'blockImg'"
            :block="block"
            />
          <!-- block: card -->
          <BlockCard
            v-if="block.type == 'blockCard'"
            :block="block"
            />
          <!-- block: carousel -->
          <BlockCarousel
            v-if="block.type == 'blockCarouselGroup'"
            :block="block"
            />
          <!-- 버튼 -->
          <BlockButton
            v-if="block.type == 'btnGroup'"
            :block="block"
            :seq=seq
            :index=index
            />
          <!-- 경로선택 -->
          <BlockIntent
            v-if="block.type == 'blockIntentGroup'"
            :block="block"
            />
          <!-- 조건 -->
          <BlockCondition
            v-if="block.type == 'blockConditionGroup'"
            :block="block"
            />
          <!-- AI -->
          <BlockResponseAi
            v-if="block.type == 'blockResponseai'"
            :block="block"
            :seq=seq
            :index=index
            />
          <!-- AI -->
          <BlockSetAi
            v-if="block.type == 'blockSetai'"
            :block="block"
            />
          <!-- API -->
          <BlockApi
            v-if="block.type == 'blockApi'"
            :block="block"
            />
          <!-- 사용자 응답 캡쳐 -->
          <BlockCapture
            v-if="block.type == 'blockCapture'"
            :block="block"
            />
          <!-- 종료 -->
          <BlockEnd
            v-if="block.type == 'blockEnd'"
            :block="block"
            />

          </div>
          <!-- 일치하지 않을 경우 -->
          <div v-if="node.discrepancy.value"
            class="px-2"
            >
            <BlockDiscrepancy

              :discrepancy="node.discrepancy"
              :seq=seq
              :index=index
              />
          </div>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" class="node-source-handle" :connectableEnd="false"/>
  </div>
</template>
