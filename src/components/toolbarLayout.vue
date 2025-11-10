<script setup lang="ts">
//@ts-nocheck
import { useVueFlow } from '@vue-flow/core'
import { useClipboard } from '@vueuse/core'
import { Toaster, useToast } from '@/components/ui/toast'
import { Type } from 'lucide-vue-next';

import { useSelectedNodeStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

const { toObject } = useVueFlow()
const { copy } = useClipboard()
const { toast } = useToast()

const storeSelectedNode = useSelectedNodeStore()
const { nodeData } = storeToRefs(storeSelectedNode)

function handleClickGetData() {
  copy(JSON.stringify(toObject())).then(() => {
    toast({
      title: 'copied success'
    })
  })
}

function handleClickPublishBtn() {
  toast({
    title: 'Save Data',
    description: '1.valid data 2.fetch backend api to save result'
  })
}

function handleOnDragStart(event: DragEvent, nodeType: any) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

</script>

<template>
  <div class="flex items-center justify-between border-b border-gray-200 py-2 px-6">
    <div class="flex gap-x-3">
      <div class="flex items-center gap-x-1">
        <div class="flex flex-col">
          <div class="flex items-center gap-x-3">
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'LLM')"
              ><img src="~@/assets/images/icon_LLM.png" class="h-4 w-4 pointer-events-none" alt="LLM icon" />
            </div>
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'code')"
              ><img src="~@/assets/images/icon_Code.png" class="h-4 w-4 pointer-events-none" alt="code icon" />
            </div>
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'knowledge')"
              ><img src="~@/assets/images/icon_Knowledge.png" class="h-4 w-4 pointer-events-none" alt="knowledge icon" />
            </div>
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'nested')"
              >test
            </div>
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'textarea')"
              >
              <Type />
            </div>
            <div
              class="cursor-grab rounded-md p-2 shadow-md bg-neutral-200"
              :draggable="true"
              @dragstart="handleOnDragStart($event, 'image')"
              >IMG
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-x-3">
      <v-btn
        color="primary"
        variant="outlined"
        @click="handleClickGetData">
        음성 설정
      </v-btn>
      <v-btn
        color="primary"
        variant="flat"
        @click="handleClickPublishBtn">
        배포하기
      </v-btn>
    </div>
  </div>
  <Toaster />
</template>

<style scoped>

</style>