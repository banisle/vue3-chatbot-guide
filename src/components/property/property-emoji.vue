<script setup lang="ts">
//@ts-nocheck
const props = defineProps(['block'])
</script>

<template>
  <div class="overflow-hidden w-full whitespace-pre-wrap rounded bg-white p-2 h-[100px] text-[12px]">
    <template v-if="block.msg">
      {{ block.msg }}
    </template>
    <template v-else>
      <span class="text-gray-500">안내 메시지를 입력하세요.</span>
    </template>
  </div>
</template>

<style scoped>

</style>