<script setup lang="ts">
import topLayout from '@/components/topLayout.vue'
import asideLayout from '@/components/asideLayout.vue'
</script>

<template>
  <v-layout >
    <topLayout />
    <asideLayout />
    <v-main class="d-flex">
      <slot />
    </v-main>
  </v-layout>
</template>



<style scoped>
.v-main{
  --v-layout-left: 56px !important;
}
</style>