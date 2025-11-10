<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}
const stepTitleList = ref([
  { title: '챗봇 기본 프로필 설정' },
  { title: 'GenAI 언어 모델 및 기본 설정' },
  { title: '챗봇 생성 완료' },
])

const regForm = ref<object>({
  catalogueModel: 0,
  catalogueOpt: [
    { title: '지식', value: 0}
  ]
})

</script>
<template>
  <div class="rounded-lg bg-white w-[800px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">지식 카탈로그 등록</strong>
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
      <!-- title -->
      <div class="flex-[0_0_250px] px-6 py-8 bg-gray-100">
        <strong class="text-[18px]">Add Catalog</strong>
        <ul class="pl-list-dot is-no-border">
          <li>My 워크스페이스의 지식 카탈로그는 지식만 등록할 수 있습니다.</li>
          <li>데이터, 어플리케이션은 에이전트 빌드를 통해 등록하십시오.</li>
        </ul>
      </div>
      <!-- content -->
      <div class="flex-1 h-[650px] pl-scrollable">
        <div class="flex flex-col gap-y-4 w-full px-6 py-8 border-t h-full">
          <div>
            <label class="pl-label" for="">
              카탈로그
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-select
              v-model="regForm.catalogueModel"
              :items="regForm.catalogueOpt"
              class=" pl-form"
              density="compact"
              variant="outlined"
              menu-icon="pl-icon20 arrow-up"
              disabled
              hide-details></v-select>
          </div>
          <div>
            <label class="pl-label" for="">
              카테고리
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-select
              class=" pl-form"
              :items="[
                '고객 응대',
                '사내 업무지식',
                '외부지식',
                '기타',
              ]"
              density="compact"
              variant="outlined"
              placeholder="선택하세요."
              menu-icon="pl-icon20 arrow-up"
              hide-details></v-select>
          </div>
          <div>
            <label class="pl-label" for="">
              제목
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-text-field
              class=" pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="제목을 입력하세요."></v-text-field>
          </div>
          <div>
            <label class="pl-label" for="">
              내용
            </label>
            <v-textarea
              class="pl-form"
              density="compact"
              variant="outlined"
              no-resize
              hide-details
              placeholder="지식 내용을 입력하세요.">
            </v-textarea>
          </div>
          <div class="border-t pt-3">
            <label class="pl-label" for="">
              파일
              <v-badge color="red" dot inline></v-badge>
            </label>
            <div class="file-drop ">
              <div class="drop-msg">여기에 파일을 끌어 놓거나 클릭하십시오.</div>
            </div>
          </div>
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
      <v-btn
        class="pl-btn "
        color="#4f62cd"
        size="small"
        variant="flat"
        >
        확인</v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>