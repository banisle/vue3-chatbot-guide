<script setup lang="ts">

</script>

<template>
  <!-- 핵심이 되는 부분 -->
  <component
    :is="$route.meta.layout || 'div'"
    :class="`app-layout-${$route.meta.width}`"
    >
    <router-view></router-view>
  </component>
</template>

<style>
html { overflow-y: hidden;}
</style>
