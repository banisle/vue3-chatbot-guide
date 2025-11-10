<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

import PropertyTextarea from '@/components/property/property-textarea.vue'
import PropertyImg from '@/components/property/property-img.vue'

const props = defineProps(['block','seq','index'])
</script>

<template v-if="block.type == 'blockCard'">
  <div>
    <PropertyImg
      :block="block"
      :seq="seq"
      :index="index"
      :num="'-1'"
      />
    <PropertyTextarea
      :block = block
      :seq = seq
      :index = index
      :type = "'card'"
      :blockType="'textarea'"
      :blockKey="'msg'"
      :placeholder = "'카드 내용을 입력하세요'"
      >
    </PropertyTextarea>
  </div>
</template>

<style scoped>

</style>