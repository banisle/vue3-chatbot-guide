<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}

// 버튼 로딩
const loading = ref<boolean>(false)
const loadingDone = ref<boolean>(false)

const load = () => {
  loading.value = true
  setTimeout(() => (
    loadingDone.value = true
  ), 1500)
}
// 파일
const files = ref([])
const chk_files_multi = ref<boolean>(false)

// 업로드 결과
const uploadResult = ref([
  { icon: 'docu-type', title: '문서 종류', value: 'PDF' },
  { icon: 'docu-size', title: '문서 크기', value: '2,350KB' },
  { icon: 'page-count', title: '페이지 수', value: '25' },
  { icon: 'txt-count', title: '총 글자수', value: '3,265' },
])

</script>
<template>
  <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">지식 문서 등록</strong>
      <div class="ml-auto">
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="text"
          @click="closeDialog()">
          <v-icon class="pl-icon20 in-close-white" ></v-icon>
        </v-btn>
      </div>
    </div>
    <!-- body -->
    <div class="flex">
      <div class="flex flex-col gap-y-4 w-full px-6 py-4 border-t h-full">
        <div>
          <label class="pl-label" for="">
            생성 위치
          </label>
          <div class="p-4 rounded-lg bg-gray-100 border">
            <v-icon class="pl-icon-etc upload-docu"></v-icon>
            <span class="ml-2">한국클라우드 > 사내규정 > HR관리</span>
          </div>
        </div>
        <div>
          <div class="flex align-center">
            <label class="pl-label" for="">
              생성할 파일
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-checkbox
              v-model="chk_files_multi"
              label="다중 업로드"
              class="pl-check ml-auto"
              true-icon="pl-icon20 chk-on"
              false-icon="pl-icon20 chk-off"
              ></v-checkbox>
          </div>
          <div class="rounded-lg bg-gray-100 border">
            <v-file-input
              v-model="files"
              :show-size="1000"
              color="deep-purple-accent-4"
              placeholder="파일을 선택하십시오."
              append-inner-icon="pl-icon20 file-component"
              clear-icon="pl-icon20 in-close"
              variant="flat"
              :multiple="chk_files_multi"
              density="compact"
              prepend-icon=""
              hide-details
              >
              <template v-slot:selection="{ fileNames }">
                <template v-for="(fileName, index) in fileNames" :key="fileName">
                  <v-chip
                    v-if="index < 2"
                    class="me-2"
                    color="deep-purple-accent-4"
                    size="small"
                    label
                  >
                    {{ fileName }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline text-grey-darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </template>
            </v-file-input>
          </div>
          <div>
            <ul class="pl-list-dot is-no-border">
              <li>업로드 가능한 파일은 “PDF, MS Word, MS Excel, Text, 한글” 입니다.</li>
              <li>업로드할 문서를 지정 하신 후 [생성]버튼을 클릭하십시오.</li>
              <li>문서의 크기에 따라 시간이 다소 소요될 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <div v-if="loadingDone">
          <label class="pl-label" for="">
            업로드 결과
          </label>
          <div class="flex flex-column gap-y-2 p-4 rounded border ">
            <div
              class="flex"
              v-for="item, index in uploadResult"
              :key="item.id">
              <v-icon v-if="item.icon" :class="`pl-icon-etc ${item.icon}`"></v-icon>
              <span class="text-[13px] ml-2">{{ item.title }}</span>
              <strong class="text-[13px] ml-auto">
                {{ item.value }}
              </strong>
            </div>
          </div>
        </div>
        <div class="text-center" v-if="!loadingDone">
          <v-btn
            :loading="loading"
            class="pl-btn "
            color="#4f62cd"
            @click="load"
            variant="flat"
            width="160"
            >
            <template v-slot:loader>
              <v-progress-circular
                :size="20"
                :width="2"
                color="#FFF"
                indeterminate
              ></v-progress-circular>
              <span class="ml-2">
                문서 업로드중
              </span>
            </template>
            지식문서 생성
            </v-btn>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="flex justify-end pa-4 pt-2 gap-x-2 border-t">
      <v-btn
        class="pl-btn type-line"
        size="small"
        @click="closeDialog()"
        variant="flat">
        닫기</v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>