<script setup lang="ts">
import topLayout from '@/components/topLayout.vue'
</script>

<template>
  <v-layout >
    <topLayout />
    <v-main class="d-flex">
      <slot />
    </v-main>
  </v-layout>
</template>



<style scoped>
</style>