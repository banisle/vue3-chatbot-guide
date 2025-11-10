<script setup lang="ts">
//@ts-nocheck
import { ref, watch, watchEffect  } from 'vue'
import { useSubmenuStore } from '@/stores/submenuStore.ts'
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter();

const channelList = ref([
  { title: '플레이그라운드', value: 'playground', evt: () => router.push('/playground') },
  { title: '워크스페이스', value: 'workspace', evt: () => router.push('/home')},
])
const selectChannel = (item) => {
  // removeChannelActive();
  item.evt()
  // item.active = true;
}

// const removeChannelActive = () => {
//   for (let index = 0; index < channelList.value.length; index++) {
//     channelList.value[index].active = false
//   }
// }
const storeSubmenuList = useSubmenuStore()
const findNode = () => {
  console.log(`Route path changed from ${route.path}`);
  for (let node of storeSubmenuList.submenuList) {
    if (node.name === route.meta.parentName) {
      storeSubmenuList.currentSubmenu = node.sublist
    }

  }
  return null;
}
watchEffect(() => {
  findNode()
})
</script>

<template>
  <v-app-bar
    class="layout-top px-4"
    flat
    color="#4F62CD"
    height="50">
    <template v-slot:prepend>
      <v-icon class="palette-logo"></v-icon>
      <div class="pl-top-ground">
        <template
          v-for="item, index in channelList"
          :key="item.id">
          <div
            :class="route.meta.base === item.value ? 'active' : ''"
            @click="selectChannel(item)"
            :link="item.evt"
          >
            <span class="text-[14px] font-regular mt-1">{{ item.title }}</span>
          </div>
        </template>
      </div>
    </template>
    <template v-slot:append>
      <div class="ml-auto flex gap-x-3 align-center">
        <v-btn
          min-width="24px"
          icon
          size="small"
          >
          <v-badge color="error" content="8" class="type-auto">
            <v-icon class="pl-icon20 alarm"></v-icon>
          </v-badge>
        </v-btn>

        <v-btn
          min-width="24px"
          icon
          size="small"
          >
          <v-icon class="pl-icon20 apps"></v-icon>
        </v-btn>
        <v-btn
          min-width="24px"
          icon
          size="small"
          >
          <v-icon class="pl-icon20 profile"></v-icon>
        </v-btn>


      </div>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>