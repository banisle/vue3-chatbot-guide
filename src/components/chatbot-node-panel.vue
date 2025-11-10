<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted  } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { Type } from 'lucide-vue-next';

import { makeNodeStore } from '@/stores/nodeStore.ts';
const storeMakeNode = makeNodeStore();
const { addBlockList } = storeMakeNode;

function handleOnDragStart(event: DragEvent, nodeType: any) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

</script>

<template>
  <div class="layout-chatbot-node-panel absolute rounded-[16px] border border-gray-200 top-5 right-5 bg-white shadow-lg">
    <v-list
      width="40px"
      class="py-0">
      <v-list-item
        v-for="(block, i) in addBlockList"
        :key="i"
        class="pa-0 "
        >
        <div v-if="block.class" :class="`pb-2 ${block.class}`"></div>

        <div
          class="cursor-grab rounded-md p-2 hover:bg-gray-100 text-center"
          :draggable="true"
          @dragstart="handleOnDragStart($event, block.type)"
          >
          <v-icon :class="`pl-icon20 ${ block.icon }`">
          </v-icon>
          <v-tooltip
            activator="parent"
            location="start"
          ><span class="font-normal text-sm normal-case">{{ block.title }}</span></v-tooltip>

        </div>
      </v-list-item>
    </v-list>
  </div>
</template>


<style scoped>

</style>