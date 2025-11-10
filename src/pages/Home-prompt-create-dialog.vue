<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}

const templateType = ref<string>('base')

const templateList = ref([
  { type: 'base', active: true, title: '기본 템플릿', icon: 'base-template', desc: '반복적으로 사용하고 싶은 프롬프트를 생성합니다.' },
  { type: 'custom', active: false, title: '사용자 정의 템플릿', icon: 'custom-template', desc: '프롬프트를 구조화하고 취향에 맞게 답변을 조정' },
])

const selectTemplate = (item) => {
  removeTemplateActive();
  templateType.value = item.type
  item.active = true
}

const removeTemplateActive = () => {
  for (let index = 0; index < templateList.value.length; index++) {
    templateList.value[index].active = false
  }
}

const regForm = ref<object>({
  categoryOpt: [
    { title: '요약', value: false },
    { title: '번역', value: false },
    { title: '작문', value: false },
    { title: '교정', value: false },
    { title: '창작', value: false },
    { title: '분석', value: false },
    { title: '기타', value: true },
  ],
  roleModel: 0,
  roleOpt: [
    { title: '범용', value: 0 },
    { title: '마케팅', value: 1 },
    { title: '기타', value: 2 },
  ],
  baseAi: 0,
  baseAiOpt: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  useLangModel: 0,
  useLangOpt: [
    {title: '한국어(KO)', value: 0},
    {title: '영어(EN)', value: 1},
    {title: '베트남(VN)', value: 2},
    {title: '말레이지아(MY)', value: 3},
    {title: '인도네시아(ID)', value: 4},
  ],
  shareModel: 0,
  shareOpt: [
    { title: '나에게만 공개', value: 0 },
  ],
  prompt: `{출장지]로 출장을 갈 건데
{출발지}에서 가장 빨리 갈 수 있는 교통편을 추천해줘
{조건} 이었으면 좋겠어
{동행자}와 함께 갈 거야`,
  prompt2: `보고 대상 : {보고 대상]
보고 내용 : {보고 내용}
보고 결과 : {보고 결과}
보고 스타일 : {보고 스타일}
보고 길이 {보고 길이}

위의 정보를 바탕으로 보고서를 만들어 줘`
})
const tab = ref(null)

// 사용자 설정 어코디언
const customCard = ref<array>([
  { active: true, title: '보고 대상' },
  { active: false, title: '보고 내용' },
  { active: false, title: '보고 결과' },
  { active: false, title: '보고 스타일' },
  { active: false, title: '보고 길이' },
])

