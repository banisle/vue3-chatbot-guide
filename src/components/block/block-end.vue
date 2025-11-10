<script setup lang="ts">
//@ts-nocheck
const props = defineProps(['block'])
</script>

<template>
  <div class="overflow-hidden w-full bg-white rounded min-h-[52px] max-h-[112px] flex align-center" >
    <div
      class="flex text-left align-center pl-2"
    >
      <v-icon class="pl-icon20 block-end"></v-icon>
      <span class="ml-2 text-[13px]">현재 상태에서 에이전트 종료</span>
    </div>
  </div>
</template>

<style scoped>

</style>