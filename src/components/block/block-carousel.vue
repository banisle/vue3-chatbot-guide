<script setup lang="ts">
//@ts-nocheck
import BlockButton from '@/components/block/block-button.vue'

const props = defineProps(['block'])
</script>

<template>
  <div
    v-for="carousel,num in block.data"
    >
    <div class="overflow-hidden w-full bg-white  rounded min-h-[60px] max-h-[100px] flex align-center pl-2">
      <div
        class="overflow-hidden flex text-left align-center"
        >
        <div
          v-if="carousel.img"
          class="w-[40px] h-[40px] rounded flex-[0_0_40px]"
          :style="`background: url('${carousel.img}') 50% 50% no-repeat; background-size: cover`">
        </div>
        <v-icon v-else class="pl-icon20 default-img flex-[0_0_40px]"></v-icon>
        <div class="ml-2 mt-[-8px] truncate">
          <span v-if="carousel.title" class="text-[14px] leading-none">{{ carousel.title }}</span>
          <span v-else class="text-[14px] leading-none">카드 타이틀</span>
          <span v-if="carousel.msg" class="truncate block text-[12px] text-gray-500">{{ carousel.msg }}</span>
          <span v-else class="flex text-[12px] text-gray-500">안내 메시지를 입력하세요.</span>
        </div>
      </div>
    </div>
    <!-- 캐러셀 버튼 -->
    <div class="carouselBtnGroup" v-if="carousel.btn.length > 0">
      <BlockButton
        class="carouselBtnGroup"
        :block="carousel"
        >
      </BlockButton>
    </div>
  </div>
</template>

<style scoped>

</style>