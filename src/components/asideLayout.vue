<script setup lang="ts">
//@ts-nocheck
import { ref, watch  } from 'vue'
import { useSubmenuStore } from '@/stores/submenuStore.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
const route = useRoute()


const drawer = ref(true)

// select menu
const storeSubmenuList = useSubmenuStore()
const { submenuList, selectedSub, currentSubmenu } = storeToRefs(storeSubmenuList)




const selectMenu = (item) => {
  submenuList.value.selectedSub = item.sublist
}


</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    class="layout-aside"
    @click:outside="handleClickOutside"
    :class="`menu-expand-${menu_expand}`"
    absolute
    permanent
    width="60"
    >
    <v-list
      density="compact"
      nav
      v-for="item in submenuList"
      :key="item.name">
      <v-tooltip :text="item.name">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            color="#4F62CD"
            :to="item.link"
            @click="selectMenu(item)"
            :class="[item.class, route.meta.parentName === item.name ? 'menu-active' : '']"
            >
            <v-icon :class="`pl-icon-leftmenu ${item.icon}`"></v-icon>

          </v-list-item>


        </template>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
</style>