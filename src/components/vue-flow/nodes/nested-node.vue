<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from 'vue'
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'
import { Input } from '@/components/ui/input'
import { MoreHorizontalIcon } from 'lucide-vue-next'
import ChildNode from '@/components/vue-flow/nodes/child-node.vue'


import { LLMNodeData, LLMNodeEvents } from './index'

import type { NodeProps } from '@vue-flow/core'

import { usePropertyPanelStore, useSelectedNodeStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

// selected node data
const storeSelectedNode = useSelectedNodeStore()
const { nodeData } = storeToRefs(storeSelectedNode)

const props = defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const title = ref(props.data.title)
const isEditTitle = ref(false)

const node = useNode()
onMounted(() => {
  node.node.data = {
    ...node.node.data,
    output: [
      {
        name: 'output'
      }
    ]
  }
})

// const { removeNodes, nodes, addNodes } = useVueFlow()
const { removeNodes, nodes, addNodes } = useVueFlow({
  // ref: [
  //   {
  //     id: '1',
  //     type: 'start',
  //     label: 'start',
  //     position: { x: 25, y: 400 },
  //     extent: 'parent',
  //     parentNode: '4',
  //   },
  // ]
})


function handleClickDeleteBtn() {
  console.log("this.nodeData", this.nodeData);
  console.log("this.nodeData", this.nodeData.data);
  console.log("node.id", node.id);
  if(this.nodeData.id = node.id){
    this.nodeData.data = {};
  }
  removeNodes(node.id)
}

function handleClickDuplicateBtn() {
  const { type, position, label, data } = node.node
  const newNode = {
    id: (nodes.value.length + 1).toString(),
    type,
    position: {
      x: position.x + 100,
      y: position.y + 100
    },
    label,
    data
  }
  addNodes(newNode)
}
</script>

<template>
  <div class="rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="target" :position="Position.Left" :connectableStart="false" class="target-handle"/>
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex gap-x-2">

          <div class="flex flex-col gap-y-1">
            <Input v-model="title" class="h-5" v-if="isEditTitle" @blur="() => (isEditTitle = false)" />
            <h3 class="text-base" v-else>{{ title }}</h3>

            <p class="text-sm text-gray-500">test nested</p>
          </div>
        </div>

        <Menubar class="border-none">
          <menubar-menu>
            <menubar-trigger>
              <more-horizontal-icon />
            </menubar-trigger>
            <menubar-content>
              <menubar-item @click="handleClickDuplicateBtn"> 복제 </menubar-item>
              <menubar-item @click="handleClickDeleteBtn"> 삭제 </menubar-item>
              <menubar-item @click="isEditTitle = true"> 이름변경 </menubar-item>
            </menubar-content>
          </menubar-menu>
        </Menubar>
      </div>

      <span class="text-sm text-gray-500" >자식 요소 edge test</span >

      <div class="grid gap-y-3">
        <ChildNode :index="node.id"/>
        <ChildNode :index="Number(node.id)+1"/>
        <ChildNode :index="Number(node.id)+2"/>
      </div>

    </div>
    <Handle type="source" :position="Position.Right" class="node-source-handle" :connectableEnd="false"/>
  </div>
</template>
