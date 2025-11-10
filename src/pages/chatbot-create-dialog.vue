<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
const emit = defineEmits(["close","saveStep"]);

const closeDialog = () => {
  emit("close");
}
const saveStep = () => {
  emit("saveStep");
}

const channelList = ref([
  { active: true, icon: 'knowledge', title: '지식' },
  { active: false, icon: 'data', title: '데이터' },
  { active: false, icon: 'app', title: '어플리케이션' },
  { active: false, icon: 'connector', title: '커넥터' },
])

const selectChannel = (item) => {
  removeChannelActive();
  item.active = true;
}

const removeChannelActive = () => {
  for (let index = 0; index < channelList.value.length; index++) {
    channelList.value[index].active = false
  }
}

// step
const currentStep = ref<number>(1)
const chatbotCreate = ref<object>({
  lang : '한국어(KO)',
  langOpt: ['한국어(KO)', '영어(EN)', '베트남(VN)', '말레이지아(MY)', '인도네시아(ID)',], })
const stepTitleList = ref([
  { title: '챗봇 기본 프로필 설정' },
  { title: 'GenAI 언어 모델 및 기본 설정' },
  { title: '챗봇 생성 완료' },
])
const prevStep = () => {
  currentStep.value -= 1
}
const nextStep = () => {
  currentStep.value += 1
}
const prompt = ref<object>({
  model: 0,
  opt: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  temperature: '0.7',
  maxTokens: '128',
  chunkLimit: '3',

})
const passInput = ref<boolean>(false)

