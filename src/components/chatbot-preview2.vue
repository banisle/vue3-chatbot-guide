<script setup lang="ts">
//@ts-nocheck
import { ref, } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";
const props = defineProps(['data'])

</script>
<template>
   <div class="ui-preview-chtbot shadow-2xl">
      <!-- 헤더 -->
      <div class="ui-preview-chat-header">
        <div class="flex align-center">
          <div class="flex align-center">
            <v-avatar
              size="30px"
              :image=useGetImageUrl(data.icon)>
            </v-avatar>
            <span class="ml-2">{{ data.title}}</span>
          </div>
          <v-btn
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            >
            <v-icon class="pl-icon20 in-close-white"></v-icon>
          </v-btn>
        </div>
        <div class="flex align-center mt-2">
          <div class="text-[13px] cursor-pointer">
            상담시간 안내
            <v-icon class="pl-icon20 arrow-up-block"></v-icon>
          </div>
          <div
            style="border: 1px solid"
            class="ml-auto text-[13px] cursor-pointer border-white px-2 py-1 rounded-full">
            상담 종료
          </div>
        </div>

      </div>
      <!-- 채팅 내역 -->
      <div class="ui-preview-chat-inner pl-scrollable h-[500px]">
        <!-- 상단 배너 -->
        <div class="p-4">
          <!-- 확장형 -->
          <templatge v-if="data.type === 1">
            <div class="flex align-center justify-center h-[151px] p-4 bg-gray-100 rounded-lg">
            </div>
            <div class="flex gap-1 justify-center mt-2">
              <div
                class="border rounded-full w-3 h-3 "
                v-for="item in 3"
                :key="item.id"></div>
            </div>
          </templatge>
          <!-- 기본형 -->
          <template v-else>
            <div class="flex flex-column align-center justify-center p-4">
              <v-avatar
                size="60px"
                :image=useGetImageUrl(data.icon)>
              </v-avatar>
              <div class="mt-2 text-[16px] font-bold">{{ data.title}}</div>
              <p class="mt-2 text-center">
                {{ data.baseMsg }}
              </p>
            </div>
          </template>
        </div>
        <template v-for="msg in data.log" :key="msg.id">
          <div class="flex flex-column">
            <div class="flex ">
              <v-icon
                v-if="msg.type === 'bot'"
                class="pl-icon20 chat-logo"></v-icon>
              <div :class="`ui-msg ${msg.type}`">{{msg.text}}</div>
            </div>
            <!-- btn -->
            <div v-if="msg.type === 'bot'"
              class="flex justify-end max-w-[70%] ml-10 pt-2"
              >
              <v-btn
                min-width="24px"
                icon
                size="small"
                class="ml-2"
                variant="text"
                >
                <v-icon class="pl-icon20 thumbs-up"></v-icon>
              </v-btn>
              <v-btn
                min-width="24px"
                icon
                size="small"
                class="ml-2"
                variant="text"
                >
                <v-icon class="pl-icon20 thumbs-down"></v-icon>
              </v-btn>
            </div>
            <!-- tags -->
            <template v-if="msg.tag">
              <div class="flex gap-2 flex-wrap ml-10 mt-3">
                <div
                  class="pl-tag"
                  v-for="tag in msg.tag"
                  :key="tag.id">
                  {{ tag.text }}
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <!-- 채팅 입력 -->
      <div class="ui-preview-chat-input">
        <div class="ui-preview-chat-form">
          <v-text-field
            class="pl-form"
            density="compact"
            hide-details
            type="text"
            placeholder="메시지를 입력하세요."
            prepend-inner-icon="pl-icon20 circle-plus"
            append-inner-icon="pl-icon20 chat-msg"
            variant="flat"
            ></v-text-field>
        </div>
      </div>

    </div>
</template>

<style scoped>

</style>