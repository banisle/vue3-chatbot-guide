<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";

const emit = defineEmits(["close"]);
const props = defineProps(['scenario'])

const closeDialog = () => {
  emit("close");
}

// 임시 에이전트 상세정보
const detailInfoList = ref([
  { title: '카탈로그', value: '어플리케이션' },
  { title: '카테고리', value: '사내 업무관리' },
  { title: '언어', value: '한국어(KO)' },
  { title: 'AI언어 모델', value: 'ChatGPT 4', icon: 'prompt-gpt4' },
])

// 임시 사용자 의견
const vocList = ref([
  { avatar: '@avatar02.png', date: '2024-04-12 15:21:55', writer: '나문서', desc: '나생성 부장님 감사합니다. 업무에 유용하게 활용하고 있습니다.' },
  { avatar: '@avatar01.svg', date: '2024-04-12 15:21:55', writer: '나관리', desc: '좋은 아이디어로 멋진 기능 만들어 주시어 감사드려요^^' },
  { avatar: '@avatar03.png', date: '2024-04-12 15:21:55', writer: '나꼼꼼', desc: '부장님 감사합니다.' },
  { avatar: '@avatar01.svg', date: '2024-04-12 15:21:55', writer: '나공유', desc: '부장님 너무 감사 드립니다.' },
])

</script>

<template>
  <div
    class="absolute right-0 pl-scrollable w-[410px] h-[calc(100vh-103px)] border-l border-gray-200 bg-white">
    <!-- 에이전트 정보 -->
    <div>
      <div class="flex align-center h-[50px] px-4 sticky top-0 z-10 bg-[rgba(255,255,255,.9)]">
        <span class="text-[16px] font-bold">에이전트 정보</span>
        <div class="ml-auto">
          <v-btn
            min-width="24px"
            icon
            size="small"
            variant="text"
            @click="closeDialog()">
            <v-icon class="pl-icon20 in-close" ></v-icon>
          </v-btn>
        </div>
      </div>
      <div class="relative p-4 pt-0">
        <!-- 정보 가져오기 -->
        <div class="flex flex-column justify-center w-full bg-gray-100 border rounded-lg">
          <div class="flex align-center p-4">
            <v-icon
              :class="`flex-[0_0_30px] pl-icon20 grid-agent-${scenario.icon} scale-150`"></v-icon>
            <strong class="pl-2 text-[14px] truncate">
              {{scenario.title}}
            </strong>
          </div>
          <div class="text-sm px-4 ml-9">
            {{scenario.desc}}
          </div>
          <div class="flex justify-space-between p-4 ml-9">
            <div class="text-[13px] text-slate-600">
              <div class="flex align-center">
                <v-icon class="pl-icon20 card-date"></v-icon>
                <span class="ml-2">생성일</span>
                <span class="ml-2">{{scenario.createDate}}</span>
              </div>
              <div class="flex align-center mt-2">
                <v-icon class="pl-icon20 people"></v-icon>
                <span class="ml-2">생성자</span>
                <span class="ml-2">{{scenario.creator}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 에이전트 상세 정보 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">에이전트 상세 정보</span>
      </div>
      <div class="relative p-4 pt-0">
        <div
          class="flex py-2 border-b"
          v-for="item, index in detailInfoList"
          :key="item.id">
          <span class="w-[150px] text-[13px]">{{ item.title }}</span>
          <span class="text-[13px] ">
            <v-icon v-if="item.icon" :class="`pl-icon20 ${item.icon}`"></v-icon>
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
    <!-- 사용자 의견 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">사용자 의견</span>
      </div>
      <div class="relative p-4 pt-0">
        <div
          class="flex flex-column py-2 border-b"
          v-for="item, index in vocList"
          :key="item.id">
          <div class="flex align-center">
            <div class="flex-[0_0_30px]">
              <v-avatar
                size="34px"
                :image="useGetImageUrl(item.avatar)"></v-avatar>
            </div>
            <span class="pl-2 font-bold">{{ item.writer }}</span>
            <v-icon class="pl-icon20 voc-date ml-4 scale-75"></v-icon>
            <span class="pl-1">{{ item.date }}</span>
          </div>
          <div class="ml-[42px]">
            <div class="text-[13px] text-gray-500 ">{{ item.desc }}</div>
          </div>
        </div>
        <!-- 더보기 -->
        <div class="flex justify-center mt-2">
          <v-btn
            class="pl-btn type-line is-sub"
            variant="flat"
            size="small"
            append-icon="pl-icon20 arrow-up"
            >더보기</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>