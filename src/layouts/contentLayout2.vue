<script setup lang="ts">
//@ts-nocheck
import topLayout from '@/components/topLayout.vue'
import asideLayout from '@/components/asideLayout.vue'
import contentTopLayout2 from '@/components/contentTopLayout2.vue'
</script>

<template>
  <v-layout >
    <topLayout />
    <asideLayout />
    <v-main class="d-flex flex-column ">
      <contentTopLayout2 />
      <div class="flex h-full">
        <slot/>
      </div>
    </v-main>
  </v-layout>
</template>



<style scoped>
.v-main{
  --v-layout-left: 0 !important;
}
</style>