// 보고대상
const msgTarget = ref<object>({
  model01: 0,
  modelOpt01: [
    { title: '한 줄 입력', value: 0},
    { title: '여러 줄 입력', value: 1},
    { title: '단일 선택', value: 2},
    { title: '복수 선택', value: 3},
  ],
  model02: 0,
  modelOpt02: [
    { title: '필수 입력', value: 0},
  ],
})
</script>
<template>
  <div class="rounded-lg bg-white w-[1200px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">프롬프트 템플릿 스튜디오</strong>
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
        <strong class="text-[18px]">Create Prompt</strong>
        <p class="text-gray-500">만들고자 하는 프롬프트 템플릿의 유형에 따라 생성하십시오.</p>
        <!-- 템플릿 선택 -->
        <div class="flex flex-col gap-y-2 mt-8">
          <div
            class="flex rounded-lg bg-white p-4 cursor-pointer"
            style="box-shadow: inset 0 0 0 1px #bdbdbd"
            :style="item.active ? 'box-shadow: inset 0 0 0 1px #4f62cd' : ''"
            v-for="item in templateList"
            @click="selectTemplate(item)"
            :key="item.id">
            <v-icon :class="`pl-icon-etc ${ item.icon }`"></v-icon>
            <div class="ml-2">
              <strong class="text-[14px]">{{ item.title }}</strong>
              <p class="text-[12px]">{{ item.desc }}</p>
            </div>
          </div>

        </div>
      </div>
      <!-- content -->
      <div class="flex-[0_0_450px] h-[650px] pl-scrollable border-r">
        <div class="flex flex-col gap-y-4 w-full px-6 py-8 ">
          <div>
            <label class="pl-label" for="">
              템플릿 명
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="템플릿 명을 입력하세요."></v-text-field>
          </div>
          <!-- 기본 템플릿 -->
          <template v-if="templateType === 'base'">
            <div>
              <label class="pl-label" for="">
                카테고리
                <v-badge color="red" dot inline></v-badge>
              </label>
              <p class="text-gray-500">템플릿 카테고리는 3개까지 지정할 수 있습니다.</p>
              <div class="flex gap-x-6 flex-wrap justify-start">
                <v-checkbox
                  v-for="chk in regForm.categoryOpt" :key="chk.id"
                  v-model="chk.value"
                  :label="chk.title"
                  class="pl-check "
                  true-icon="pl-icon20 chk-on"
                  false-icon="pl-icon20 chk-off"
                  ></v-checkbox>
              </div>
            </div>
          </template>
          <!-- 사용자 정의 템플릿 -->
          <template v-else>
            <v-tabs
              v-model="tab"
              color="indigo"
              density="compact"
              class="border-b pl-default-tab"
              height="32"
              >
              <v-tab value="tab0">기본 정보</v-tab>
              <v-tab value="tab1">사용자 설정</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <!-- 기본 정보 -->
              <v-window-item value="tab0">
                <div>
                  <label class="pl-label" for="">
                    카테고리
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <p class="text-gray-500">템플릿 카테고리는 3개까지 지정할 수 있습니다.</p>
                  <div class="flex gap-x-6 flex-wrap justify-start">
                    <v-checkbox
                      v-for="chk in regForm.categoryOpt" :key="chk.id"
                      v-model="chk.value"
                      :label="chk.title"
                      class="pl-check "
                      true-icon="pl-icon20 chk-on"
                      false-icon="pl-icon20 chk-off"
                      ></v-checkbox>
                  </div>
                </div>
              </v-window-item>
              <!-- 사용자 설정 -->
              <v-window-item value="tab1">
                <div class="flex align-center">
                  <p class="text-gray-500">프롬프트에서 설정한 사용자 변수에 따라 설정 값을 지정하십시오.</p>
                  <v-tooltip text="새로고침" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        class="ml-auto"
                        v-bind="props"
                        variant="text"
                        icon
                        size="small"
                        >
                        <v-icon class="pl-icon20 refresh"></v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </div>
                <!-- 어코디언 -->
                <div class="pl-acco-card type-sm w-full" >
                  <template v-for="item,index in customCard" :key="item.id">
                    <div
                      class="pl-acco-card--title "
                      :class="index === customCard.length - 1 ? 'border-b-none' : 'border-b' "
                      >
                      <v-icon class="pl-icon20 content-list"></v-icon>
                      <div class="pl-2">{{ item.title }}</div>
                      <v-tooltip :text="item.active ? '닫힘' : '펼침'" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="ml-auto"
                            v-bind="props"
                            variant="flat"
                            icon
                            size="small"
                            @click="item.active = !item.active"
                            >
                            <v-icon :class="`pl-icon20 ${ item.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </div>
                    <div
                      v-if="item.active"
                      class="pl-acco-card--content p-4 border-0 border-b">
                      <div class="pl-grid-box "
                        style="grid-template-columns: 36fr 30fr 33fr ">
                        <v-select
                          class=" pl-form"
                          v-model="msgTarget.model01"
                          :items="msgTarget.modelOpt01"
                          density="compact"
                          variant="outlined"
                          menu-icon="pl-icon20 arrow-up"
                          hide-details></v-select>
                        <v-text-field
                          v-model="item.model"
                          class="pl-form "
                          density="compact"
                          variant="outlined"
                          hide-details
                          placeholder="최대 글자 수"
                          ></v-text-field>
                        <v-select
                          class=" pl-form"
                          v-model="msgTarget.model02"
                          :items="msgTarget.modelOpt02"
                          density="compact"
                          variant="outlined"
                          menu-icon="pl-icon20 arrow-up"
                          hide-details></v-select>
                      </div>
                      <v-text-field
                        class="pl-form mt-2"
                        density="compact"
                        variant="outlined"
                        hide-details
                        placeholder="가이드 메시지를 입력하세요."
                        ></v-text-field>
                    </div>
                  </template>
                </div>
              </v-window-item>
            </v-window>

          </template>
          <div class="border-t mt-2 pt-3">
            <label class="pl-label" for="">
              역할
            </label>
            <v-select
              v-model="regForm.roleModel"
              class="pl-form"
              :items="regForm.roleOpt"
              density="compact"
              variant="outlined"
              placeholder="선택하세요."
              menu-icon="pl-icon20 arrow-up"
              hide-details></v-select>
          </div>
          <div >
            <label class="pl-label" for="">
              대화 모델
            </label>
            <v-select
              v-model="regForm.baseAi"
              class=" pl-form"
              :items="regForm.baseAiOpt"
              density="compact"
              variant="outlined"
              placeholder="선택하세요."
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
              사용 언어
            </label>
            <v-select
              v-model="regForm.useLangModel"
              class=" pl-form"
              :items="regForm.useLangOpt"
              density="compact"
              variant="outlined"
              placeholder="선택하세요."
              menu-icon="pl-icon20 arrow-up"
              hide-details></v-select>
          </div>
          <div >
            <label class="pl-label" for="">
              공개 범위
            </label>
            <v-select
              v-model="regForm.shareModel"
              class=" pl-form"
              :items="regForm.shareOpt"
              density="compact"
              variant="outlined"
              placeholder="선택하세요."
              menu-icon="pl-icon20 arrow-up"
              hide-details></v-select>
          </div>
          <div >
            <label class="pl-label" for="">
              템플릿 설명
            </label>
            <v-text-field
              class="pl-form"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="템플릿 설명을 입력하세요."></v-text-field>
          </div>
        </div>
      </div>
      <!-- 프롬프트 -->
      <div class="flex flex-col w-full gap-y-4 px-6 pt-8 pb-0 border-t h-full">
        <div>
          <div class="flex align-center">
            <label class="pl-label" for="">
              프롬프트
              <v-badge color="red" dot inline></v-badge>
            </label>
            <v-tooltip text="프롬프트 복사" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ml-auto"
                  min-width="24px"
                  icon
                  size="small"
                  variant="text"
                  >
                  <v-icon class="pl-icon20 copy-paste"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>

          </div>
          <template v-if="templateType === 'base'">
            <v-textarea
              v-model="regForm.prompt"
              class="pl-form"
              density="compact"
              variant="outlined"
              no-resize
              hide-details
              row-height="25"
              rows="28"
              >
            </v-textarea>
          </template>
          <template v-else>
            <v-textarea
              v-model="regForm.prompt2"
              class="pl-form"
              density="compact"
              variant="outlined"
              no-resize
              hide-details
              row-height="25"
              rows="28"
              >
            </v-textarea>
          </template>
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