<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits, computed  } from 'vue'
const emit = defineEmits(["close",]);

const closeDialog = () => {
  emit("close");
}
const setting = ref<object>({
  radioModel: 0,
  radioGrp: [
    { title: '대형 언어 모델(LLM)', value: 0},
    { title: '자연어(NLU)', value: 1},
  ],
  model: 0,
  opt: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  temperature: '0.10',
  prompt: `당신은 발화가 주어지고 그것을 행동으로 분류해야 합니다. 행동 클래스로만 응답하십시오. 발화가 어떤 행동 설명과도 일치하지 않으면 없음을 출력합니다.
이제 심호흡을 하고 다음 발화를 분류합니다.
u: 따뜻한 핫초코를 원해요: a:WARM_DRIKE
###`
})
</script>
<template>
  <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">의도 분류 설정</strong>
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
      <div class="p-4">
        <p class="font-bold">의도를 분류할 모델을 선택하십시오.</p>
        <v-radio-group
          inline
          v-model="setting.radioModel"
          hide-details
          >
          <v-radio
            v-for="radio in setting.radioGrp" :key="radio.id"
            :label="radio.title"
            :value="radio.value"
            class="pl-radio"></v-radio>
        </v-radio-group>
      </div>
      <div class="flex flex-col gap-y-4 w-full px-6 py-4 border-t h-full">
        <div>
          <label class="pl-label" for="">
            AI 모델
            <v-badge color="red" dot inline></v-badge>
          </label>
          <v-select
            :items="setting.opt"
            v-model="setting.model"
            class="pl-form"
            density="compact"
            variant="outlined"
            placeholder="챗봇의 이름을 입력하세요."
            menu-icon="pl-icon20 arrow-up"
            hide-details>
            <template v-slot:selection="{ item, index }">
              <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
              <span class="pl-2 text-[13px]">{{ item.title }}</span>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :title="item.title">
                <template v-slot:prepend>
                  <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
                </template>
              </v-list-item>
            </template>
          </v-select>
        </div>
        <div >
          <label class="pl-label" for="">
            Temperature
          </label>
          <div>
            <v-slider
              v-model="setting.temperature"
              min="0"
              max="1"
              :step="0.1"
              hide-details
              track-size="1"
              thumb-size="15"
              color="#4f62cd"
              >
              <template v-slot:append>
                <v-text-field
                  v-model="setting.temperature"
                  style="width: 50px"
                  class="pl-form is-sm ml-4"
                  reverse
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </template>
            </v-slider>
          </div>
        </div>
        <div class="border-t pt-2">
          <label class="pl-label" for="">
            Prompt
          </label>
          <v-textarea
            class="pl-form "
            density="compact"
            variant="outlined"
            no-resize
            hide-details
            :model-value="setting.prompt"
            >
          </v-textarea>
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
        확인</v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>