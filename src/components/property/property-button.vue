<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import draggable from 'vuedraggable'
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore, useSelectedEdgeStore } from '@/stores/panelStore.ts'
import { useActionStore } from '@/stores/actionStore.ts'
import { storeToRefs } from 'pinia'

import PropertyAction from '@/components/property/property-action.vue'

const props = defineProps(['node','block','seq','index','btn','num'])

const emit = defineEmits(['btnClick']);
const { removeEdges } = useVueFlow()

const storeSelectedNode = useSelectedNodeStore()
const selectedEdges = useSelectedEdgeStore()

const { nodeData,allNode, allEdge,btnId } = storeToRefs(storeSelectedNode)

function addBtn(btnGroupId){
  if(btnGroupId != -1){
    let btnLeng = 0;
    //열려있는 버튼 모두 닫기
    if(props.block.type == 'blockCarousel'){
      btnLeng = props.block.btn.length
      for(let n=0;n<btnLeng;n++){
        props.block.btn[n].strg = false;
      }
    } else {
      btnLeng = nodeData.value.data.block[props.seq].data[props.index].btn.length
      for(let n=0;n<btnLeng;n++){
        nodeData.value.data.block[props.seq].data[props.index].btn[n].strg = false;
      }
    }
  }
  if(props.node == 'shortcut'){
    //바로가기 버튼일 때
    if(btnGroupId == -1){
      nodeData.value.data.shortcut.btn.push({'type':'btn','title':'버튼0','action':[],'data':'','id':'0','strg': true});
    } else {
      let id = nodeData.value.data.shortcut.btn.length;
      nodeData.value.data.shortcut.btn.push({'type':'btn','title':'버튼'+id,'action':[],'data':'','id':'0','strg': true});
    }
  }
  if(btnGroupId == -1){
    //신규 버튼그룹
    let btnGroupId = nodeData.value.data.block[props.seq].data.length;
    if(nodeData.value.data.block[props.seq].data[props.index].type == 'blockCarouselGroup'){
      nodeData.value.data.block[props.seq].data[props.index].data[props.num].btnGroupId = btnGroupId
      nodeData.value.data.block[props.seq].data[props.index].data[props.num].btn.push({'type':'btn','title':'버튼0','action':[],'data':'','id':btnId.value,'strg': true});
    } else {
      nodeData.value.data.block[props.seq].data.push({'type':'btnGroup','btnGroupId':btnGroupId,'btn':[{'type':'btn','title':'버튼'+props.index,'action':[],'data':'','id':btnId.value,'strg': true}], addbtn:true });
    }
  } else {
    if(nodeData.value.data.block[props.seq].data[props.index].type == 'blockCarouselGroup'){
      // let id = nodeData.value.data.block[props.seq].data[props.index].data[props.num].btn.length;
      nodeData.value.data.block[props.seq].data[props.index].data[props.num].btn.push({'type':'btn','title':'버튼'+btnId.value,'action':[],'data':'','id':btnId.value,'strg': true});
    } else {
      // let id = nodeData.value.data.block[props.seq].data[props.index].btn.length;
      nodeData.value.data.block[props.seq].data[props.index].btn.push({'type':'btn','title':'버튼'+btnId.value,'action':[],'data':'','id':btnId.value,'strg':true});
    }
  }
  btnId.value = btnId.value + 1;

  if(props.block.type == 'blockCarousel'){
    //캐로셀일때 캐로셀 버튼의 개수파악을 위해 이벤트 전달
    emit("btnClick");
  }
}

function delBtn(index,block){
  if(block == 'carouselBtn'){
    nodeData.value.data.block[props.seq].data[props.index].data[props.num].btn.splice(index,1)

    //캐로셀일때 캐로셀 버튼의 개수파악을 위해 이벤트 전달
    emit("btnClick");
  } else if(block == 'shortcut') {
    nodeData.value.data.shortcut.btn.splice(index,1)
  }else {
    const getIndex = () => {
      const btnIndex = nodeData.value.data.block[props.seq].data[props.index].btn[index].id
      console.log("🚀 ~ getIndex ~ btnIndex:", btnIndex)

      for (let i = 0; i < selectedEdges?.selectedEdges.length; i++) {
        const element = selectedEdges?.selectedEdges[i];

        if(element.sourceHandle === `${btnIndex}-subhandle-R`){

          console.log("🚀 ~ getIndex ~ element.sourceHandle:", element.sourceHandle)
          return element
        }
      }
    }
    removeEdges(getIndex())
    nodeData.value.data.block[props.seq].data[props.index].btn.splice(index,1)

  }
}

