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
  tool: string;
  filesize: string;
  owner: string,
  lastOwner: string,
  date: string,
  lastDate: string,
  modCnt: number,
  pageCnt: number,
  totalTextCnt: string,
}
const cardInfo = ref<CardInfo>(
  {
    fileversion: 'V1.3.0',
    filename: '인사규정.pdf',
    tool: 'Adobe Acrobat',
    filesize: '2,350KB',
    owner: '나관리',
    lastOwner: '나문서',
    date: '2024-04-12 14:23:54',
    lastDate: '2024-05-11 16:17:45',
    modCnt: 3,
    pageCnt: 25,
    totalTextCnt: '3,265'
  }
)

// tags
const tags = {
  addTagValue : ref(null),
  inputTagSize : ref(null),
  list: ref([
    { text: '복리 후생', active: true},
  ]),
}

const addTag = () => {
  const addTagItem = { text: tags.addTagValue.value, active: true };

  let tagVal = tags.addTagValue.value.trim();
  if( tagVal.length !== 0 ) {
    tags.list.value.push(addTagItem);
    tags.addTagValue.value = '';
    tags.inputTagSize.value = 0;
  }
}
const onInputTag = () => {
  tags.inputTagSize.value = tags.addTagValue.value.length;
}

const computedTagSize = computed(() => {
  return `flex: 0 0 ${ tags.inputTagSize.value + 8 }ch;`;
})


</script>

<template>
  <div
    class="pl-scrollable panelDialog h-[calc(100vh-151px)] top-[151px]">
    <!-- title -->
    <div class="panelDialog--title">
      <span class="text-[16px] font-bold">문서정보</span>
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
        <div class="pl-card--title bg-[#4F62CD]">
          <strong>{{ cardInfo.filename }}</strong>
          <span class="ml-auto text-[12px]">{{ cardInfo.fileversion }}</span>
        </div>
        <div class="pl-card--content">
          <!-- info -->
          <div class="flex align-center">
            <div class="flex flex-column ml-2">
              <div>
                <strong class="inline-block w-[120px]">작성 도구 :</strong>
                <span>{{ cardInfo.tool }}</span>
              </div>
              <div class="mt-1">
                <strong class="inline-block w-[120px]">문서 크기 :</strong>
                <span>{{ cardInfo.filesize }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- info -->
      <div class="">
        <div class="mt-4 flex flex-column gap-y-2">
          <div class="flex">
            <v-icon class="pl-icon20 people"></v-icon>
            <strong class="ml-2 w-[120px]">작성자</strong>
            <span class="">{{ cardInfo.owner }}</span>
          </div>
          <div class="flex">
            <strong class="ml-7 w-[120px]">마지막 수정자</strong>
            <span class="">{{ cardInfo.lastOwner }}</span>
          </div>
        </div>
        <div class="border-t mt-4 py-4 flex flex-column gap-y-2">
          <div class="flex">
            <v-icon class="pl-icon20 card-date"></v-icon>
            <strong class="ml-2 w-[120px]">작성일</strong>
            <span class="">{{ cardInfo.date }}</span>
          </div>
          <div class="flex">
            <strong class="ml-7 w-[120px]">마지막 수정일</strong>
            <span class="">{{ cardInfo.lastDate }}</span>
          </div>
          <div class="flex">
            <strong class="ml-7 w-[120px]">수정 횟수</strong>
            <span class="">{{ cardInfo.modCnt }}</span>
          </div>
        </div>
        <div class="border-t mt-4 py-4 flex flex-column gap-y-2">
          <div class="flex">
            <v-icon class="pl-icon20 pages"></v-icon>
            <strong class="ml-2 w-[120px]">페이지 수</strong>
            <span class="">{{ cardInfo.pageCnt }}</span>
          </div>
          <div class="flex">
            <strong class="ml-7 w-[120px]">총 글자수</strong>
            <span class="">{{ cardInfo.totalTextCnt }}</span>
          </div>
        </div>
      </div>
      <!-- 키워드 -->
      <div class="flex flex-col gap-y-4 w-full  py-4 border-t h-full">
        <div>
          <label class="pl-label" for="">
            카테고리
          </label>
          <div class="pl-tags-wrap">
            <v-chip-group
              selected-class="active-tag"
              column
              >
              <template v-for="tag in tags.list.value" >
                <v-chip
                  v-show="tag.active"
                  closable
                  close-icon="pl-icon20 in-close scale-75"
                  @click:close="tag.active = false"
                >
                  {{ tag.text }}
                </v-chip>
              </template>
              <template>
              </template>
            </v-chip-group>
            <!-- 추가 입력 -->
            <v-text-field
              v-model="tags.addTagValue.value"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="키워드를 입력"
              append-inner-icon="pl-icon20 edit"
              @click:append-inner="addTag()"
              @keydown.enter="addTag()"
              @update:modelValue="onInputTag"
              :style="computedTagSize"
              class="pl-form is-tag">
            </v-text-field>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>