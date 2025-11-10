<script setup lang="ts">
//@ts-nocheck
import { ref, watch, nextTick  } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";
import PromptPanel from '@/pages/Playground-home-prompt-panel.vue'
import CataloguePanel from '@/pages/Playground-home-catalogue-panel.vue'

// playground
const type = ref<string>('default')
const carouselList = ref<array>([
  { text: '2024년 귀속 연말정산 주요 변화 내용은 무엇인가요?' , active: true},
  { text: '2024년 귀속 연말정산 주요 변화 내용은 무엇인가요?' , active: false},
  { text: '2024년 귀속 연말정산 주요 변화 내용은 무엇인가요?' , active: false},
])

// right menu
const isRightMenu = ref<boolean>(false)

const rightMenu = ref<array>([
  { active: false, evt: '', text: '새 대화', icon: 'r-plus', value: 'p-plus' },
  { active: false, evt: 'panelCatalogue', text: '지식 카탈로그', icon: 'r-knowledge', value: 'p-plus' },
  { active: false, evt: 'panelPrompt', text: '프롬프트', icon: 'r-prompt', value: 'p-plus' },
  { active: false, evt: '', text: 'OCR', icon: 'r-ocr', value: 'p-plus' },
  { active: false, evt: '', text: '번역', icon: 'r-translate', value: 'p-plus' },
  { active: false, evt: '', text: '글쓰기', icon: 'r-write', value: 'p-plus' },
  { active: false, evt: '', text: '대화 이력', icon: 'r-log', value: 'p-plus', class: 'mt-auto' },
  { active: false, evt: '', text: '설정', icon: 'r-setting', value: 'p-plus' },
])
const selectMenu = (item) => {
  removeMenuActive()
  item.active = true
  isRightMenu.value = true
  showPanel(item.evt)
}
const removeMenuActive = () => {
  for (let index = 0; index < rightMenu.value.length; index++) {
    rightMenu.value[index].active = false
  }
  isRightMenu.value = false
}

// 패널
const panels = {
  panelCatalogue: ref(false),
  panelPrompt: ref(false),
}

// 패널 show hiddenPanel
const showPanel = (panel: keyof typeof panels) => {
  for (const key in panels) {
    panels[key].value = (key === panel);
  }
}
const hiddenPanel = (panel: keyof typeof panels) => {
  removeMenuActive();
  if (panels[panel]) {
    panels[panel].value = false
  }
}


// chat input
const chatInput = ref<object>({
  focus: false,
  mode: 'default',
  langShow: false,
  langAi: 0,
  langAiOpt: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  knowledgeShow: false,
  knowledgeModel: 0,
  knowledgeOpt: [
    { title: '일반 대화', icon: 'prompt-talk', value: 0 },
    { title: '지식기반 대화', icon: 'prompt-new-lib', value: 1}
  ],
  log: [
    {
      type: 'user',
      avatar: '@avatar02.png',
      msg: '개인정보 보호법에 대해 요약해줘',
      date: '2024-04-21 13:02:58',
    },
    {
      type: 'bot',
      aiVersion: 'Prism(GPT-4-0613)',
      avatar: '@avatar01.svg',
      msg: '개인정보 보호법은 개인정보의 처리 및 보호에 관한 사항을 정함으로써 개인의 자유와 권리를 보호하고 개인의 존엄과 가치를 구현함을 목적으로 한다.<br><br> 1. 개인정보란 살아 있는 개인에 관한 정보를 말함<br> 2. 개인정보처리자는 개인정보 처리 목적을 명확하게 하고, 목적에 필요한 범위에서 최소한의 정보만을 수집해야 함<br> 3. 개인정보처리자는 개인정보의 처리 목적에 필요한 범위에서 적합하게 개인정보를 처리해야 하며, 목적 외의 용도로 활용해서는 안 됨<br> 4. 개인정보처리자는 개인정보의 처리 방법 및 종류 등에 따라 정보주체의 권리가 침해 받을 가능성과 그 위험 정도를 고려하여 개인정보를 안전하게 관리해야 함<br> 5. 국가와 지방자치단체는 개인정보의 목적 외 수집, 오용, 남용 및 무분별한 감시, 추적 등에 따른 폐해를 방지하여 인간의 존엄과 개인의 사생활 보호를 도모해야 함<br> 6. 개인정보 보호에 관한 사무를 독립적으로 수행하기 위해 국무총리 소속으로 개인정보 보호위원회를 둠',
      file: '개인정보 보호법(법률)(제19234호)(20240315).pdf',
      flileIndex: [9,10,14]
    },
  ],

})

