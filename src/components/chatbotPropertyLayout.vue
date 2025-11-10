<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { useVueFlow, useNode } from '@vue-flow/core';
import draggable from 'vuedraggable'
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'

import { useDropzone } from "vue3-dropzone";

import PropertyTextarea from '@/components/property/property-textarea.vue'
import PropertyImg from '@/components/property/property-img.vue'
import PropertyCard from '@/components/property/property-card.vue'
import PropertyCarousel from '@/components/property/property-carousel.vue'
import PropertyButton from '@/components/property/property-button.vue'
import PropertyIntent from '@/components/property/property-intent.vue'
import PropertyCondition from '@/components/property/property-condition.vue'
import PropertyResponseAi from '@/components/property/property-responseAi.vue'
import PropertySetAi from '@/components/property/property-setAi.vue'
import PropertyApi from '@/components/property/property-api.vue'
import PropertyAction from '@/components/property/property-action.vue'
import PropertyDiscrepancy from '@/components/property/property-discrepancy.vue'
import PropertyCapture from '@/components/property/property-userResCapture.vue'
import PropertyEnd from '@/components/property/property-end.vue'

// 패널 visible
const storePropertyPanel = usePropertyPanelStore()
const { isVisible } = storeToRefs(storePropertyPanel)

// selected node data
const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

import { makeNodeStore } from '@/stores/nodeStore.ts';
const storeMakeNode = makeNodeStore();
const { addBlockList, makeNode } = storeMakeNode;

const {
  findNode
  , nodes
  , edges
  , addNodes
  , onNodeClick
  , addEdges
  , onEdgeClick
  , getConnectedEdges
  , project
  , vueFlowRef
  , onConnect
  , setNodes
  , setEdges
  , setViewport
  , removeNodes
  } = useVueFlow({
    nodes: [
      {
        id: '1',
        type: 'start',
        label: 'start',
        position: { x: 25, y: 400 }
      },
    ]
  });


//블럭추가 이벤트
function addBlock(type,seq,index){
  let makeNodeData = [];
  makeNodeData = makeNode(type)
  makeNodeData.index = nodeData.value.data.block.length;
  if(nodeData.value.data.block){
    nodeData.value.data.block.push(makeNodeData);
  } else {
    let block = makeNodeData
    nodeData.value.data = {
      'block':block,
      'title': nodeData.value.data.title
    };
  }
}

//블럭삭제 이벤트
function delBlock(seq,index,num){
  nodeData.value.data.block.splice(seq,1);

  let leng = nodeData.value.data.block.length
  if(leng == 0){
    removeNodes(nodeData.value.id);
    isVisible.value = false;
  } else {
    for(let i=0;i<leng;i++){
      nodeData.value.data.block[i].index = i;
    }
  }
}

const dragArray = ref();
const drag = ref<boolean>(false);

// 바로가기 블럭
const shortcutBlock = ref(false)

//아코디언 오픈 영역 지정
const openIndex = ref(0)

const toggleOpen = (index) => {
  openIndex.value = index

  //아코디언 오픈 시 버튼 모두 닫은채로 열기
  let leng = nodeData.value.data.block[index].data.length
  for(let i=0;i<leng;i++){
    if(nodeData.value.data.block[index].data[i].type == 'btnGroup'){
      let btnLeng = nodeData.value.data.block[index].data[i].btn.length
      for(let n=0;n<btnLeng;n++){
        nodeData.value.data.block[index].data[i].btn[n].strg = false;
      }
    } else if(nodeData.value.data.block[index].data[i].type == 'blockCarouselGroup'){
      let carouselLeng = nodeData.value.data.block[index].data[i].data.length
      for(let n=0;n<carouselLeng;n++){
        let btnLeng = nodeData.value.data.block[index].data[i].data[n].btn.length
        for(let j=0;j<btnLeng;j++){
          nodeData.value.data.block[index].data[i].data[n].btn[j].strg = false;
        }
      }
    }
  }
};


const dragBlock= () => {
  let leng = nodeData.value.data.block.length
  for(let i=0;i<leng;i++){
    nodeData.value.data.block[i].index = i;
  }
}

