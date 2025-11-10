<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import commonInputModule from '../common-input-module.vue'

import type { NodeProps } from '@vue-flow/core'
import { LLMNodeData, LLMNodeEvents } from './index'

defineProps<NodeProps<LLMNodeData, LLMNodeEvents>>()
</script>

<template>
  <div class="max-w-[520px] rounded-sm border border-gray-200 bg-white p-3 shadow-md">
    <Handle type="source" :position="Position.Left" />
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-2">
          <img src="~@/assets/images/icon_End.png" class="h-4 w-4" alt="End icon" />
          <div class="flex flex-col gap-y-1">
            <p class="text-sm text-gray-500">종료</p>
          </div>
        </div>
      </div>

      <span class="text-sm text-gray-500" >워크플로우 실행 후 결과 정보를 반환하는 데 사용되는 워크플로우의 최종 노드입니다.</span >

      <div class="flex items-center justify-between gap-x-10">
        <Label class="w-40"> 모드 선택 </Label>
        <Select>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="모드를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="return"> 봇에서 생성한 반환 변수입니다. </SelectItem>
              <SelectItem value="answer"> 답변 콘텐츠를 사용하여 직접 답변하기 </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="grid gap-y-3">
        <common-input-module />
      </div>
    </div>
  </div>
</template>