</script>
<template>
  <div class="rounded-lg bg-white w-[800px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">에이전트 생성</strong>
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
      <!-- step -->
      <div class="flex-[0_0_250px] px-6 py-8 bg-gray-100">
        <strong class="text-[18px]">챗봇 에이전트 생성하기</strong>
        <p class="text-gray-500">챗봇 에이전트를 생성하기 위해 단계에 따라 챗봇을 생성합니다.</p>
        <div :class="`pl-step mt-8 currentStep-${currentStep}`">
          <div
            class="pl-step--title"
            v-for="item, index in stepTitleList"
            :key="item.id">
            <span class="pl-step--index">{{ index+1 }}</span>
            {{ item.title }}
          </div>
        </div>
      </div>
      <!-- content -->
      <div class="flex-1 h-[650px] pl-scrollable">
        <!-- step 1 -->
        <v-slide-x-reverse-transition>
          <template v-if="currentStep === 1">
            <div class="flex flex-col gap-y-4 w-full px-6 py-8 border-t h-full">
              <div class="flex border-b pb-4">
                <v-icon
                  style="width: 60px !important; height: 60px !important;"
                  class="pl-icon20 grid-agent-type01 flex-[0_0_60px]"></v-icon>
                <p class="pl-4">
                  챗봇의 프로필 이미지를 업로드 하십시오.<br>
                  프로필 이미지 규격은 가로 00px, 세로 00px 입니다.<br>
                  업로드 가능한 파일은 “png”, “jpeg”, “jpg” 입니다.
                </p>
              </div>
              <div>
                <label class="pl-label" for="">
                  카탈로그
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <div class="grid grid-cols-4 gap-3 ">
                  <template
                    v-for="item, index in channelList"
                    :key="item.id">
                    <div
                      :class="`selectChannelBtn active-${ item.active }`"
                      @click="selectChannel(item)"
                    >
                      <div class="w-full flex flex-column align-center">
                        <v-icon :class="`pl-icon20 chatboat-create-${ item.icon }`"></v-icon>
                        <span class="text-[14px] font-regular mt-1">{{ item.title }}</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div>
                <label class="pl-label" for="">
                  카테고리
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <v-select
                  class="pl-form"
                  :items="[
                    '고객 응대',
                    '사내 업무지식',
                    '외부지식',
                    '기타',
                  ]"
                  density="compact"
                  variant="outlined"
                  placeholder="챗봇의 이름을 입력하세요."
                  menu-icon="pl-icon20 arrow-up"
                  hide-details></v-select>
              </div>
              <div>
                <label class="pl-label" for="">
                  챗봇 이름
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <v-text-field
                  class=" pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="챗봇의 이름을 입력하십시오."></v-text-field>
              </div>
              <div>
                <label class="pl-label" for="">
                  언어
                </label>
                <v-select
                  v-model="chatbotCreate.lang"
                  class=" pl-form"
                  :items="chatbotCreate.langOpt"
                  density="compact"
                  variant="outlined"
                  placeholder="언어를 선택하세요."
                  menu-icon="pl-icon20 arrow-up"
                  hide-details></v-select>
              </div>
              <div>
                <label class="pl-label" for="">
                  챗봇 에이전트 설명
                </label>
                <v-textarea
                  class="pl-form "
                  density="compact"
                  variant="outlined"
                  no-resize
                  hide-details
                  placeholder="챗봇의 설명을 입력하세요.">
                </v-textarea>
              </div>
            </div>
          </template>
          <template v-if="currentStep === 2">
            <div class="flex flex-col gap-y-4 w-full px-6 py-4 border-t h-full">
              <div>
                <label class="pl-label" for="">
                  GenAI 언어 모델
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <v-select
                  :items="prompt.opt"
                  v-model="prompt.model"
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
              <div>
                <label class="pl-label" for="">
                  라이선스 키
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <v-text-field
                  class="pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="적용할 AI 언어 모델의 라이선스키를 입력하세요"
                  :append-inner-icon="passInput ? 'pl-icon20 pass-eye' : 'pl-icon20 pass-eye-off'"
                  @click:append-inner="passInput = !passInput"
                  :type="passInput ? 'text' : 'password'"
                  >
                </v-text-field>
              </div>
              <!-- Temperature -->
              <div class="border-t pt-2">
                <label class="pl-label" for="">
                  Temperature
                </label>
                <div>
                  <v-slider
                    v-model="prompt.temperature"
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
                        v-model="prompt.temperature"
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
              <div>
                <label class="pl-label" for="">
                  Max Tokens
                </label>
                <div>
                  <v-slider
                    v-model="prompt.maxTokens"
                    min="0"
                    max="512"
                    :step="1"
                    hide-details
                    track-size="1"
                    thumb-size="15"
                    color="#4f62cd"
                    >
                    <template v-slot:append>
                      <v-text-field
                        v-model="prompt.maxTokens"
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
              <div>
                <label class="pl-label" for="">
                  Chunk limit
                </label>
                <div>
                  <v-slider
                    v-model="prompt.chunkLimit"
                    min="0"
                    max="10"
                    :step="1"
                    hide-details
                    track-size="1"
                    thumb-size="15"
                    color="#4f62cd"
                    >
                    <template v-slot:append>
                      <v-text-field
                        v-model="prompt.chunkLimit"
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
              <!-- 대기중 메시지 -->
              <div class="border-t pt-2">
                <label class="pl-label" for="">
                  대기중 메시지
                </label>
                <v-text-field
                  class="pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="챗봇이 응답 대기전의 안내 메시지를 입력하세요."></v-text-field>
              </div>
              <div class="border-t pt-2">
                <label class="pl-label" for="">
                  응답전 메시지
                </label>
                <v-text-field
                  class="pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="사용자로부터 질문을 받은 후 메시지를 입력하세요."></v-text-field>
              </div>
              <div class="border-t pt-2">
                <label class="pl-label" for="">
                  실패 메시지
                </label>
                <v-text-field
                  class="pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="챗봇이 적절하게 응답할 수 있는 인텐트가 매칭되지 않았을 때  폴백 메시지를 입력하세요."></v-text-field>
              </div>
            </div>
          </template>
          <template v-if="currentStep === 3">
            <div class="flex flex-col gap-y-4 w-full px-6 py-8 border-t ">
              <div class="flex flex-column align-center border-b pb-4">
                <v-icon
                style="width: 60px !important; height: 60px !important;"
                class="pl-icon20 grid-agent-type01 flex-[0_0_60px]"></v-icon>
                <p class="pt-4">
                  챗봇이 정상적으로 생성 되었습니다.
                </p>
                <div class="pyro">
                  <div class="before"></div>
                  <div class="after"></div>
                </div>
              </div>
              <!-- 확인 폼 -->
              <div class="flex align-center mt-8">
                <label class="pl-label flex-[0_0_150px]" for="">
                  챗봇 이름
                </label>
                <v-text-field
                  class="pl-form ml-2"
                  density="compact"
                  variant="outlined"
                  hide-details
                  readonly
                  value="나의 첫번째 챗봇"></v-text-field>
              </div>
              <div class="flex align-center">
                <label class="pl-label flex-[0_0_150px]" for="">
                  챗봇 고유 ID
                </label>
                <v-text-field
                  class="pl-form ml-2"
                  density="compact"
                  variant="outlined"
                  readonly
                  hide-details
                  value="PLT-CB-hkc-00001"></v-text-field>
              </div>
              <div class="flex align-center">
                <label class="pl-label flex-[0_0_150px]" for="">
                  카탈로그
                </label>
                <v-text-field
                  class="pl-form ml-2"
                  density="compact"
                  variant="outlined"
                  readonly
                  hide-details
                  value="지식 > 사내 업무지식"></v-text-field>
              </div>
              <div class="flex align-center">
                <label class="pl-label flex-[0_0_150px]" for="">
                  GenAI 언어 모델
                </label>
                <v-text-field
                  class="pl-form ml-2"
                  density="compact"
                  variant="outlined"
                  readonly
                  hide-details
                  value="ChatGPT 4"></v-text-field>
              </div>
            </div>
          </template>
        </v-slide-x-reverse-transition>
      </div>
    </div>
    <!-- footer -->
    <div class="flex justify-end pa-4 pt-2 gap-x-2 border-t">
      <template v-if="currentStep === 1">
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
          @click="nextStep()"
          variant="flat"
          >
          다음</v-btn>
      </template>
      <template v-if="currentStep === 2">
        <v-btn
          class="pl-btn type-line"
          size="small"
          @click="prevStep()"
          variant="flat">
          이전</v-btn>
        <v-btn
          class="pl-btn"
          color="#4f62cd"
          size="small"
          @click="nextStep()"
          variant="flat"
          >
          완료</v-btn>
      </template>
      <template v-if="currentStep === 3">
        <v-btn
          class="pl-btn"
          size="small"
          color="#4f62cd"
          @click="saveStep()"
          variant="flat"
          >
          확인</v-btn>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
