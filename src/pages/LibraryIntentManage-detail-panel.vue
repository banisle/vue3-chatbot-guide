<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits  } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";
const emit = defineEmits(["close"]);

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
  { text: '샘플 문구 또는{entity}을 입력하세요', disabled: true, },
  { text: '영업팀에 문의하고 싶습니다.', disabled: false, },
  { text: '영업팀 연락처를 알려주세요', disabled: false, },
  { text: '영업 담당자를 알고 싶어요', disabled: false, },
  { text: '영업팀에 어떻게 문의할 수 있나요?', disabled: false, },
  { text: '영업 담당자와 통화하고 싶습니다.', disabled: false, },
  { text: '영업팀은 어디로 문의할 수 있나요?', disabled: false, },
  { text: '영업팀에 문의할 수 있나요?', disabled: false, },
])
</script>
<template>
  <div class="pl-scrollable panelDialog h-[calc(100vh-100px)] top-[100px]">
    <!-- title -->
    <div class="panelDialog--title">
      <span class="text-[16px] font-bold">Customer_stories</span>
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
        <div class="pl-card--title bg-[#449127]">
          <strong>신뢰도 : 100 중 90</strong>
          <v-icon class="pl-icon20 smile-good ml-auto"></v-icon>
        </div>
        <div class="pl-card--content">
          <!-- info -->
          <div class="">
            인텐트에는 높은 수준의 정확성을 유지하기에 충분한 문구가 포함되어 있습니다,.
          </div>


        </div>
      </div>
      <!-- content -->
      <div class="flex flex-col gap-y-4 w-full py-4 h-full">
        <div>
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
              @click="converseList.push('')"
              >
              <span class="text-[18px]">+</span>
            </v-btn>
          </div>
          <div class="flex flex-col gap-y-2 mt-2">
            <template v-for="item in converseList" :key="item.id">
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
                  @click="converseList.splice(item,1)"
                  >
                  <v-icon class="pl-icon20 minus-small"></v-icon>
                </v-btn>
              </div>
            </template>
          </div>
          <v-btn
            class="pl-btn w-full mt-2"
            prepend-icon="pl-icon20 wand-white"
            color="#4f62cd"
            variant="flat">
            추천 문구 AI 자동 생성
          </v-btn>
        </div>
      </div>
    </div>
    <!-- 인텐트 설명 -->
    <div class="flex align-center border-t border-b p-4">
      인텐트 설명
      <v-icon
        class="pl-icon20 arrow-up ml-auto">
      </v-icon>
    </div>
  </div>
</template>

<style scoped>

</style>