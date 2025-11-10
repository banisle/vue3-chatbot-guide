<script setup lang="ts">
//@ts-nocheck
const props = defineProps(['block'])
</script>

<template>
  <div class="overflow-hidden w-full bg-white rounded min-h-[52px] max-h-[112px] flex align-center" >
    <template v-if="block.img">
      <div
        class="flex justify-center w-full">
        <img :src="block.img" >
      </div>
    </template>
    <div
      v-else
      class="flex text-left align-center pl-2"
      >
      <v-icon class="pl-icon20 default-img"></v-icon>
      <div class="ml-2 mt-[-8px]">
        <span class="text-[14px] leading-none">이미지</span>
        <span class="flex text-[12px] text-gray-500">이미지를 업로드하세요.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>