$particles: 50;
$width: 500;
$height: 500;

// Create the explosion...
$box-shadow: ();
$box-shadow2: ();
@for $i from 0 through $particles {
  $box-shadow: $box-shadow,
               random($width)- calc($width / 2) + px
               random($height)- calc($height / 1.2) + px
               hsl(random(360), 100, 50);
  $box-shadow2: $box-shadow2, 0 0 #fff
}
@mixin keyframes ($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }

    @-moz-keyframes #{$animationName} {
        @content;
    }

    @-o-keyframes #{$animationName} {
        @content;
    }

    @-ms-keyframes #{$animationName} {
        @content;
    }

    @keyframes #{$animationName} {
        @content;
    }
}

@mixin animation-delay ($settings) {
    -moz-animation-delay: $settings;
    -webkit-animation-delay: $settings;
    -o-animation-delay: $settings;
    -ms-animation-delay: $settings;
    animation-delay: $settings;
}

@mixin animation-duration ($settings) {
    -moz-animation-duration: $settings;
    -webkit-animation-duration: $settings;
    -o-animation-duration: $settings;
    -ms-animation-duration: $settings;
    animation-duration: $settings;
}

@mixin animation ($settings) {
    -moz-animation: $settings;
    -webkit-animation: $settings;
    -o-animation: $settings;
    -ms-animation: $settings;
    animation: $settings;
}

@mixin transform ($settings) {
    transform: $settings;
    -moz-transform: $settings;
    -webkit-transform: $settings;
    -o-transform: $settings;
    -ms-transform: $settings;
}
.pyro{
  position: relative;
}
.pyro > .before, .pyro > .after {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: $box-shadow2;
  @include animation((1s bang ease-out 1 backwards, 1s gravity ease-in 1 backwards, 5s position linear 1 backwards));
}

.pyro > .after {
  @include animation-delay((1.25s, 1.25s, 1.25s));
  @include animation-duration((1.25s, 1.25s, 6.25s));
}

@include keyframes(bang) {
  to {
    box-shadow:$box-shadow;
  }
}

@include keyframes(gravity)  {
  to {
    @include transform(translateY(100px));
    opacity: 0;
  }
}

@include keyframes(position) {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}

</style>