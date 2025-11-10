<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits, computed   } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";

const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
}

// 카드
interface CardInfo {
  filename: string;
  fileversion: string;
  docuViewCnt: number,
  reply: number,
}
const cardInfo = ref<CardInfo>(
  {
    fileversion: 'V1.3.0',
    filename: '인사규정.pdf',
    docuViewCnt: 3,
    reply: 3,
  }
)

// log
const historyLog = ref([
  {
    avatar: '@avatar02.png',
    name: '나꼼꼼',
    date: '2024-04-12 13:45:55',
    msg: '2024년도 대중교통 여비규정 변경으로 인한 변경 부분 변경하여 적용',
    reply: 2,
    like: 11,
    active: false,
    replyFocus: false,
    childReply: [
      {
        avatar: '@avatar03.png',
        name: '나문서',
        date: '2024-04-12 15:21:55',
        msg: '야근교통비를 구체화 했으면 좋을 것 같아요',
        owner: false,
      },
      {
        avatar: '@avatar01.svg',
        name: '나관리',
        date: '2024-04-12 15:21:55',
        msg: '수고하셨습니다.',
        owner: true,
      },
    ]
  },
  {
    avatar: '@avatar01.svg',
    name: '나관리',
    date: '2023-12-04 18:12:56',
    msg: '카테고리가 부적절하여 에이전트 카테고리를 변경했습니다.',
    reply: 0,
    like: 0,
    active: false,
    replyFocus: false,
  },
  {
    avatar: '@avatar03.png',
    name: '나문서',
    date: '2023-12-02 13:45:55',
    msg: 'Generative AI 문서 최초 등록',
    reply: 0,
    like: 7,
    active: false,
    replyFocus: false,
  },
])



</script>

<template>
  <div
    class="pl-scrollable panelDialog h-[calc(100vh-151px)] top-[151px]">
    <!-- title -->
    <div class="panelDialog--title">
      <span class="text-[16px] font-bold">문서 히스토리</span>
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
    <!-- content -->
    <div class="panelDialog--content">
      <!-- 카드 -->
      <div class="pl-card">
        <div class="pl-card--title bg-[#53AED5]">
          <strong>{{ cardInfo.filename }}</strong>
          <span class="ml-auto text-[12px]">{{ cardInfo.fileversion }}</span>
        </div>
        <div class="pl-card--content">
          <!-- info -->
          <div class="flex align-center">
            <div class="flex flex-column ml-2">
              <div>
                <strong class="inline-block w-[120px]">문서 이력 :</strong>
                <span>{{ cardInfo.docuViewCnt }}건</span>
              </div>
              <div class="mt-1">
                <strong class="inline-block w-[120px]">댓글 :</strong>
                <span>{{ cardInfo.reply }}건</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- list -->
      <div class="flex flex-column mt-2">
        <div
          class="flex flex-column py-3 "
          v-for="item,inedx in historyLog"
          :class="index === historyLog.length - 1 ? 'border-b-none' : 'border-b' "
          :key="item.id">
          <!-- 유저정보 -->
          <div class="flex align-center">
            <v-avatar
              size="34px"
              :image=useGetImageUrl(item.avatar)></v-avatar>
            <strong class="ml-2">{{ item.name }}</strong>
            <span class="ml-2">
              <v-icon class="pl-icon20 voc-date scale-75"></v-icon>
              <span class="ml-1">{{ item.date }}</span>
            </span>
          </div>
          <!-- 메시지 -->
          <div class="ml-8 border rounded-lg p-2">
            {{ item.msg }}
          </div>
          <!-- 버튼 -->
          <div class="flex gap-2 mt-2 ml-8 align-center">
            <div>
              <v-icon class="pl-icon20 comment-fill"></v-icon>
              <strong :class="`ml-2 ${ item.reply === 0 ? 'text-[#DDD]' : 'text-indigo'}`">{{ item.reply }}</strong>
            </div>
            <div class="ml-2">
              <v-icon class="pl-icon20 thumbs-up-fill"></v-icon>
              <strong :class="`ml-2 ${ item.like === 0 ? 'text-[#DDD]' : 'text-indigo'}`">{{ item.like }}</strong>
              <span
                @click="item.active = true"
                class="ml-2 rounded-full px-2 py-1 cursor-pointer hover:bg-gray-200">댓글</span>
            </div>
          </div>
          <!-- child -->
          <template v-if="item.childReply">
            <div class="flex flex-column gap-y-2 ml-6 mt-4 p-2 ">
              <template
                v-for="child in item.childReply"
                :key="child.id">
                <div class="flex">
                  <v-avatar
                    size="34px"
                    :image=useGetImageUrl(child.avatar)></v-avatar>
                  <div class="ml-1">
                    <div class="ml-2">
                      <strong>{{ child.name }}</strong>
                      <v-icon class="pl-icon20 voc-date scale-75 ml-2"></v-icon>
                      <span class="ml-1">{{ child.date }}</span>
                    </div>
                    <div class="px-2 text-[12px]">
                      {{ child.msg }}
                    </div>
                  </div>
                  <div
                    v-if="child.owner"
                    class="ml-auto flex-[0_0_30px] align-self-center text-center">
                    <v-icon class="pl-icon20 trash"></v-icon>
                  </div>
                </div>
              </template>
            </div>
          </template>
          <!-- input -->
          <template v-if="item.active">
            <div class="ml-8 mt-2">
              <v-text-field
                class="mt-2 pl-form"
                density="compact"
                variant="outlined"
                hide-details
                @update:modelValue="item.replyFocus = true"
                placeholder="댓글을 입력하세요."></v-text-field>
            </div>
            <div class="flex justify-end pa-4 pt-2 gap-x-2 ">
              <v-btn
                class="pl-btn type-line"
                size="small"
                @click="item.active = false"
                variant="flat">
                취소</v-btn>
              <v-btn
                class="pl-btn "
                color="#4f62cd"
                size="small"
                variant="flat"
                :disabled="!item.replyFocus"
                >
                확인</v-btn>
            </div>
          </template>

        </div>

      </div>



    </div>
  </div>
</template>

<style scoped>

</style>