const focusChatInput = (val) => {
  chatInput.value.focus = val
}


const extractFileExtension = (filename) => {
  const match = filename.match(/\.([a-z0-9]+)$/i);
  if (match) {
    return match[1]; // 매칭된 그룹 반환
  }
  return null; // 파일 확장자가 없으면 null 반환
}

// 채팅 도구
const undoList = ref([
  { title: '짧게' },
  { title: '길게' },
  { title: '간결하게' },
  { title: '보다 전문적으로' },
  { title: '5가지 관점으로 요약' },
  { title: '요약을 더 길고 인간적 이지만 간결하고 포괄적으로' },
])
const moreList = ref([
  { icon: '', title: '인용' },
  { icon: '', title: '응답 재생성' },
  { icon: '', title: '의견' },
])
const shareList = ref([
  { icon: '', title: '이메일' },
  { icon: '', title: 'PDF 내보내기' },
])

// 보고서 작성
const reportForm = ref<object>({
  textarea: `주제 : 디지털 플랫폼을 위한 생성형 AI 활용 전략
순서 :
1. 생성형 AI 시대와 기업의 준비
2. 생성형 AI를 활용한 일하는 방식의 혁신
3. 기업의 디지털 혁신을 위한 초거대 AI 및 클라우드 동향`
})
const placeForm = ref<array>([
  { placeholder: '출장지', text: '로 출장을 갈 건데 ', },
  { placeholder: '출발지', text: '에서 가장 빨리 갈 수 있는 교통편을 추천해줘', },
  { placeholder: '조건', text: '이었으면 좋겠어 ', },
])
const selectPrompt = (type) => {
  focusChatInput(true)
  chatInput.value.mode = type
}

// 내용 요약
const chatSummaryTab = ref(null)
const chatSummartFrom = ref<object>({
  styleOpt: [
    { title: '개조식 기본', value: false },
    { title: '개조식 상세하게', value: false },
    { title: '개조식 3문장 내외', value: false },
    { title: '문단식 기본', value: false },
    { title: '문단식 상세하게', value: false },
    { title: '문단식 3문장 내외', value: false },
  ],
  useLangModel: 0,
  useLangOpt: [
    { title: '한국어(KO)', value: 0 },
  ],
})

//메시지 전송 버튼
const msgSend = () =>{
  const addPlaceLog = {
    type: 'user',
    avatar: '@avatar02.png',
    msg: '출장지 최적의 교통편 추천<br>세종 정부청사로 출장을 갈 건데<br>금천구에서 가장 빨리 갈 수 있는 교통편을 추천해줘<br>대중교통편 이었으면 좋겠어',
    date: '2024-04-21 13:02:58',
  }
  const addPlaceLog2 = {
    type: 'bot',
    aiVersion: 'Prism(GPT-4-0613)',
    avatar: '@avatar01.svg',
    msg: '금천구에서 세종시 정부청사로 가는 가장 빠른 대중교통 수단은 KTX를 이용하는 것입니다.<br> 금천구에서 세종시 정부청사로 가는 방법은 다음과 같습니다.<br><br> 1. 금천구청역에서 KTX 광명역으로 이동합니다.<br> 2. KTX 광명역에서 KTX를 타고 오송역에서 하차합니다.<br> 3. 오송역에서 B1버스에 탑승하여 세종시 정부청사 남측에서 하차합니다.<br> 위의 방법으로 이동시 약 2시간 30분 정도 소요됩니다.<br> 해당 교통편을 예매할 수 있는 사이트는 레츠코레일(<a href="" class="text-blue">https://www.letskorail.com/</a>)입니다.<br> 세종시 정부청사 부근 숙소 정보는 다음과 같습니다.<br> 1.베스트웨스턴플러스호텔세종: 세종시 정부청사에서 차로 약 10분 거리에 위치한 4성급 호텔입니다. 깔끔하고 모던한 인테리어와 다양한 편의시설을 제공합니다.<br> 2.신라스테이 세종: 세종시 정부청사에서 차로 약 15분 거리에 위치한 4성급 호텔입니다. 모던한 인테리어와 다양한 편의시설을 제공하며, 비즈니스 고객들에게 인기가 높습니다.<br> 3.조치원1927: 세종시 정부청사에서 차로 약 20분 거리에 위치한 한옥 숙소입니다. 전통적인 한옥 인테리어와 현대적인 편의시설을 제공하며, 가족이나 연인들에게 인기가 높습니다.<br> 위 숙소들은 모두 깨끗하고 편안한 시설을 제공하며, 세종시 정부청사와 가까운 위치에 있어 출장객들에게 인기가 높습니다. 다만, 숙소의 가격과 예약 가능 여부는 시기에 따라 달라질 수 있으므로, 출장 전에 미리 확인하시는 것이 좋습니다. ',
  }

  if (chatInput.value.mode === 'place') {
    const pushMsg = () => {
      chatInput.value.log.push(addPlaceLog)
      setTimeout(() => (
        chatInput.value.log.push(addPlaceLog2)
      ), 1000)
    }
    pushMsg()
  }
  type.value = 'log'
  chatInput.value.mode = 'default'
}

