<script setup lang="ts">
//@ts-nocheck
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
const props = defineProps(['block','seq','index'])
</script>

<template>
  <div class="overflow-hidden w-full whitespace-pre-wrap rounded bg-white p-2 h-[100px] text-[12px]">
    <div class="relative h-full">
      <div class="flex ">
        <v-icon class="pl-icon20 block-ai-append"></v-icon>
        <div class="ml-2">
          <template v-if="block.prompt">
            {{ block.prompt }}
          </template>
          <template v-else>
            <span class="text-gray-500">생성형 프롬프트를 설정하세요.</span>
          </template>
        </div>
      </div>
      <Handle
        :id="`${seq}-${index}-${num}-subhandle-R`"
        type="source"
        :single="true"
        class="handle-sub"
        :connectableEnd="false"
        :position="Position.Right" />
    </div>
  </div>
</template>

<style scoped>

</style>