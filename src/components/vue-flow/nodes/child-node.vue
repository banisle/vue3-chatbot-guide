
<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue'
import { Handle, Position, } from '@vue-flow/core'
import { Input } from '@/components/ui/input'
const props = defineProps(['index'])

const inputData = ref('test child')

</script>

<template>
  <div class="flex flex-col gap-y-4 ">
    <div class="relative">
      <Input v-model="inputData" />
      <!-- <Handle
        :id="`${index}-subhandle-L`"
        type="target"
        :single="true"
        class="handle-sub"
        :position="Position.Left" /> -->
      <Handle
        :id="`${index}-subhandle-R`"
        type="source"
        :single="true"
        class="handle-sub"
        :connectableEnd="false"
        :position="Position.Right" />
    </div>
    <!-- <div class="relative">
      <Input placeholder="only Target node" />
      <Handle type="source" :connectableStart="false" :position="Position.Left" style=" background: red;"/>

    </div>
    <div class="relative">
      <Input placeholder="only Start node" />
      <Handle type="source" :connectableEnd="false" :position="Position.Right" style=" background: red;"/>

    </div> -->

  </div>
</template>

<style scoped>

</style>