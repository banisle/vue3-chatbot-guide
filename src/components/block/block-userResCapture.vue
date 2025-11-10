<script setup lang="ts">
//@ts-nocheck
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
const props = defineProps(['block'])
</script>

<template>
  <div class="overflow-hidden w-full whitespace-pre-wrap rounded bg-white p-2 min-h-[40px] max-h-[100px] text-[12px]">
    <div class="flex relative align-center">
      <v-icon class="pl-icon20 block-capture-append flex-[0_0_20px]"></v-icon>
      <div class=" ml-2">
        <template v-if="block.userRes">
          <div class="overflow-hidden max-h-[65px]">
            응답 캡처 to{ {{ block.userRes }} }
          </div>
        </template>
        <template v-else>
          <span>응답 캡처 to{last_utterance}</span>
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
  </div>
</template>

<style scoped>

</style>