// 엣지 상태 변경

const updateEdges = (newIndex: number, oldIndex: number): void => {
  console.log(`🚀 ${oldIndex} 에서 , ${newIndex}로`)
  // for (let index = 0; index < selectedEdges.selectedEdges.length; index++) {


  // }
  const sourceElement = selectedEdges?.selectedEdges[oldIndex];
  const targetElement = selectedEdges?.selectedEdges[newIndex];

  if(sourceElement){
    sourceElement.sourceHandle = `${newIndex}-subhandle-R`
    console.log("🚀 ~ updateEdges ~ sourceElement.sourceHandle:", sourceElement.sourceHandle)
    if(targetElement){
      targetElement.sourceHandle = `${oldIndex}-subhandle-R`
      console.log("🚀 ~ updateEdges ~ targetElement.sourceHandle:", targetElement.sourceHandle)
    }
  }

};

// 버튼 드래그 이벤트

function dragMove(event) {
  const movedElement = event.moved.element;
  const newIndex = event.moved.newIndex;
  const oldIndex = event.moved.oldIndex;

  updateEdges(newIndex, oldIndex)
}

</script>

<template>
  <draggable
    v-if = "block.btn"
    class="panel-btnGroup dragArea "
    :class="block.btn.length === 1 ? 'single' : ''"
    tag="ul"
    :list="block.btn"
    :group="btn"
    item-key="id"
    handle=".ui-drag-handle"
    @change ="dragMove"
    >
    <template #item="{ element, index }">
      <li >
        <div class="preview-btn relative rounded-0 h-[36px]" >
          <!-- handle -->
          <div class="absolute left-2 top-2 ui-drag-handle">
            <v-icon class="pl-icon20 drag-handle"></v-icon>
          </div>
          <span
            class="cursor-pointer"
            >{{ element.title }}</span>
          <div class="absolute right-2 top-[2px]">
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="delBtn(index,block.type == 'blockCarousel' ? 'carouselBtn' : (block.type == 'shortcut' ? 'shortcut' : ''))"
              >
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="element.strg = !element.strg"
              >
              <v-icon class="pl-icon20 edit"></v-icon>
            </v-btn>
          </div>
        </div>
        <!-- //mark: 버튼 편집 -->
        <div
          v-if="element.strg"
          class="flex flex-col gap-y-4 border p-2 border-b-0 "
          >
          <!-- 버튼명 -->
          <div>
            <label class="pl-label" for="">
              버튼명
              <!-- <v-badge color="red" dot inline></v-badge> -->
            </label>
            <v-text-field
              v-model="element.title"
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="챗봇의 이름을 입력하십시오."></v-text-field>
          </div>
          <!-- 버튼액션 -->
          <PropertyAction
            :element="element"
            />
        </div>
      </li>
    </template>
  </draggable>
  <!-- 버튼 생성 -->
  <template
    v-if="block.type != 'blockCarousel' && block.type != 'shortcut'">
    <div
      class="preview-btn type-add w-full cursor-pointer"
      v-if="block.addbtn && block.type == 'btnGroup'"
      @click="addBtn('')"
      >
      <span class="text-[14px]">버튼 추가</span>
    </div>
    <!-- 버튼 그룹 생성 -->
    <div
      v-else-if="block.addbtn && btn && block.type != 'btnGroup'"
      class="preview-btn type-add w-full cursor-pointer"
      @click="addBtn('-1')"
    ><span class="text-[14px]">+ 버튼 추가</span></div>
  </template>
  <!-- 캐러셀 버튼 -->
  <template
    v-else>
    <div
      v-if="block.btn && block.btn.length>0"
      class="preview-btn type-add w-full cursor-pointer "
      @click="addBtn('')"
      >
      <span class="text-[14px]">+ 버튼 추가</span>
    </div>
    <div
      v-else
      class="preview-btn type-add w-full cursor-pointer"
      :style="block.type === 'shortcut' ? 'border-radius: 8px' : ''"
      @click="addBtn('-1')"
    ><span class="text-[14px]">+ 버튼 추가</span></div>
  </template>
</template>

<style scoped>

</style>