<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()




</script>

<template>
  <div class="layout-content-top">
    <slot name="title">
      <h2 class="text-[20px] font-bold"> {{ route.name }}</h2>
    </slot>
    <!-- slot -->
    <slot name="header"></slot>

  </div>
</template>



<style scoped>

</style>