// logContainer를 참조하기 위한 ref
const logContainer = ref(null)

// logs 배열이 변경될 때마다 스크롤을 맨 아래로 이동시키는 함수
watch( chatInput.value.log ,() => {
  nextTick(() => {
    if (chatInput.value.log) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  })
})

//  pdf viewer
import VuePdfApp from "vue3-pdf-app"
import "vue3-pdf-app/dist/icons/main.css"

const pdfLink = ref<string>('/sample_03.pdf')

const isPdf = ref<boolean>(false)

const pdfPageNum = ref<int>(1)

async function openPdf(pdfApp) {
  console.log('pdfPageNum : ', pdfPageNum.value);
  setTimeout(() => {
    window._pdfApp = pdfApp;
    if (pdfApp.pdfViewer) {
      // await pdfApp.pdfViewer.pagesPromise;
      pdfApp.pdfViewer.currentScale = 0.9;
      pdfApp.pdfViewer.currentPageNumber = pdfPageNum.value;
      pdfApp.pdfViewer.page = pdfPageNum.value;
    }
  });
}

const selectPdfPageNum = (page) => {
  if(!isPdf.value) isPdf.value = true
  pdfPageNum.value = page
  if(window._pdfApp) window._pdfApp.page = page;
}

const config = {
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
  toolbar: {
    toolbarViewerLeft: {
      findbar: true,
      previous: true,
      next: true,
      pageNumber: true,
    },
    toolbarViewerMiddle: {
      zoomOut: true,
      zoomIn: true,
      scaleSelectContainer: true,
    },
    toolbarViewerRight: {
      presentationMode: true,
      openFile: false,
      print: false,
      download: true,
      viewBookmark: false,
    },
  },
  secondaryToolbar: {
    secondaryPresentationMode: true,
    secondaryOpenFile: true,
    secondaryPrint: true,
    secondaryDownload: true,
    secondaryViewBookmark: true,
    firstPage: true,
    lastPage: true,
    pageRotateCw: true,
    pageRotateCcw: true,
    cursorSelectTool: true,
    cursorHandTool: true,
    scrollVertical: true,
    scrollHorizontal: true,
    scrollWrapped: true,
    spreadNone: true,
    spreadOdd: true,
    spreadEven: true,
    documentProperties: true,
  },
  errorWrapper: true,
}


