<script setup lang="ts">
//@ts-nocheck
import { ref, watch } from 'vue'
import { useSubmenuStore } from '@/stores/submenuStore.ts'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
const route = useRoute()

const storeSubmenuList = useSubmenuStore()
const { submenuList, selectedSub, currentSubmenu } = storeToRefs(storeSubmenuList)


const selectMenu = (item) => {
  storeSubmenuList.selectedSub = item.name
}


</script>

<template>
  <div class="layout-submenu">
    <div
      class="flex align-center pl-4 border-b h-[50px] text-[22px] font-bold leading-none mb-4">
      {{ route.meta.parentName }}
    </div>
    <v-list
      density="compact"
      nav
      v-for="item in currentSubmenu"
      :key="item.name">
      <v-list-item
        color="#4F62CD"
        :to="item.link"
        :title="item.name"
        :prepend-icon="`pl-icon-submenu ${item.icon}`"
        @click="selectMenu(item)"
        >
      </v-list-item>
    </v-list>

  </div>
</template>



<style scoped>

</style>