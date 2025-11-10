<script setup lang="ts">
import topLayout from '@/components/topLayout.vue'
import asideLayout from '@/components/asideLayout.vue'
import submenuLayout from '@/components/submenuLayout.vue'
// import contentTopLayout from '@/components/contentTopLayout.vue'
</script>

<template>
  <v-layout >
    <topLayout />
    <asideLayout />
    <submenuLayout/>
    <v-main class="d-flex flex-column ">
      <!-- <contentTopLayout /> -->
      <slot />
    </v-main>
  </v-layout>
</template>



<style scoped>
.v-main{
  --v-layout-left: 0 !important;
}
</style>