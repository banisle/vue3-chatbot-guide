<script setup lang="ts">
import MainCanvas from '@/components/main-canvas.vue'
import ToolbarLayout from '@/components/toolbarLayout.vue'
import PropertyLayout from '@/components/propertyLayout.vue'

</script>

<template>
  <div class="w-64 bg-slate-200 h-full">
    시나리오
  </div>
  <div class="relative h-full flex-1 overflow-hidden">
    <ToolbarLayout />
    <MainCanvas />
    <PropertyLayout />
  </div>
  <!-- property panel -->
</template>



<style scoped>

</style>