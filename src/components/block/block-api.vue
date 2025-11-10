<script setup lang="ts">
//@ts-nocheck
import { Handle, Position, useNode, useVueFlow } from '@vue-flow/core'
const props = defineProps(['block','seq','index'])
</script>

<template>
  <div class="overflow-hidden w-full whitespace-pre-wrap rounded bg-white p-2 min-h-[40px] text-[12px]">
    <div class="flex relative pb-2">
      <v-icon class="pl-icon20 block-api-append flex-[0_0_20px]"></v-icon>
      <div class=" ml-2">
        <div class="overflow-hidden max-h-[65px]"
          v-if="block.method">
          {{ block.method }}
        </div>
        <div v-else>Enter Request Method</div>
        <div class="overflow-hidden max-h-[65px] break-all pr-4 text-[12px] text-gray-500" >
          <template v-if="block.url">
            {{ block.url }}
          </template>
          <template v-else>Enter Request URL</template>
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
    <!-- 성공 -->
    <div class="flex relative align-center border-t">
      <v-icon class="pl-icon20 green-sucess flex-[0_0_20px]"></v-icon>
      <div class="ml-2 w-full">
        <div class="flex align-center relative h-[40px] ">
          <div class="">
            <div class="overflow-hidden max-h-[65px]">
              성공
            </div>
          </div>
          <Handle
            :id="`${seq}-${index}-success-0-subhandle-R`"
            type="source"
            :single="true"
            class="handle-sub"
            :connectableEnd="false"
            :position="Position.Right" />
        </div>
      </div>
    </div>
    <!-- 실패 -->
    <div class="flex relative align-center border-t">
      <v-icon class="pl-icon20 red-close flex-[0_0_20px]"></v-icon>
      <div class="ml-2 w-full">
        <div class="flex align-center relative h-[40px] ">
          <div class="">
            <div class="overflow-hidden max-h-[65px]">
              실패
            </div>
          </div>
          <Handle
            :id="`${seq}-${index}-fail-0-subhandle-R`"
            type="source"
            :single="true"
            class="handle-sub"
            :connectableEnd="false"
            :position="Position.Right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>