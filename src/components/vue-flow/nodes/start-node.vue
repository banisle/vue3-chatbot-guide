<script lang="ts" setup>
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
  <div class="max-w-[520px] rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-2">
          <img src="~@/assets/images/icon_Start.png" class="h-4 w-4" alt="Start icon" />
          <div class="flex flex-col gap-y-1">
            <p class="text-sm text-gray-500">시작</p>
          </div>
        </div>
      </div>

      <span class="text-sm text-gray-500">워크플로우를 시작하는 데 필요한 정보를 설정하는 데 사용되는 워크플로우의 시작 노드입니다.</span>

      <div class="flex justify-between">
        <p class="flex items-center gap-x-1">
          입력
          <tooltip-provider>
            <tooltip>
              <tooltip-trigger>
                <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
              </tooltip-trigger>
              <tooltip-content>
                <p class="max-w-60">
                  워크플로우를 시작하는 데 필요한 입력 매개변수를 정의하면 봇 대화 프로세스 중에 LLM이 이러한 내용을 읽습니다.
                  봇 대화 프로세스 중에 이러한 내용을 읽어들여 LLM이 적절한 시점에 워크플로우를 시작하고
                  올바른 정보를 입력할 수 있습니다.
                </p>
              </tooltip-content>
            </tooltip>
          </tooltip-provider>
        </p>
        <plus-icon class="h-6 w-5 cursor-pointer text-primary" @click="handleClickAddBtn" />
      </div>

      <div class="grid gap-y-3">
        <start-input-module
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          @click-delete="handleClickDeleteBtn(index)"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
