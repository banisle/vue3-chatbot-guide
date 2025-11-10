<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { useActionStore } from '@/stores/actionStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps(['element'])

const storeAction = useActionStore()
const { actionList } = storeToRefs(storeAction)

const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

//연결노드 선택 리스트
const nodeList = ref<string[]>([]);

function getNodes(){
  nodeList.value = [];
  let leng = allNode.value.length
  for(let i=0;i<leng;i++){
    if(allNode.value[i].id.indexOf('action_') == -1 && nodeData.value.id != allNode.value[i].id){
      nodeList.value.push({
        title: allNode.value[i].data.title ? allNode.value[i].data.title : allNode.value[i].label
        , value:allNode.value[i].id
      })
    }
  }
}

</script>

<template>
  <div>
    <div class="flex align-center">
      <label class="pl-label" for="">
        액션
        <!-- <v-badge color="red" dot inline></v-badge> -->
      </label>
      <v-menu
        location="start"
        >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            >
            <span class="text-[18px]">+</span>
          </v-btn>
        </template>
        <!-- 버튼 액션 생성 메뉴 -->
        <div
          class="flex flex-col border rounded bg-white p-2"
          >
          <div
            v-for="btnAction in actionList"
            :key="btnAction.id">
            <div
              @click="element.action.push({id:btnAction.value})"
              :class="btnAction.class"
              class="hover:bg-gray-100 cursor-pointer rounded p-2 text-[13px]">
              <v-icon :class="`pl-icon20 ${btnAction.icon}`"/>
              <span class="ml-2">{{ btnAction.title }}</span>
            </div>
          </div>
        </div>
      </v-menu>

    </div>
    <!-- 추가 생성 버튼 액션 -->
    <div class="flex flex-col gap-y-2">
      <div
        v-for="action,j in element.action"
        class="flex align-center "
        >
        <v-select
          v-if="action.id != '' && action.id == '1'"
          v-model="action.data"
          :items="nodeList"
          placeholder = "연결할 노드를 선택하세요"
          class="pl-form w-full"
          density="compact"
          variant="outlined"
          menu-icon="pl-icon20 arrow-up"
          hide-details
          @click="getNodes()"
          ></v-select>
        <v-text-field
          v-if="action.id != '' && action.id != '1'"
          v-model="action.data"
          :placeholder = "action.id == '2' ? '연결할 URL주소를 입력하세요.'
            : action.id == '3' ? '채팅방에 전송할 메시지를 입력하세요.'
            : action.id == '4' ? '(-)를 제외한 연결할 전화번호를 입력하세요.'
            : action.id == '5' ? '상담직원으로 자동 연결됩니다.'
            : '채팅이 종료됩니다.'"
          :disabled="action.id == '5' || action.id == '6'"
          class="pl-form w-full"
          density="compact"
          variant="outlined"
          hide-details
        >
        </v-text-field>
        <v-btn
          class="ml-2"
          max-width="30px"
          max-height="30px"
          icon
          size="small"
          variant="flat"
          color="transparent"
          @click="element.action.splice(j,1)"
          >
          <v-icon class="pl-icon20 minus-small"></v-icon>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>