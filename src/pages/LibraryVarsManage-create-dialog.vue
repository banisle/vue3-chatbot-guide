<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}
const colorPalette = ref<object>({
  mainColor: [
    '#4F62CD',
    '#00B050',
    '#003668',
    '#FFC000',
    '#015D58',
    '#00B0F0',
    '#C54776',
    '#9CA8B6'
  ],
  activeColor: '#4F62CD',
  swatches: [],
})
const initToggle = ref<bolean>(false)

</script>
<template>
  <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">변수 생성</strong>
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
              변수 명(한글)
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="한글 변수 명을 입력하세요"></v-text-field>
          </div>
          <div>
            <label class="pl-label" for="">
              변수 ID(영문)
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="영문 변수 명을 입력하세요"></v-text-field>
          </div>
          <div>
            <label class="pl-label" for="">
              설명
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="변수 설명을 입력하세요"></v-text-field>
          </div>
          <div>
            <label class="pl-label" for="">
              색상
            </label>
            <div class="flex gap-2 align-center">
              <div
                v-for="color in colorPalette.mainColor"
                :style="`background-color: ${color}`"
                :class="`pl-inline-swatch rounded-full w-[40px] h-[40px] ${ colorPalette.activeColor === color ? 'active' : ''}`"
                @click="colorPalette.activeColor = color"
                :key="color.id">
              </div>
              <!-- color picker -->
              <VSwatches
                trigger-style="width: 40px; height: 40px"
                class="pl-swatches"
                :swatches="colorPalette.swatches"
                popover-x="right"
                shapes="circles"
                show-fallback
                fallback-input-type="color"
                v-model="colorPalette.activeColor" >
              </VSwatches>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full border-t px-6 pt-4 pb-4">
        <div class="flex align-center">
          <label class="pl-label" for="">
            초기 값
          </label>
          <v-switch
            height="30px"
            class="pl-switch ml-auto"
            inset
            color="#4f62cd"
            hide-details
            v-model="initToggle"></v-switch>
        </div>
        <v-text-field
          v-if="initToggle"
          class="mt-2 pl-form"
          density="compact"
          variant="outlined"
          hide-details
          placeholder="변수의 초기값을 입력하세요."></v-text-field>
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
        저장</v-btn>
     </div>

  </div>
</template>

<style scoped>

</style>