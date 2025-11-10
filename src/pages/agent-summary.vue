<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

const catalogueList = ref([
  { title: '지식', value: 9 },
  { title: '데이터', value: 1 },
  { title: '어플리케이션', value: 2 },
])
const categoryList = ref([
  { title: '고객 응대', value: '315' },
  { title: '사내 업무지식', value: '20,312' },
  { title: '사내 업무관리', value: '1,247' },
  { title: '외부지식', value: '21,456' },
  { title: '기타', value: '7,300' },
])
const newAgentList = ref([
  { icon: 'type01', title: '사내 규정관리 챗봇', desc: '사내 인사관리 규정을 대상으로 한 QA 챗봇입니다.' },
  { icon: 'type08', title: '보고서 작성 챗봇', desc: '사내 인사관리 규정을 대상으로 한 QA 챗봇입니다.' },
])
</script>

<template>
  <div class="pl-scrollable flex flex-column w-[410px] h-[calc(100vh-103px)] border-l border-gray-200 bg-white">
    <!-- 에이전트 현황 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">에이전트 현황</span>
      </div>
      <div class="relative p-4 pt-0">
        <div class="flex align-center w-full p-4 bg-indigo rounded-lg">
          <div class="flex flex-[0_0_100px] justify-center">
            <span class="text-[32px]">12</span>
          </div>
          <div class="flex flex-1 border-l ">
            <div class="flex flex-1 flex-column align-center justify-center">
              <strong class="text-[14px]">활성</strong>
              <span class="text-[14px]">10 <span class="text-[12px]">개</span></span>
            </div>
            <div class="flex flex-1 flex-column align-center">
              <strong class="text-[14px]">비활성</strong>
              <span class="text-[14px]">2 <span class="text-[12px]">개</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 카탈로그 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">카탈로그</span>
      </div>
      <div class="relative p-4 pt-0">
        <div
          class="flex py-2 align-center justify-space-between"
          v-for="item, index in catalogueList"
          :key="item.id">
          <span class="text-[13px]">{{ item.title }}</span>
          <div class="flex w-[290px] align-center">
            <v-progress-linear
              class="flex-[0_1_250px]"
              color="indigo"
              :model-value="item.value * 10"
              height="10"
              rounded
            ></v-progress-linear>
            <strong class="w-[120px] text-right">{{ item.value }}</strong>
          </div>
        </div>
      </div>
    </div>
    <!-- 카테고리 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">카테고리</span>
      </div>
      <div class="relative p-4 pt-0">
        <div
          class="flex py-2 border-b"
          v-for="item, index in categoryList"
          :key="item.id">
          <span class="text-[13px]">{{ item.title }}</span>
          <strong class="text-[13px] ml-auto">{{ item.value }}</strong>
        </div>
      </div>
    </div>
    <!-- 새로운 에이전트 -->
    <div>
      <div class="flex align-center h-[50px] px-4 ">
        <span class="text-[16px] font-bold">새로운 에이전트 </span>
      </div>
      <div class="relative p-4 pt-0">
        <div
          class="flex py-2 border-b"
          v-for="item, index in newAgentList"
          :key="item.id">
          <v-icon
            :class="`pl-icon20 grid-agent-${item.icon} scale-150 flex-[0_0_30px] mt-[10px]`"></v-icon>
          <div class="ml-2 w-full">
            <div class="text-[13px] truncate">{{ item.title }}</div>
            <div class="text-[13px] text-gray-500 ">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>