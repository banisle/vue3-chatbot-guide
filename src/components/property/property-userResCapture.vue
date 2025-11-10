<script setup lang="ts">
//@ts-nocheck
import { ref, } from 'vue'

import PropertyAction from '@/components/property/property-action.vue'

const props = defineProps(['block',])

const responseList = ref<[]>([
  { title: 'Entire user reply', value: 'Entire user reply', },
  { title: 'User_email', value: 'User_email', },
  { title: 'User_name', value: 'User_name', },
  { title: 'User_phone', value: 'User_phone', },
])

const aiCopyList = ref([
  { title: '1개의 응답 자동 생성' },
  { title: '3개의 응답 자동 생성' },
  { title: '5개의 응답 자동 생성' },
  { title: '10개의 응답 자동 생성' },
])

</script>

<template>
  <div class="ui-panel-box">
    <div class="ui-panel-form-list">
      <div>
        <label class="pl-label" for="">
          사용자 응답
        </label>
        <v-select
          :items="responseList"
          v-model="block.userRes"
          modal-value="setSelect"
          class="pl-form "
          density="compact"
          variant="outlined"
          menu-icon="pl-icon20 arrow-up"
          hide-details
          >
        </v-select>
        <!-- user email -->
        <template v-if="block.userRes === 'User_email'">
          <v-divider style="opacity: 1;" class="mt-2 pt-2"></v-divider>
          <div class="flex align-center">
            <label class="pl-label" for="">
              엔티티 프롬프트
            </label>
            <v-btn
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
          </div>
          <div class="flex flex-column gap-y-4">
          <div  class="flex" >
            <div class="flex-[1_0_auto]">
              <v-textarea
                placeholder="안내 메시지를 입력하세요"
                variant="outlined"
                height="150px"
                hide-details
                auto-grow
                class="pl-form"
                >
              </v-textarea>
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
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              >
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
          </div>
        </div>
        </template>
        <v-select
          v-model="block.userResVal"
          class="pl-form mt-2"
          density="compact"
          variant="outlined"
          menu-icon="pl-icon20 arrow-up"
          hide-details
          >
          block
        </v-select>
      </div>
    </div>
    <v-divider style="opacity: 1;"></v-divider>
    <!-- 버튼액션 -->
    <PropertyAction
      class="mt-2"
      :element="block"
      />
  </div>
</template>

<style scoped>

</style>