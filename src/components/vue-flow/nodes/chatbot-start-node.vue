<script lang="ts" setup>
//@ts-nocheck
import { ref } from 'vue'
import { PlusIcon, AlertCircleIcon } from 'lucide-vue-next'
import { Handle, Position, useNode } from '@vue-flow/core'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import StartInputModule from '../start-input-module.vue'

import type { NodeProps } from '@vue-flow/core'
import { LLMNodeData, LLMNodeEvents } from './index'
import type { Input } from '../start-input-module.vue'

defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()

const data = ref<Input[]>([])

const node = useNode()

function handleClickAddBtn() {
  data.value.push({
    name: '',
    description: '',
    type: '',
    isRequired: true
  })
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleClickDeleteBtn(index: number) {
  data.value.splice(index, 1)
  node.node.data = {
    ...node.node.data,
    output: data
  }
}
</script>

<template>
  <div class="ui-node type-start shadow-md">
    <v-icon class="pl-icon20 node-start"></v-icon>
    <span class="ml-2">Start</span>
    <Handle type="source" :position="Position.Right" class="start-handle"/>
  </div>
</template>
