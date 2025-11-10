<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits, computed  } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}
const statusGauge =(value: number): void => {
  switch (true) {
    case value >= 0 && value <= 30:
      return 'Low'
      break;
    case value >= 31 && value <= 60:
      return 'Ok'
      break;
    case value >= 61 && value <= 80:
      return 'Good'
      break;
    case value >= 81 && value <= 100:
      return 'Great'
      break;
    default:
  }
}

// 발화
const converseList = ref<array>([
  { text: '영업팀에 문의하고 싶습니다.', disabled: false, },
  { text: '영업팀 연락처를 알려주세요', disabled: false, },
  { text: '영업 담당자를 알고 싶어요', disabled: false, },
  { text: '영업팀에 어떻게 문의할 수 있나요?', disabled: false, },
  { text: '영업 담당자와 통화하고 싶습니다.', disabled: false, },
  { text: '영업팀은 어디로 문의할 수 있나요?', disabled: false, },
  { text: '영업팀에 문의할 수 있나요?', disabled: false, },
])
const limit = ref<number>(1)
const limitedList = computed(() => {
  return converseList.value.slice(0, limit.value)
})

// 버튼 로딩
const loading = ref<boolean>(false)
const loadingDone = ref<boolean>(false)

const load = (item) => {
  loading.value = true
  limit.value = item
  setTimeout(() => (
    loadingDone.value = true
  ), 1500)
}

const aiCopyList = ref([
  { title: '1개의 응답 자동 생성', value: 1 },
  { title: '3개의 응답 자동 생성', value: 3 },
  { title: '5개의 응답 자동 생성', value: 5 },
  { title: '10개의 응답 자동 생성', value: 10 },
])

</script>

<template>
 <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">인텐트 생성</strong>
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
    <div class="flex flex-column">
      <div class="flex-1 ">
        <div class="flex flex-col gap-y-4 w-full px-6 py-4 border-t h-full">
          <div>
            <label class="pl-label" for="">
              인텐트
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="인텐트를 입력하세요.(영문자만 사용할 수 있습니다.)"></v-text-field>
          </div>
          <div>
            <label class="pl-label" for="">
              설명
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-textarea
              class="pl-form "
              density="compact"
              variant="outlined"
              no-resize
              hide-details
              placeholder="인텐트 설명을 입력하세요.">
            </v-textarea>
          </div>
        </div>
      </div>
      <div class="w-full border-t px-6 ">
        <div class="flex flex-col gap-y-4 w-full py-4 h-full">
          <div>
            <template v-if="loadingDone">
              <div class="flex align-center">
                <label class="pl-label" for="">
                  발화
                </label>
                <div class="pl-gauage ml-2" >
                  <div :class="`pl-gauage--stat ${statusGauge(90)}`" :style="`width: ${90}%`"></div>
                </div>
                <v-btn
                  class="ml-auto"
                  max-width="30px"
                  max-height="30px"
                  icon
                  size="small"
                  variant="flat"
                  color="transparent"
                  @click="limitedList.push('')"
                  >
                  <span class="text-[18px]">+</span>
                </v-btn>
              </div>
              <div class="flex flex-col gap-y-2 mt-2">
                <template v-for="item in limitedList" :key="item.id">
                  <div class="flex align-center">
                    <v-text-field
                      class="pl-form"
                      density="compact"
                      variant="outlined"
                      :disabled=item.disabled
                      hide-details
                      :modelValue="item.text"></v-text-field>
                    <v-btn
                      class="ml-2"
                      max-width="30px"
                      max-height="30px"
                      icon
                      size="small"
                      variant="flat"
                      color="transparent"
                      @click="limitedList.splice(item,1)"
                      >
                      <v-icon class="pl-icon20 minus-small"></v-icon>
                    </v-btn>
                  </div>
                </template>
              </div>
            </template>
            <template v-if="!loadingDone">
              <div class="flex align-center">
                <label class="pl-label" for="">
                  발화
                </label>
                <div class="pl-gauage ml-2" >
                  <div :class="`pl-gauage--stat ${statusGauge(0)}`" :style="`width: ${0}%`"></div>
                </div>
                <v-btn
                  class="ml-auto"
                  max-width="30px"
                  max-height="30px"
                  icon
                  size="small"
                  variant="flat"
                  color="transparent"
                  @click="converseList.push('')"
                  >
                  <span class="text-[18px]">+</span>
                </v-btn>
              </div>
              <div class="flex flex-col gpa-y-4">
                <div class="flex align-center">
                  <v-text-field
                    class="pl-form"
                    density="compact"
                    variant="outlined"
                    placeholder="샘플 구문 발화를 입력하십시오."
                    hide-details
                    ></v-text-field>
                  <v-btn
                    class="ml-2"
                    max-width="30px"
                    max-height="30px"
                    icon
                    size="small"
                    variant="flat"
                    color="transparent"
                    >
                    <v-icon class="pl-icon20 minus-small"></v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="text-center" >
                <v-menu
                  location="bottom"
                  class="dropUi"
                  >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      :loading="loading"
                      class="pl-btn w-full mt-2"
                      prepend-icon="pl-icon20 wand-white"
                      color="#4f62cd"
                      variant="flat"
                      >
                      <template v-slot:loader>
                        <v-progress-circular
                          :size="20"
                          :width="2"
                          color="#FFF"
                          indeterminate
                        ></v-progress-circular>
                        <span class="ml-2">
                          AI가  유사 구문을 생성 중 입니다.
                        </span>
                      </template>
                      추천 문구 AI 자동 생성
                    </v-btn>
                  </template>
                  <v-list >
                    <v-list-item
                      v-for="(item, i) in aiCopyList"
                      :key="i"
                      @click="load(item.value)"
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
            </template>
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
        @click=""
        variant="flat"
        >
        생성</v-btn>
    </div>

  </div>
</template>

<style scoped>

</style>