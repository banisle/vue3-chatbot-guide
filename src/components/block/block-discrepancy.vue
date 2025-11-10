<script setup lang="ts">
//@ts-nocheck
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { useActionStore } from '@/stores/actionStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps(['discrepancy','seq','index'])

const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

const storeAction = useActionStore()
const { actionList } = storeToRefs(storeAction)

const {findNode} = useVueFlow({});

const getNodeNm = (nodeId) => {
  let node = findNode(nodeId)
  if(node){
    if(node.data.title){
      return node.data.title;
    } else {
      return node.label;
    }
  } else{
    return '';
  }
}

const getActionIcon = (value) => {
  let leng = actionList.value.length
  for(let i=0;i<leng;i++){
    if(actionList.value[i].value == value){
      return actionList.value[i].icon;
    }
  }
  return '';
}
</script>

<template>
  <div class="flex align-center relative h-[40px] border-t ">
    <Handle
      :id="`${seq}-${index}-${num}-subhandle-R`"
      type="source"
      :single="true"
      class="handle-sub"
      :connectableEnd="false"
      :position="Position.Right" />
    <span class="whitespace-pre-wrap text-[12px]">
      <v-icon class="pl-icon20 red-close"></v-icon>
      <span class="ml-2">
        일치하지 않을 경우
      </span>
    </span>
    <template
      v-for="action in discrepancy.action"
      >
      <div
        v-if="action?.id < 7"
        class="ui-block-action flex px-2">
        <v-icon
          style="transform: scale(.7);"
          :class="`pl-icon20 ${getActionIcon(action.id)}`"></v-icon>
        <div class="overflow-hidden w-full whitespace-pre-wrap rounded text-[11px]">
          <span v-if="action?.id == 1">GOTO ({{ getNodeNm(action?.data) }})</span>
          <span v-else-if="action?.id == 5">상담사 연결&nbsp;&nbsp;</span>
          <span v-else-if="action?.id == 6">종료&nbsp;&nbsp;</span>
          <span v-else>{{ action?.data }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>