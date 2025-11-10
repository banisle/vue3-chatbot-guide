<script setup lang="ts">
//@ts-nocheck
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
const props = defineProps(['block','seq','index'])
</script>

<template>
  <div class="overflow-hidden w-full whitespace-pre-wrap rounded bg-white p-2 min-h-[50px] max-h-[100px] text-[12px]">
    <!-- radio: ai model -->
    <div class="relative h-full" v-if="block.source === 'ai'">
      <div class="flex  max-h-[90px]">
        <v-icon class="pl-icon20 block-ai-append flex-[0_0_20px]"></v-icon>
        <div class="ml-2">
          <template v-if="block.prompt">
            <div class="overflow-hidden">
              {{ block.prompt }}
            </div>
          </template>
          <template v-else>
            <span class="text-gray-500">생성형 프롬프트를 설정하세요.</span>
          </template>
        </div>
      </div>
      <Handle
        :id="`${seq}-${index}-0-subhandle-R`"
        type="source"
        :single="true"
        class="handle-sub"
        :connectableEnd="false"
        :position="Position.Right" />
    </div>
    <!-- radio: Knowledge base -->
    <template v-else>
      <div class="flex relative ">
        <v-icon class="pl-icon20 block-ai-append flex-[0_0_20px]"></v-icon>
        <div class=" ml-2">
          <template v-if="block.question">
            <div class="overflow-hidden max-h-[65px]">
              {{ block.question }}
            </div>
          </template>
          <template v-else>
            <span class="text-gray-500">Enter Query</span>
          </template>
        </div>
        <Handle
          :id="`${seq}-${index}-0-subhandle-R`"
          type="source"
          :single="true"
          class="handle-sub"
          :connectableEnd="false"
          :position="Position.Right" />
      </div>
      <div v-if="block.notFoundPathToggle"
        class="flex align-center relative ml-[28px] h-[30px] border-t mt-2 ">
        Not Found
        <Handle
        :id="`${seq}-${index}-1-subhandle-R`"
        type="source"
        :single="true"
        class="handle-sub"
        :connectableEnd="false"
        :position="Position.Right" />
      </div>

    </template>


  </div>
</template>
