<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

import PropertyAction from '@/components/property/property-action.vue'

const props = defineProps(['discrepancy','seq','index','num'])

const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

const addMsg = () => {
  props.discrepancy.msg.push('');
}
const delMsg = (i) => {
  props.discrepancy.msg.splice(i,1);
}
const aiCopyList = ref([
  { title: '1개의 응답 자동 생성' },
  { title: '3개의 응답 자동 생성' },
  { title: '5개의 응답 자동 생성' },
  { title: '10개의 응답 자동 생성' },
])
</script>

<template>
  <div class="flex justify-start align-center h-[50px]">
    <span class="text-[15px] leading-none ">
      일치하지 않을 경우
    </span>
    <v-switch
      class="ml-auto pl-switch"
      inset
      color="#4f62cd"
      hide-details
      v-model="discrepancy.value"></v-switch>
  </div>
  <div v-if="discrepancy.value"
    class="ui-panel-box"
    >
    <div class="flex align-center">
      <label class="pl-label" for="">
        일치하지 않을 경우
      </label>
      <v-btn
        class="ml-auto"
        max-width="30px"
        max-height="30px"
        icon
        size="small"
        variant="flat"
        color="transparent"
        @click="addMsg()"
        >
        <span class="text-[18px]">+</span>
      </v-btn>
    </div>
    <div class="flex flex-column gap-y-2">
      <div v-for="msg,i in discrepancy.msg"
        class="flex"
        >
        <div class="flex-[1_0_auto]">
          <v-text-field
            height="150px"
            variant="outlined"
            hide-details
            class="pl-form"
            placeholder="안내 메시지를 입력하세요"
            v-model="discrepancy.msg[i]"
          ></v-text-field>

        </div>
        <v-btn
          max-width="30px"
          max-height="30px"
          variant="flat"
          icon
          color="transparent"
          size="small"
          @click="delMsg(i)"
          :style=" i === 0 ? 'opacity: 0; pointer-events: none' : 'opacity: 1' "
          >
          <v-icon class="pl-icon20 minus-small"></v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="discrepancy.msg.length>0"
      class="mr-[30px]"
      >
      <v-menu
        location="bottom"
        class="dropUi"
        >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="pl-btn w-full mt-2"
            prepend-icon="pl-icon20 wand-white"
            color="#4f62cd"
            variant="flat">
            추천 문구 AI 자동 생성
          </v-btn>
        </template>
        <v-list >
          <v-list-item
            v-for="(item, i) in aiCopyList"
            :key="i"
            >
            <div
              class="rounded-md p-2 hover:bg-gray-100"
              >
              <span class="font-normal text-sm normal-case pl-2">{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <PropertyAction
      class="mt-2"
      :element="discrepancy"
      />
  </div>
</template>

<style scoped>

</style>