</script>
<template>
  <div :class="`prism-wrap ${ isPdf ? 'isPdf' : ''}`">
    <!-- //mark: pdf viewer -->
    <div v-if="isPdf"
      class="flex-[1_1_600px]"
      >
      <div class="flex align-center w-full h-[50px] px-4 py-2 border-b border-r border-gray-200">
        <div>
          <v-icon class="pl-icon20 docu-pdf"></v-icon>
          <strong class="ml-2 text-[16px]">개인정보 보호법(법률)(제19234호)(20240315).pdf</strong>
        </div>
        <div class="ml-auto">
          <v-btn
            min-width="24px"
            icon
            size="small"
            variant="text"
            @click="isPdf = false">
            <v-icon class="pl-icon20 in-close" ></v-icon>
          </v-btn>
        </div>
      </div>
      <div class="pl-pdf-viewer-wrap h-full">
        <vue-pdf-app style="height: calc(100vh - 100px)" theme="light" :pdf="pdfLink" v-bind:page-number="5" @pages-rendered="openPdf" :config="config"></vue-pdf-app>
      </div>
    </div>
    <!-- //mark: playground -->
    <div class="prism-wrap--playground pl-scrollable " ref="logContainer">
      <div class="flex flex-col justify-cetnter flex-1 max-w-[720px]">

        <template v-if="type === 'default'">
          <!-- default logo -->
          <div class="flex flex-col align-center prism-wrap--logo">
            <h1 class="prism-logo"></h1>
            <p class="prism-logo-msg mt-14">Welcome to Prism</p>
            <p>안녕하세요. 나성실님, Palette Prism에 오신 것을 환영합니다.</p>
          </div>
          <!-- carousel -->
          <div class="mt-10  prism-wrap--carousel">
            <div class="flex flex-col ">
              <!-- card -->
              <div class="flex gap-x-4">
                <div
                  class="p-4 border rounded-[12px] bg-gray-100"
                  v-for="item in carouselList"
                  :key="item.id">
                  {{ item.text }}
                </div>
              </div>
              <!-- dot -->
              <div class="flex gap-x-2 justify-center mt-8">
                <div
                  v-for="item in carouselList"
                  class="w-2 h-2 rounded-full border"
                  :class="item.active ? 'bg-[#4f62cd]': 'bg-white'">
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 채팅 모드 -->
        <template v-if="type === 'log'">
          <div class="flex flex-column gap-y-8 mt-10 text-[15px]" >
            <div
              v-for="(item, idx) in chatInput.log"
              :key="item.id">

              <template v-if="item.type === 'user'">
                <div class="flex ">
                  <v-avatar
                    calss="flex-[0_0_50px]"
                    size="34px"
                    :image=useGetImageUrl(item.avatar)></v-avatar>
                  <div class="ml-2">
                    <strong class="text-[15px]" v-html="item.msg"></strong>
                    <div class="text-[12px] text-gray-500">{{item.date}}</div>
                  </div>
                </div>
              </template>
              <!-- bot -->
              <template v-else>
                <div class="ani-fadeIn-2s pb-10">
                  <div class="flex align-center">
                    <v-icon class="pl-icon-etc prism-bot"></v-icon>
                    <div class="ml-2">
                      <strong>{{item.aiVersion}}</strong>
                    </div>
                  </div>
                  <!-- msg box -->
                  <div class="p-4 pt-2 ml-6 ">
                    <div v-html="item.msg" class="leading-7"></div>
                    <div v-if="item.file"
                      class="mt-6">
                      <strong>[답변 출처]</strong>
                      <div class="mt-2 py-2 px-4 rounded-full bg-gray-100">
                        <v-icon :class="`pl-icon20 docu-${extractFileExtension(item.file)}`"></v-icon>
                        <span class="pl-2">{{ item.file }}</span>
                        <span class="d-inline-block px-3">
                          <v-divider vertical inset style="margin: 0; height: 16px; max-height: 100%;opacity: 1; border-color: #dbdbdb"></v-divider>
                        </span>
                        <div class="inline-flex gap-x-2">
                          <div class="inline-flex"
                            v-for="page,index in item.flileIndex"
                            :key="item.id">
                            <span class="text-[14px] font-bold hover:bg-blue-300 cursor-pointer" @click="selectPdfPageNum(page)">
                              {{ page }}<template v-if="index !== item.flileIndex.length - 1">,</template>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- toolbar -->
                  <div class="flex align-center gap-x-1 ml-10">
                    <v-tooltip text="대답이 마음에 들어요" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="text"
                          icon
                          size="small"
                          >
                          <v-icon class="pl-icon20 thumbs-up"></v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="대답이 마음에 들지 않아요" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="text"
                          icon
                          size="small"
                          >
                          <v-icon class="pl-icon20 thumbs-down"></v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="응답 수정" location="bottom">
                      <template v-slot:activator="{ props: tooltip }">
                        <v-menu
                          class="dropUi"
                          location="bottom">
                          <template v-slot:activator="{ props: menu }">
                            <v-btn
                              v-bind="{ ...tooltip, ...menu }"
                              min-width="24px"
                              icon
                              size="small"
                              variant="text"
                              >
                              <v-icon class="pl-icon20 undo"></v-icon>
                            </v-btn>
                          </template>
                          <v-list width="auto">
                            <v-list-item
                              v-for="(item, i) in undoList"
                              :key="i"
                            >
                              <div
                                class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                                @click=""
                                >
                                <span class="font-normal text-[12px] normal-case">{{ item.title }}</span>
                              </div>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="공유" location="bottom">
                      <template v-slot:activator="{ props: tooltip }">
                        <v-menu
                          class="dropUi"
                          location="bottom">
                          <template v-slot:activator="{ props: menu }">
                            <v-btn
                              v-bind="{ ...tooltip, ...menu }"
                              min-width="24px"
                              icon
                              size="small"
                              variant="text"
                              >
                              <v-icon class="pl-icon20 share-black"></v-icon>
                            </v-btn>
                          </template>
                          <v-list width="auto">
                            <v-list-item
                              v-for="(item, i) in shareList"
                              :key="i"
                            >
                              <div
                                class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                                @click=""
                                >
                                <span class="font-normal text-[12px] normal-case">{{ item.title }}</span>
                              </div>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="복사/붙여넣기" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="text"
                          icon
                          size="small"
                          >
                          <v-icon class="pl-icon20 copy-paste"></v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                    <v-tooltip text="상세메뉴" location="bottom">
                      <template v-slot:activator="{ props: tooltip }">
                        <v-menu
                          class="dropUi"
                          location="bottom">
                          <template v-slot:activator="{ props: menu }">
                            <v-btn
                              v-bind="{ ...tooltip, ...menu }"
                              min-width="24px"
                              icon
                              size="small"
                              variant="text"
                              >
                              <v-icon class="pl-icon20 dot-menu-v"></v-icon>
                            </v-btn>
                          </template>
                          <v-list width="auto">
                            <v-list-item
                              v-for="(item, i) in moreList"
                              :key="i"
                            >
                              <div
                                class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                                @click=""
                                >
                                <span class="font-normal text-[12px] normal-case">{{ item.title }}</span>
                              </div>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </template>

            </div>
          </div>
        </template>
        <!-- //mark: chat input -->
        <div :class="`prism-wrap--chat absolute bottom-10 ${ isPdf && isRightMenu ? 'small' : ''}`">
          <!-- 요약 및 번역 버튼 -->
          <v-tooltip text="요약 및 번역" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="position-absolute bottom-16 left-[0px]"
                icon
                @click="[focusChatInput(true), chatInput.mode = 'summary']"
                color="#4F62CD">
                <v-icon class="pl-icon-etc prism-star"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <div
            :style="chatInput.focus ? 'border: 1px solid #4f62cd !important' : ''"
            class="prism-wrap--chat-inner border rounded-[16px] bg-white">
            <div class="flex flex-col">
              <!-- 인풋 -->
              <template v-if="chatInput.mode === 'default'">
                <v-textarea
                  class="pl-form"
                  variant="flat"
                  row-height=25
                  max-rows=8
                  rows="1"
                  hide-details
                  auto-grow
                  @focus="focusChatInput(true)"
                  @blur="focusChatInput(false)"
                  @keydown.enter="type = 'log'"
                  placeholder="메시지를 여기에 입력하세요.">
                </v-textarea>
              </template>
              <!-- 내용 요약 -->
              <template v-else-if="chatInput.mode === 'summary'">
                <div class="pt-2 px-2">
                  <div class="flex flex-col pb-4">
                    <div class="flex align-center">
                      <div>
                        <v-icon class="pl-icon-etc docu-summary"></v-icon>
                        <strong class="ml-2 text-[16px]">내용 요약</strong>
                      </div>
                      <div class="ml-auto">
                        <v-btn
                          min-width="24px"
                          icon
                          size="small"
                          variant="text"
                          @click="[focusChatInput(false), chatInput.mode = 'default']">
                          <v-icon class="pl-icon20 in-close" ></v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <!-- content -->
                  <v-tabs
                    v-model="chatSummaryTab"
                    color="indigo"
                    density="compact"
                    class="border-b pl-default-tab"
                    height="32"
                    >
                    <v-tab value="tab0">파일 요약</v-tab>
                    <v-tab value="tab1">텍스트 요약</v-tab>
                  </v-tabs>
                  <v-window v-model="chatSummaryTab">
                    <v-window-item value="tab0">
                      <div class="py-2">
                        <p class="mt-2 font-bold">요약할 파일을 내 PC에서 첨부하거나 끌어 오세요.(요약 가능한 파일의 크기는 20MB이내 입니다.)</p>
                        <div class="flex flex-col gap-y-4 w-full py-4">
                          <div class="flex">
                            <label class="pl-label flex-[0_0_150px]" for="">
                              요약할 파일
                              <v-badge color="red" dot inline></v-badge>
                            </label>
                            <div class="file-drop">
                              <div class="drop-msg">여기에 파일(PDF, Txt, DOCX)을 끌어 놓거나 클릭하십시오.</div>
                            </div>
                          </div>
                          <div class="flex">
                            <label class="pl-label flex-[0_0_150px]" for="">
                              요약 스타일
                            </label>
                            <div class="flex gap-x-6 flex-wrap justify-start">
                              <v-checkbox
                                v-for="chk in chatSummartFrom.styleOpt" :key="chk.id"
                                v-model="chk.value"
                                :label="chk.title"
                                class="pl-check "
                                true-icon="pl-icon20 chk-on"
                                false-icon="pl-icon20 chk-off"
                                ></v-checkbox>
                            </div>
                          </div>
                          <div class="flex">
                            <label class="pl-label flex-[0_0_150px]" for="">
                              적용 언어
                            </label>
                            <v-select
                              v-model="chatSummartFrom.useLangModel"
                              class=" pl-form flex-[0_0_100px]"
                              :items="chatSummartFrom.useLangOpt"
                              density="compact"
                              variant="outlined"
                              placeholder="선택하세요."
                              menu-icon="pl-icon20 arrow-up"
                              hide-details></v-select>
                          </div>
                        </div>
                      </div>
                    </v-window-item>
                    <v-window-item value="tab1">
                    </v-window-item>
                  </v-window>
                </div>
              </template>
              <!-- 보고서 작성 -->
              <template v-else-if="chatInput.mode === 'report'">
                <div class="pt-2 px-2">
                  <div class="flex flex-col pb-4">
                    <div class="flex align-center">
                      <div>
                        <v-icon class="pl-icon-etc report-write"></v-icon>
                        <strong class="ml-2 text-[16px]">보고서 작성</strong>
                      </div>
                      <div class="ml-auto">
                        <v-btn
                          min-width="24px"
                          icon
                          size="small"
                          variant="text"
                          @click="[focusChatInput(false), chatInput.mode = 'default']">
                          <v-icon class="pl-icon20 in-close" ></v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <p class="mt-2">내부 또는 외부 회의 후 회의 내용에 대한 보고서 초안을 작성합니다.</p>
                  </div>
                  <!-- content -->
                  <div class="border-t py-2">
                    <div class="flex flex-col gap-y-4 w-full py-4">
                      <div class="flex">
                        <label class="pl-label flex-[0_0_150px]" for="">
                          보고 대상
                        </label>
                        <v-text-field
                          class="pl-form"
                          density="compact"
                          variant="outlined"
                          hide-details
                          value="팀장님"></v-text-field>
                      </div>
                      <div class="flex">
                        <label class="pl-label flex-[0_0_150px]" for="">
                          보고 내용
                        </label>
                        <v-textarea
                          v-model="reportForm.textarea"
                          class="pl-form "
                          density="compact"
                          variant="outlined"
                          no-resize
                          hide-details
                          placeholder="챗봇의 설명을 입력하세요.">
                        </v-textarea>
                      </div>
                      <div class="flex">
                        <label class="pl-label flex-[0_0_150px]" for="">
                          보고 결과
                        </label>
                        <v-text-field
                          class="pl-form"
                          density="compact"
                          variant="outlined"
                          hide-details
                          value="생성형 AI 시대와 우리 기업의 준비를 할 수 있었다."></v-text-field>
                      </div>
                      <div class="flex">
                        <label class="pl-label flex-[0_0_150px]" for="">
                          보고 스타일
                        </label>
                        <v-text-field
                          class="pl-form"
                          density="compact"
                          variant="outlined"
                          hide-details
                          value="형식을 맞춤 보고서서를 만들어줘. 단 결과는 미래 지향적으로"></v-text-field>
                      </div>
                      <div class="flex">
                        <label class="pl-label flex-[0_0_150px]" for="">
                          보고 길이
                        </label>
                        <v-text-field
                          class="pl-form"
                          density="compact"
                          variant="outlined"
                          hide-details
                          value="10줄 내외의 보고서로 해줘"></v-text-field>
                      </div>
                    </div>
                  </div>

                </div>
              </template>
              <!-- 출장지 -->
              <template v-else-if="chatInput.mode === 'place'">
                <div class="pt-2 px-2">
                  <div class="flex flex-col pb-4">
                    <div class="flex align-center">
                      <div>
                        <v-icon class="pl-icon-etc report-write"></v-icon>
                        <strong class="ml-2 text-[16px]">출장지 최적의 교통편 추천</strong>
                      </div>
                      <div class="ml-auto">
                        <v-btn
                          min-width="24px"
                          icon
                          size="small"
                          variant="text"
                          @click="[focusChatInput(false), chatInput.mode = 'default']">
                          <v-icon class="pl-icon20 in-close" ></v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <p class="mt-2">출장지와 출발지에 따라 최적의 교통편을 안내해 드립니다.</p>
                  </div>
                  <!-- content -->
                  <div class="border-t py-2">
                    <div class="flex flex-col gap-y-4 w-full py-4">
                      <div class="flex"
                        v-for="item in placeForm"
                        :key="item.id">
                        <div class="flex-[0_0_150px]">
                          <v-text-field
                            class="pl-form"
                            density="compact"
                            variant="outlined"
                            hide-details
                            bg-color="#dce3fc"
                            :placeholder="item.placeholder"
                            ></v-text-field>
                        </div>
                        <span class="pl-label ml-2">{{ item.text }}</span>
                      </div>

                    </div>
                  </div>

                </div>
              </template>
              <!-- 인풋 툴바 -->
              <div class="flex align-center gap-x-2">
                <!-- 언어모델 변경 -->
                <div :class="`flex select-acitve-${chatInput.langShow}`">
                  <v-select
                    v-model="chatInput.langAi"
                    :class="`pl-form type-play ${ chatInput.langShow ? 'is-on' : ''}`"
                    :items="chatInput.langAiOpt"
                    density="compact"
                    variant="outlined"
                    placeholder="선택하세요."
                    menu-icon="pl-icon20 arrow-up"
                    @click="chatInput.langShow = true"
                    hide-details>
                    <template v-slot:selection="{ item, index }">
                      <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
                      <span class="pl-2 text-[13px]">{{ item.title }}</span>
                    </template>
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        @click="chatInput.langShow = false"
                        :title="item.title">
                        <template v-slot:prepend>
                          <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
                <!-- 지식기반 대화 -->
                <div :class="`flex select-acitve-${chatInput.knowledgeShow}`">
                  <v-select
                    v-model="chatInput.knowledgeModel"
                    :class="`pl-form type-play ${ chatInput.knowledgeShow ? 'is-on' : ''}`"
                    :items="chatInput.knowledgeOpt"
                    density="compact"
                    variant="outlined"
                    placeholder="선택하세요."
                    menu-icon="pl-icon20 arrow-up"
                    @click="chatInput.knowledgeShow = true"
                    hide-details>
                      <template v-slot:selection="{ item, index }">
                        <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
                        <span class="pl-2 text-[13px]">{{ item.title }}</span>
                      </template>
                      <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          @click="chatInput.knowledgeShow = false"
                          :title="item.title">
                          <template v-slot:prepend>
                            <v-icon :class="`pl-icon20 ${ item.raw.icon }`"></v-icon>
                          </template>
                        </v-list-item>
                      </template>

                  </v-select>
                </div>

                <v-tooltip text="마이크 사용" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="ml-auto"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 mic-on"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="스크린샷" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 capture-on"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="메시지 전송" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="msgSend()"
                      >
                      <v-icon
                        :class="`pl-icon20 ${chatInput.focus ? 'active': ''} chat-msg`"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //mark: 패널 -->
    <!-- <v-slide-x-reverse-transition>
    </v-slide-x-reverse-transition> -->
    <CataloguePanel v-if="panels.panelCatalogue.value"
      @close="hiddenPanel('panelCatalogue')"
      />
    <PromptPanel v-if="panels.panelPrompt.value"
      @close="hiddenPanel('panelPrompt')"
      @selectTemplate="selectPrompt"
      />

    <!-- //mark: right menu -->
    <div class="prism-wrap--panel">
      <template v-for="item in rightMenu" :key="item.id">
        <v-tooltip :text="item.text">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :class="[item.class, item.active ? 'menu-active' : '']"
              min-width="24px"
              height="36px"
              size="small"
              variant="text"
              @click="selectMenu(item)"
              >
              <v-icon :class="`pl-icon-playground ${ item.icon }`"></v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </div>

  </div>
</template>

<style scoped>

</style>