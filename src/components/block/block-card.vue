<script setup lang="ts">
//@ts-nocheck
const props = defineProps(['block'])
</script>

<template>
  <div class="overflow-hidden w-full bg-white rounded min-h-[60px] max-h-[100px] flex align-center pl-2">
    <div
      class="overflow-hidden flex text-left align-center"
      >
      <div
        v-if="block.img"
        class="w-[40px] h-[40px] rounded flex-[0_0_40px]"
        :style="`background: url('${block.img}') 50% 50% no-repeat; background-size: cover`">
      </div>
      <v-icon v-else class="pl-icon20 default-img flex-[0_0_40px]"></v-icon>
      <div class="ml-2 mt-[-8px] truncate">
        <span v-if="block.title" class="text-[14px] leading-none">{{ block.title }}</span>
        <span v-else class="text-[14px] leading-none">카드 타이틀</span>
        <span v-if="block.msg" class="truncate block text-[12px] text-gray-500">{{ block.msg }}</span>
        <span v-else class="flex text-[12px] text-gray-500">안내 메시지를 입력하세요.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>