<script setup lang="ts">
//@ts-nocheck
import { ref, computed } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import ChatbotPreview2 from '@/components/chatbot-preview2.vue'
import { useGetImageUrl } from "@/composables/common.js";

const agentHeaders = ref([
  { title: '', align: 'center', sortable: false, key: 'check', width: '50' },
  { title: '번호', align: 'center', sortable: false, key: 'index', width: '80' },
  { title: '에이전트 명', align: 'start', sortable: true, key: 'data01' },
  { title: '카테고리', align: 'start', sortable: false, key: 'data02' },
  { title: '언어', align: 'start', sortable: false, key: 'data03', width: '120' },
  { title: 'AI 모델', align: 'start', sortable: false, key: 'data04' },
  { title: '라이선스 키', align: 'start', sortable: false, key: 'data05', width: '120' },
  { title: '서비스계정 키', align: 'start', sortable: false, key: 'data06', width: '120' },
  { title: '생성자', align: 'start', sortable: false, key: 'data07', width: '120' },
  { title: '생성일', align: 'start', sortable: false, key: 'data08', width: '120' },
  { title: '서비스 상태', align: 'start', sortable: false, key: 'data09', width: '120' },
])

const agentData = ref([
  {
    check: false,
    index: 1,
    type: 'type01',
    data01: '사내 HR관리 챗봇',
    data02: '한국클라우드  > 데모 존',
    data03: '한국어(KO)',
    data04: 'ChatGPT 4',
    data05: '정상 발급',
    data06: '발급',
    data07: '나관리',
    data08: '2024-04-15',
    data09: true,
  },
  { check: false, index: 2, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'LLAMA 3', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 3, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 공공 존', data03: '한국어(KO)', data04: 'Claude 3', data05: '정상 발급', data06: '미 발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 4, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 법률 서비스 존', data03: '한국어(KO)', data04: 'Clova X', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 5, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > e마켓 플레이스존', data03: '한국어(KO)', data04: 'Gemini', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: false, },
  { check: false, index: 6, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Claude 3', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 7, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 8, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Gemini', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: false, },
  { check: false, index: 9, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Clova X', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 10, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 11, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: false, },
  { check: false, index: 12, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Clova X', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 13, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 14, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Claude 3', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 15, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'Clova X', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 16, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
  { check: false, index: 17, type: 'type01', data01: '사내 HR관리 챗봇', data02: '한국클라우드  > 서비스 존', data03: '한국어(KO)', data04: 'ChatGPT 4', data05: '정상 발급', data06: '발급', data07: '나관리', data08: '2024-04-15', data09: true, },
])
const paging =ref<object>(
  {
    page: 1,
    perPage: [10,15,30],
    ROW_PER_PAGE: 15,
  }
)
const pageCount = computed(() => {
  return Math.ceil(agentData.value.length / paging.value.ROW_PER_PAGE)
})
const gridAiModel = ref([
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
])
const displayStatus = (stat, statList) => {
  let arrStatList = statList

  for (let i = 0; i < arrStatList.length; i++) {
    if (arrStatList[i].title === stat) {
      return arrStatList[i].icon;
    }
  }
}

// 페이지 타입
const pageType = ref<string>('grid') //grid, styleEdit, baseEdit

// 기본설정 header
const agentSelect = ref<object>({
  model: 0,
  opt: [
  { title: '한국클라우드 데모존', icon: 'ai-bot', value: 0 },
  ]
})

// 챗봇 기본설정
// 챗봇프로필 설정
const chatProfileSetting = ref(
  {
    title: '챗봇 프로필',
    desc: '챗봇 이름, 설명 및 채팅창의 위치를 설정합니다.',
    profileImg: '@base_profile.svg',
    chatName: '사내 HR관리 챗봇',
    chatCategory: '고객 응대',
    chatCategoryOpt: [
    '고객 응대',
    '사내 업무 지식',
    '사내 업무관리',
    '외부 지식',
    '마케팅',
    ],
    chatText: '나의 첫번째 HR관리용 챗봇입니다.',
    active: true,
  }
)
// 기본설정
const baseSetting = ref(
  {
    title: '기본 설정',
    desc: '사용할 언어 모델 및 라이선스 Key 정보 등을 설정합니다.',
    baseLang: '한국어(KO)',
    baseAi: 0,
    baseAiOpt: [
      { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
      { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
      { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
      { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
      { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
      { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
    ],
    baseLicense: 'sk-Pb571Qgfdjkgluteiglkj57348967yrt395784dfgklfjhglk43789',
    baseWaitMsg: '안녕하세요. 무엇을 도와드릴까요?',
    baseResMsg: '지식기반 검색으로 답변을 생성합니다.',
    baseFailMsg: '죄송합니다. 제대로 이해하지 못했습니다. ',
    active: false,
  }
)
// 챗봇 스타일 설정
// 기본설정
const styleBaseSetting = ref(
  {
    title: '기본 설정',
    desc: '챗봇 이름, 설명 및 채팅창의 위치를 설정합니다.',
    name: null,
    guideMsg: null,
    popPos: [
      {
        title: '위치',
        model: 0,
        opt: [
          { title: '오른쪽', value: 0 }
        ],
        type: 'radio'
      },
      {
        title: '사이드 여백',
        model: 35,
        suffix: 'PX'
      },
      {
        title: '아래 여백',
        model: 35,
        suffix: 'PX'
      },
    ],
    active: true,
  }
)
// 외형설정
const styleLayoutSetting = ref(
  {
    title: '외형 설정',
    desc: '채팅창의 아이콘, 모양과 색상 등의 느낌을 설정합니다.',
    radioModel: 0,
    radioGrp: [
      { title: '기본 외형', value: 0},
      { title: '확장 외형', value: 1},
    ],
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
    launchIcon: '@launchIcon.png',
    launchToggle: true,
    launchTooltip: null,
    titlebarIcon: '@titlebarIcon.png',
    chatAvatar: '@chatAvatar.png',
    active: false,
  }
)
const passInput = ref<boolean>(false)

// 챗봇 미리보기
const chatbotPreview = ref<boolean>(true)
const previewData = ref<object>({
  title: '나의 첫번째 챗봇',
  icon: '@p_logo.png',
  type: '',
  baseMsg: '여기에 챗봇 안내 문구가 표시됩니다. 챗봇의 설명 또는 대표하는 마케팅 안내 메시지를 입력해 보세요.',
  log: [
    {
      type: 'bot',
      text: '안녕하세요, 저는 고객님의 업무를 지원하는 챗봇입니다. 이것은 샘플 메시지입니다.',
      tag: [
        { text: '묻고 답하기' },
        { text: '이벤트 안내' },
        { text: '오늘만 핫 한 상품안내' },
      ]
    },
    {
      type: 'cs',
      text: '안녕하세요',
    },
  ],
})

</script>
<template>
  <ContentTopLayout >
    <!-- 기본설정 header -->
    <template v-if="pageType === 'baseEdit'" v-slot:title>
      <h2 class="text-[20px] font-bold">챗봇 프로필 및 기본 설정</h2>
    </template>
    <template v-if="pageType === 'baseEdit'" v-slot:header>
      <!-- back page -->
      <v-tooltip text="에이전트 목록" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            min-width="24px"
            icon
            size="small"
            class="ml-2"
            variant="text"
            @click="pageType = 'grid'"
            >
            <v-icon class="pl-icon20 back-page"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <div class="ml-auto flex align-center">
        <span class="pl-label">에이전트</span>
        <v-select
          v-model="agentSelect.model"
          class="pl-form ml-2 w-[220px]"
          :items="agentSelect.opt"
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
        <v-btn
          class="pl-btn ml-2"
          prepend-icon="pl-icon20 in-search-white"
          color="#4f62cd"
          variant="flat"
          >조회</v-btn>
      </div>
    </template>
    <!-- 스타일 수정 header -->
    <template v-if="pageType === 'styleEdit'" v-slot:title>
      <h2 class="text-[20px] font-bold">챗봇 스타일 설정</h2>
    </template>
    <template v-if="pageType === 'styleEdit'" v-slot:header>
      <!-- back page -->
      <v-tooltip text="에이전트 목록" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            min-width="24px"
            icon
            size="small"
            class="ml-2"
            variant="text"
            @click="pageType = 'grid'"
            >
            <v-icon class="pl-icon20 back-page"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <div class="ml-auto flex align-center">
        <span class="pl-label">에이전트</span>
        <v-select
          v-model="agentSelect.model"
          class="pl-form ml-2 w-[220px]"
          :items="agentSelect.opt"
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
        <v-btn
          class="pl-btn ml-2"
          prepend-icon="pl-icon20 in-search-white"
          color="#4f62cd"
          variant="flat"
          >조회</v-btn>
      </div>
    </template>
  </ContentTopLayout>
  <!-- 그리드  -->
  <template v-if="pageType === 'grid'">
    <div class="flex flex-column flex-1">
      <!-- 그리드 상단 툴바 -->
      <div class="flex align-center px-4 py-2">
        <div class="flex gap-1">
          <v-btn
            class="pl-btn"
            prepend-icon="pl-icon20 card-remove-red"
            variant="flat">
            삭제</v-btn>
          <v-btn
            class="pl-btn"
            prepend-icon="pl-icon20 style-edit"
            variant="flat"
            @click="pageType = 'styleEdit'"
            >
            스타일 설정</v-btn>
          <v-btn
            class="pl-btn"
            prepend-icon="pl-icon20 grid-edit"
            variant="flat"
            @click="pageType = 'baseEdit'"
            >
            수정</v-btn>
        </div>
        <div class="ml-auto">
          <div class="flex align-center">
            <v-text-field
              append-inner-icon="pl-icon20 in-search"
              density="compact"
              variant="outlined"
              rounded
              hide-details
              single-line
              clearable
              clear-icon="pl-icon20 in-close"
              class="pl-form ml-2 w-[200px]"
              placeholder="검색어 입력"
              @click:append-inner=""
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="pl-scrollable h-[calc(100vh-224px)]">
        <v-data-table
          hover
          v-model:page="paging.page"
          :headers="agentHeaders"
          :items="agentData"
          :items-per-page="paging.ROW_PER_PAGE"
          hide-default-footer
          class="pl-table border-t"
          density="comfortable"
          >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">
                <v-checkbox
                  class="pl-check"
                  true-icon="pl-icon20 chk-on"
                  false-icon="pl-icon20 chk-off"
                  v-model="item.check"
                ></v-checkbox>
              </td>
              <td class="text-center">{{ item.index }}</td>
              <td>
                <v-icon :class="`pl-icon20 grid-agent-${item.type}`"></v-icon>
                <span class="pl-2">{{ item.data01 }}</span>
              </td>
              <td>{{ item.data02 }}</td>
              <td>{{ item.data03 }}</td>
              <td class="">
                <v-icon :class="`pl-icon20 ${ displayStatus(item.data04, gridAiModel) }`"></v-icon>
                <span class="pl-2">{{ item.data04 }}</span>
              </td>
              <td>{{ item.data05 }}</td>
              <td>{{ item.data06 }}</td>
              <td>{{ item.data07 }}</td>
              <td>{{ item.data08 }}</td>
              <td>
                <v-switch
                  height="30px"
                  class="pl-switch"
                  inset
                  color="#4f62cd"
                  hide-details
                  v-model="item.data09"></v-switch>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <!-- paging -->
      <div class="pl-pager p-4 border-t mt-auto">
        <div class="pl-pager-row">
          <span>페이지당 항목 수</span>
          <v-select
            class="pl-form"
            :value="paging.ROW_PER_PAGE"
            :items="paging.perPage"
            :item-text="paging.ROW_PER_PAGE"
            @update:model-value="paging.ROW_PER_PAGE = parseInt($event, 10)"
            density="compact"
            variant="outlined"
            placeholder="챗봇의 이름을 입력하세요."
            menu-icon="pl-icon20 arrow-up"
            hide-details></v-select>

        </div>
        <div class="self-center">
          <v-pagination
            v-model="paging.page"
            :length="pageCount"
            rounded="circle"
            next-icon="pl-icon20 arrow-next"
            prev-icon="pl-icon20 arrow-prev"
            variant="text"
          ></v-pagination>
        </div>
      </div>

    </div>
  </template>

  <!-- //mark: 기본 설정  -->
  <template v-if="pageType === 'baseEdit'">
    <div class="flex flex-column h-full">
      <!-- 스크롤 컨텐츠 -->
      <div class="p-4 h-[calc(100vh-165px)] flex flex-column gap-y-4 pl-scrollable">
        <!-- 챗봇 프로필 -->
        <div class="pl-acco-card w-[800px]" >
          <div class="pl-acco-card--title">
            <v-icon class="pl-icon20 chat-profile"></v-icon>
            <div class="ml-2">
              <strong>{{ chatProfileSetting.title }}</strong>
              <div class="text-[13px]">{{ chatProfileSetting.desc }}</div>
            </div>
            <v-tooltip :text="chatProfileSetting.active ? '닫힘' : '펼침'" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="ml-auto"
                  v-bind="props"
                  variant="flat"
                  icon
                  size="small"
                  @click="chatProfileSetting.active = !chatProfileSetting.active"
                  >
                  <v-icon :class="`pl-icon20 ${ chatProfileSetting.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <v-toggle-slide-y-transition >
            <div v-if="chatProfileSetting.active"
              class="pl-acco-card--content">
              <div class="flex px-6 py-4">
                <img
                  class="w-[60px] h-[60px]"
                  :src=useGetImageUrl(chatProfileSetting.profileImg)
                  :alt="chatProfileSetting.chatName">
                <p class="ml-4">챗봇의 프로필 이미지를 업로드 하십시오.<br>프로필 이미지 규격은 가로 00px, 세로 00px 입니다.<br>업로드 가능한 파일은 “png”, “jpeg”, “jpg” 입니다.</p>
              </div>
              <div class="flex flex-col gap-y-4 w-full px-6 pb-8 h-full">
                <div>
                  <label class="pl-label flex-[0_0_150px]" for="">
                    챗봇 이름
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <v-text-field
                    v-model="chatProfileSetting.chatName"
                    class="pl-form "
                    density="compact"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </div>
                <div>
                  <label class="pl-label flex-[0_0_150px]" for="">
                    카테고리
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <v-select
                    class=" pl-form"
                    v-model="chatProfileSetting.chatCategory"
                    :items="chatProfileSetting.chatCategoryOpt"
                    density="compact"
                    variant="outlined"
                    menu-icon="pl-icon20 arrow-up"
                    hide-details></v-select>
                </div>
                <div>
                  <label class="pl-label flex-[0_0_150px]" for="">
                    챗봇 설명
                  </label>
                  <v-textarea
                    v-model="chatProfileSetting.chatText"
                    class="pl-form "
                    density="compact"
                    variant="outlined"
                    no-resize
                    hide-details
                    >
                  </v-textarea>
                </div>
              </div>
            </div>
          </v-toggle-slide-y-transition>

        </div>
        <!-- 기본설정 -->
        <div class="pl-acco-card w-[800px]" >
          <div class="pl-acco-card--title">
            <v-icon class="pl-icon20 chat-profile"></v-icon>
            <div class="ml-2">
              <strong>{{ baseSetting.title }}</strong>
              <div class="text-[13px]">{{ baseSetting.desc }}</div>
            </div>
            <v-tooltip :text="baseSetting.active ? '닫힘' : '펼침'" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="ml-auto"
                  v-bind="props"
                  variant="flat"
                  icon
                  size="small"
                  @click="baseSetting.active = !baseSetting.active"
                  >
                  <v-icon :class="`pl-icon20 ${ baseSetting.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <v-toggle-slide-y-transition >
            <div v-if="baseSetting.active"
              class="pl-acco-card--content">
              <div class="flex flex-col gap-y-4 w-full px-6 pt-4 pb-8 h-full">
                <div>
                  <label class="pl-label flex-[0_0_150px]" for="">
                    언어
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <v-text-field
                    v-model="baseSetting.baseLang"
                    class="pl-form"
                    density="compact"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </div>
                <div>
                  <label class="pl-label flex-[0_0_150px]" for="">
                    AI 모델
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <v-select
                    v-model="baseSetting.baseAi"
                    :items="baseSetting.baseAiOpt"
                    class=" pl-form"
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
                  <label class="pl-label flex-[0_0_150px]" for="">
                    라이선스 키
                    <v-badge color="red" dot inline></v-badge>
                  </label>
                  <v-text-field
                    v-model="baseSetting.baseLicense"
                    class="pl-form "
                    density="compact"
                    variant="outlined"
                    hide-details
                    :append-inner-icon="passInput ? 'pl-icon20 pass-eye' : 'pl-icon20 pass-eye-off'"
                    @click:append-inner="passInput = !passInput"
                    :type="passInput ? 'text' : 'password'"
                    ></v-text-field>
                </div>
                <div class="border-t pt-3">
                  <label class="pl-label flex-[0_0_150px]" for="">
                    대기중 메시지
                  </label>
                  <v-text-field
                    v-model="baseSetting.baseWaitMsg"
                    class="pl-form "
                    density="compact"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </div>
                <div >
                  <label class="pl-label flex-[0_0_150px]" for="">
                    응답전 메시지
                  </label>
                  <v-text-field
                    v-model="baseSetting.baseResMsg"
                    class="pl-form"
                    density="compact"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </div>
                <div >
                  <label class="pl-label flex-[0_0_150px]" for="">
                    실패 메시지
                  </label>
                  <v-text-field
                    v-model="baseSetting.baseFailMsg"
                    class="pl-form "
                    density="compact"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </div>
              </div>
            </div>
          </v-toggle-slide-y-transition>

        </div>
      </div>
      <!-- 버튼 -->
      <div class="mt-auto flex justify-end gap-x-2 pa-4 border-t">
        <v-btn
          class="pl-btn "
          color="#4f62cd"
          variant="flat"
          >
          저장</v-btn>
      </div>

    </div>
  </template>

  <!-- //mark: 스타일 수정  -->
  <template v-if="pageType === 'styleEdit'">
    <div class="flex bg-gray-100">
      <!-- 설정 -->
      <div class="flex flex-column h-full">
        <!-- 스크롤 컨텐츠 -->
        <div class="p-4 h-[calc(100vh-100px)] flex flex-column gap-y-4 pl-scrollable">
          <!-- 기본설정 -->
          <div class="pl-acco-card w-[800px] bg-white" >
            <div class="pl-acco-card--title">
              <v-icon class="pl-icon20 chat-profile"></v-icon>
              <div class="ml-2">
                <strong>{{ styleBaseSetting.title }}</strong>
                <div class="text-[13px]">{{ styleBaseSetting.desc }}</div>
              </div>
              <v-tooltip :text="styleBaseSetting.active ? '닫힘' : '펼침'" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="ml-auto"
                    v-bind="props"
                    variant="flat"
                    icon
                    size="small"
                    @click="styleBaseSetting.active = !styleBaseSetting.active"
                    >
                    <v-icon :class="`pl-icon20 ${ styleBaseSetting.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
            <v-toggle-slide-y-transition >
              <div v-if="styleBaseSetting.active"
                class="pl-acco-card--content">
                <div class="flex flex-col gap-y-4 w-full px-6 pt-4 pb-8 h-full">
                  <div>
                    <label class="pl-label flex-[0_0_150px]" for="">
                      챗봇 이름
                    </label>
                    <v-text-field
                      v-model="styleBaseSetting.name"
                      class="pl-form "
                      density="compact"
                      variant="outlined"
                      hide-details
                      placeholder="챗봇의 이름을 입력하세요."
                      ></v-text-field>
                  </div>
                  <div>
                    <label class="pl-label flex-[0_0_150px]" for="">
                      챗봇 안내 메시지
                    </label>
                    <v-text-field
                      v-model="styleBaseSetting.guideMsg"
                      class="pl-form "
                      density="compact"
                      variant="outlined"
                      hide-details
                      placeholder="챗봇 이름아래 적용할 안내 메시지를 입력하세요."
                      ></v-text-field>
                  </div>
                  <div>
                    <label class="pl-label flex-[0_0_150px]" for="">
                      채팅 창 팝업 위치
                    </label>
                    <div
                      class="pl-grid-box "
                      style="grid-template-columns: 33fr 33fr 33fr ">
                      <div
                        class=""
                        v-for="item in styleBaseSetting.popPos"
                        :key="item.id">
                        <span class="flex-[0_0_150px]" for="">
                          {{ item.title }}
                        </span>
                        <div>
                          <template v-if="item.type === 'radio'">
                            <v-select
                              class="mt-2 pl-form w-[120px]"
                              v-model="item.model"
                              :items="item.opt"
                              density="compact"
                              variant="outlined"
                              menu-icon="pl-icon20 arrow-up"
                              hide-details></v-select>
                          </template>
                          <template v-else>
                            <v-text-field
                              v-model="item.model"
                              class="pl-form mt-2 w-[120px]"
                              density="compact"
                              variant="outlined"
                              hide-details
                              suffix="PX"
                              ></v-text-field>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-toggle-slide-y-transition>

          </div>
          <!-- 외형 설정 -->
          <div class="pl-acco-card w-[800px] bg-white" >
            <div class="pl-acco-card--title">
              <v-icon class="pl-icon20 chat-style"></v-icon>
              <div class="ml-2">
                <strong>{{ styleLayoutSetting.title }}</strong>
                <div class="text-[13px]">{{ styleLayoutSetting.desc }}</div>
              </div>
              <v-tooltip :text="styleLayoutSetting.active ? '닫힘' : '펼침'" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="ml-auto"
                    v-bind="props"
                    variant="flat"
                    icon
                    size="small"
                    @click="styleLayoutSetting.active = !styleLayoutSetting.active"
                    >
                    <v-icon :class="`pl-icon20 ${ styleLayoutSetting.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
            <v-toggle-slide-y-transition >
              <div v-if="styleLayoutSetting.active"
                class="pl-acco-card--content">
                <div class="flex flex-col gap-y-4 w-full px-6 pt-4 pb-8 h-full">
                  <!-- 외형 선택 radio -->
                  <div>
                    <v-radio-group
                      inline
                      v-model="styleLayoutSetting.radioModel"
                      hide-details
                      @update:modelValue="previewData.type = styleLayoutSetting.radioModel"
                      >
                      <v-radio
                        v-for="radio in styleLayoutSetting.radioGrp" :key="radio.id"
                        :label="radio.title"
                        :value="radio.value"
                        class="pl-radio"></v-radio>
                    </v-radio-group>
                  </div>

                  <div>
                    <label class="pl-label flex-[0_0_150px]" for="">
                      메인 색상
                    </label>
                    <div class="flex gap-2 align-center">
                      <div
                        v-for="color in styleLayoutSetting.mainColor"
                        :style="`background-color: ${color}`"
                        :class="`pl-inline-swatch rounded-full w-[40px] h-[40px] ${ styleLayoutSetting.activeColor === color ? 'active' : ''}`"
                        @click="styleLayoutSetting.activeColor = color"
                        :key="color.id">
                      </div>
                      <!-- color picker -->
                      <VSwatches
                        trigger-style="width: 40px; height: 40px"
                        class="pl-swatches"
                        :swatches="styleLayoutSetting.swatches"
                        popover-x="right"
                        shapes="circles"
                        show-fallback
                        fallback-input-type="color"
                        v-model="styleLayoutSetting.activeColor" >
                      </VSwatches>
                    </div>
                  </div>
                  <div class="pt-2 border-t">
                    <label class="pl-label flex-[0_0_150px]" for="">
                      런치 아이콘
                    </label>
                    <p class="">런처 아이콘을 클릭하시면 변경할 수 있습니다. (가로 50px * 세로50 px)</p>
                    <div class="relative mt-2 width-fit">
                      <v-avatar
                        size="40px"
                        :image=useGetImageUrl(styleLayoutSetting.launchIcon)>
                      </v-avatar>
                      <v-btn
                        size="small"
                        class="border scale-75 absolute top-[-10px] right-[20px]"
                        icon>
                        <v-icon class="pl-icon20 in-close"></v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <div class="flex align-center">
                      <label class="pl-label flex-[0_0_150px]" for="">
                        런처 아이콘 안내 툴 팁 사용
                      </label>
                      <v-switch
                        class="ml-auto pl-switch"
                        inset
                        color="#4f62cd"
                        hide-details
                        v-model="styleLayoutSetting.launchToggle"></v-switch>
                    </div>
                    <v-text-field
                      v-model="styleLayoutSetting.launchTooltip"
                      class="pl-form"
                      density="compact"
                      variant="outlined"
                      hide-details
                      type="text"
                      placeholder="안내 툴 팁을 입력하세요."
                      ></v-text-field>
                  </div>
                  <div class="border-t pt-3">
                    <label class="pl-label flex-[0_0_150px]" for="">
                      타이틀 바 아이콘
                    </label>
                    <p class="">이미지를 클릭하시면 변경할 수 있습니다. (가로 30px * 세로30 px)</p>
                    <div class="relative mt-2 width-fit">
                      <v-avatar
                        size="70px"
                        :image=useGetImageUrl(styleLayoutSetting.titlebarIcon)>
                      </v-avatar>
                      <v-btn
                        size="small"
                        class="border scale-75 absolute top-[-10px] right-[20px]"
                        icon>
                        <v-icon class="pl-icon20 in-close"></v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="border-t pt-3">
                    <label class="pl-label flex-[0_0_150px]" for="">
                      채팅 아바타
                    </label>
                    <p class="">이미지를 클릭하시면 변경할 수 있습니다. (가로 30px * 세로30 px)</p>
                    <div class="relative mt-2 width-fit">
                      <v-avatar
                        size="70px"
                        :image=useGetImageUrl(styleLayoutSetting.chatAvatar)>
                      </v-avatar>
                      <v-btn
                        size="small"
                        class="border scale-75 absolute top-[-10px] right-[20px]"
                        icon>
                        <v-icon class="pl-icon20 in-close"></v-icon>
                      </v-btn>
                    </div>
                  </div>

                </div>
              </div>
            </v-toggle-slide-y-transition>
          </div>
        </div>
      </div>

      <!-- 미리보기 -->
      <div
        class="flex flex-1 justify-center border-l pt-10"
        :style="`--chatmain-color: ${ styleLayoutSetting.activeColor}`">
        <v-slide-y-reverse-transition>
          <ChatbotPreview2
            v-if="chatbotPreview"
            :data="previewData"
            />
        </v-slide-y-reverse-transition>
        <div class="fixed bottom-10 right-[200px] flex align-center">
          <div class="rounded-lg bg-white p-4 w-[200px]">
            안녕하세요, 한국클라우드 챗봇 똑똑이 입니다.
          </div>
          <v-btn
            class="ml-4"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            @click="chatbotPreview = !chatbotPreview">
            <v-icon class="pl-icon20 share-teletalk scale-150"></v-icon>
          </v-btn>
        </div>
      </div>

    </div>
  </template>

</template>


<style scoped>

</style>