const possibleAddBlock = (list) => {
  let blockList = []
  for(let i=0;i<list.length;i++){
    if(list[i].type != 'blockEnd'){
      blockList.push(list[i])
    }
  }
  return blockList
}

</script>
<template>
  <v-slide-x-reverse-transition>
    <div
      v-if="isVisible"
      class="pl-scrollable absolute z-10 w-[410px] h-[calc(100vh-103px)] border-l border-gray-200 top-[103px] right-0 bg-white">
      <!-- node title -->
      <div class="flex align-center py-2 px-4 border-b border-gray-200">
        <v-text-field
          v-model="nodeData.data.title"
          class="pl-form type-hover node-title"
          hide-details
          density="compact"
          variant="outlined"
          ></v-text-field>
      </div>
      <!-- node block -->
      <div class="relative">
        <draggable
          v-model="nodeData.data.block"
          group="block"
          direction="vertical"
          @start="drag=true"
          @end="drag=false"
          item-key="index"
          class="flex flex-col"
          handle=".ui-drag-handle-block"
          @change="dragBlock()"
          >
          <template #item="{element}">

            <AccordionRoot
              class="w-full"
              collapsible
              :default-value="`accord-${ openIndex }`"
              >
              <!-- v-model="activeAccordion" -->
              <template v-for="node,key in element" :key="element.index">
                <AccordionItem
                  v-if="key == 'data'"
                  class="border-b border-gray-200 focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_1px_rgba(33,78,203,.3)] "
                  :value="`accord-${ element.index }`"
                  >
                  <AccordionHeader class="flex ui-block-header relative">
                    <!-- handle -->
                    <div class="ui-drag-handle-block absolute left-2">
                      <v-icon class="pl-icon20 drag-handle"></v-icon>
                    </div>
                    <v-icon
                      class="pl-icon20"
                      :class="node[0].icon" />
                    <v-text-field
                      v-model="node[0].title"
                      class="pl-form type-hover block-title"
                      hide-details
                      density="compact"
                      variant="outlined"
                      ></v-text-field>
                    <v-btn
                      class="ml-auto"
                      min-width="24px"
                      icon
                      size="small"
                      variant="flat"
                      color="transparent"
                      @click="delBlock(element.index,'-1')"
                      >
                      <v-icon class="pl-icon20 block-remove"></v-icon>
                    </v-btn>
                    <AccordionTrigger
                      class="flex h-[40px] w-[40px] align-center justify-center rounded-full hover:bg-gray-100 group mr-4"
                      >
                      <v-icon
                        class="pl-icon20 arrow-up transition-transform  group-data-[state=open]:rotate-180"
                        @click="toggleOpen(element.index)"
                        >
                      </v-icon>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent
                    class="border-t border-gray-200 text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                    <div class="px-4 py-4">
                      <div
                        class="relative"
                        v-for="block,index in node"
                        :key="block.id">
                        <!-- //mark: 블럭: 텍스트  -->
                        <PropertyTextarea
                          v-if="block.type == 'blockText'"
                          :block = block
                          :seq = element.index
                          :index = index
                          :blockType="'textarea'"
                          :blockKey="'msg'"
                          :placeholder = "'안내 메시지를 입력하세요'"
                          >
                        </PropertyTextarea>

                        <!-- //mark: 블럭: 이미지 -->
                        <PropertyImg
                          v-if="block.type == 'blockImg'"
                          :block = block
                          :seq = element.index
                          :index = index
                          :num="'-1'"
                          >
                        </PropertyImg>

                        <!-- //mark: 블럭: 카드 -->
                        <PropertyCard
                          v-if="block.type == 'blockCard'"
                          :block = block
                          :seq = element.index
                          :index = index
                          >
                        </PropertyCard>

                        <!-- //mark: 블럭: 캐러셀 -->
                        <PropertyCarousel
                          v-if="block.type == 'blockCarouselGroup'"
                          :element="element"
                          :block="block"
                          :seq="element.index"
                          :index="index"
                          :btn="index == node.length-1 ? true : false"
                          >
                        </PropertyCarousel>

                        <!-- //mark: 블럭: Response AI -->
                        <PropertyResponseAi
                          v-if="block.type == 'blockResponseai'"
                          :block="block"
                          :seq="element.index"
                          :index="index"
                          ></PropertyResponseAi>

                        <!-- 액션 -->
                        <PropertyAction
                          v-if="block.type == 'action'"
                          :block = block
                          :seq = element.index
                          :index = index
                          >
                        </PropertyAction>

                        <!-- 버튼 -->
                        <div class="">
                          <PropertyButton
                            v-if="block.type != 'blockCarouselGroup'"
                            :node="element"
                            :block="block"
                            :seq="element.index"
                            :index="index"
                            :btn="index == node.length-1 ? true : false"
                            :num="'-1'"
                            ></PropertyButton>
                        </div>

                        <!-- 사용자 응답캡처 -->
                        <PropertyCapture
                          v-if="block.type == 'blockCapture'"
                          :block = block
                          :seq = element.index
                          :index = index
                          >
                        </PropertyCapture>

                        <!-- API -->
                        <PropertyApi
                          v-if="block.type == 'blockApi'"
                          :block = block
                          :seq = element.index
                          :index = index
                          >
                        </PropertyApi>

                        <!-- 일치하지 않을경우 -->
                        <PropertyDiscrepancy
                          v-if="((index == node.length-1 && element.discrepancy.toggle) && (block.type == 'btnGroup' && block.btn.length > 0)) || (block.type == 'blockCapture' && block.userRes != 'Entire user reply')"
                          :discrepancy="element.discrepancy"
                          :seq="element.index"
                          :index="index"
                          :num="'-1'"
                          ></PropertyDiscrepancy>

                        <!-- 종료 -->
                        <PropertyEnd
                          v-if="block.type == 'blockEnd'"
                          />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </template>
            </AccordionRoot>
          </template>
        </draggable>
        <!-- //mark: 블럭: 바로가기 -->
        <div
          v-if="nodeData.data.block[0]?.shortcut"
          :class="`flex flex-col px-4 ${ shortcutBlock ? 'pb-4' : ''} border-b border-gray-200 mt-px overflow-hidden`"
          >
          <div class="flex justify-start align-center h-[50px]">
            <span class="text-[15px] leading-none ">
              바로가기 버튼
            </span>
            <v-switch
              class="ml-auto pl-switch"
              inset
              color="#4f62cd"
              hide-details
              v-model="shortcutBlock"></v-switch>
          </div>
          <div v-if="shortcutBlock" class="w-full">
            <!-- <div
              class="preview-btn single w-full cursor-pointer "
              style="background: #f3f4fa;"
              >
              <span class="text-[14px]">+ 버튼 추가</span>
            </div> -->
            <PropertyButton
              :node="'shortcut'"
              :block="nodeData.data.shortcut"
              ></PropertyButton>
          </div>
        </div>
        <!-- 메뉴: 블럭 추가 -->
        <v-menu
          v-if="nodeData.data.block[0]?.data[0]?.type != 'blockEnd'"
          transition="scale-transition"
          location="start"
          class="dropUi"
          >
          <template v-slot:activator="{ props }">
            <v-btn
              class="vertical-btn ml-auto mt-2 mr-4"
              icon="pl-icon20 plus30"
              variant="flat"
              color="#4f62cd"
              min-width="44px"
              width="44px"
              v-bind="props">
            </v-btn>
          </template>
          <v-list width="200px">
            <v-list-item
              v-for="(block, i) in possibleAddBlock(addBlockList)"
              :key="i"
              >
              <div v-if="block.class" :class="`pb-2 ${block.class}`"></div>
              <div
                class="rounded-md p-2 hover:bg-gray-100"
                @click="addBlock(block.type)"
                >
                <v-icon :class="`pl-icon20 ${ block.icon }`"></v-icon>
                <span class="font-normal text-sm normal-case pl-2">{{ block.title }}</span>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>

      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>
<style scoped>

</style>