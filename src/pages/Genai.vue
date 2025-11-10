<script setup lang="ts">
//@ts-nocheck
import { ref, onMounted } from 'vue'

import VuePdfApp from "vue3-pdf-app"
import "vue3-pdf-app/dist/icons/main.css"

import SubtreeLayout from '@/components/subtreeLayout.vue'
import GenaiShare from '@/pages/Genai-share.vue'
import GenaiInfo from '@/pages/Genai-info.vue'
import GenaiHistory from '@/pages/Genai-history.vue'

import { useMouse } from "@/composables/event.js";
import { useMessage, useGetImageUrl } from "@/composables/common.js";


const { x, y } = useMouse();

const msg = ref(null);

onMounted(() => {
  useMessage(msg, "");
});

const selectNode = (node) => {

  if('pdfInfo' in node){
    console.log(node);
    isPdf.value = true
    pdfLink.value = node.pdfInfo.filePath
    useMessage(msg, node.text);
  }else{
    isPdf.value = false
    console.log(node);
    pdfLink.value = ''
    useMessage(msg, '');
  }
  console.log(x, y);
}
const selectedTab = ref<string>(null)

const tabNum = (tab) => {
  selectedTab.value = tab
  selectedTab.value === 'tab2' ? isPdf.value = true : false
}

const pdfPageNum = (page) => {
  window._pdfApp.page = page
}

const isPdf = ref<boolean>(false)

// avatar
const avatarList = ref([
  { url: '@avatar01.svg', name: '나관리' },
  { url: '@avatar02.png', name: '나꼼꼼' },
  { url: '@avatar03.png', name: '나문서' },
])
// 패널
const panels = {
  panelShare: ref(false),
  panelInfo: ref(false),
  panelHistory: ref(false)
}

// 패널 show hiddenPanel
const showPanel = (panel: keyof typeof panels) => {
  for (const key in panels) {
    panels[key].value = (key === panel);
  }
}
const hiddenPanel = (panel: keyof typeof panels) => {
  if (panels[panel]) {
    panels[panel].value = false
  }
}


//프롬프트 설정
const promptSetting = ref<object>({
  model: ref<string>('한국어(KO)'),
  temperature: '0.25',
  maxTokens: '600',
  topP: '0.45',
  frqPanelty: '1.00',
  prePanelty: '1.00',
})
import MonacoEditor from '@/components/monaco-editor.vue'
const code = ref<string>(
  '당신은 인사 관련 약관에 대해 사용자의 질문에 친절하게 답변해주는 \n {AgentName 어시스턴트 } 입니다.\n\n Instruction\n: 사용자의 질문에 대해 아래 검색된 context document를 기반으로 정확하고\n 간결한 답변을 서술하여 한문단으로 제공하세요.\n만약 context document에서 질문의 답을 찾을 수 없거나 명확하지 않다면\n “제가 알고 있는 지식에서 답변을 찾을 수 없습니다.”라고 답변하세요.\n\n Context Documents:\n “ ” ”\n $RelevantContexts\n “ “ “\n 답변 포맷은 아래 Output Format과 같이 숫자 글머리 기호를 달아 정리하여 답변해주세요.\n Output Format:\n 1. ...\n 2. ...\n 3. ...'
)
const dialogEditor = ref<boolean>(false)

const pdfLink = ref<String>('/test.pdf')
const currentPageNumber = ref<int>(1)

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

async function openPdf(pdfApp) {
  window._pdfApp = pdfApp;
  if (pdfApp.pdfViewer) {
    await pdfApp.pdfViewer.pagesPromise;
    pdfApp.pdfViewer.currentScale = 1;
    pdfApp.pdfViewer.currentPageNumber = 1;
  }
}

</script>

<template>
  <SubtreeLayout
    @treeClick = "selectNode"
    @selectTab = "tabNum"
    @pdfPageNum = "pdfPageNum"
    />
  <div class="flex flex-1 flex-column">
    <!-- 상단 툴바 -->
    <div class="flex align-center w-full h-[50px] px-4 py-2 border-b border-gray-200">
      <template v-if="selectedTab !== 'tab1'">
        <v-icon v-if="isPdf" class="pl-icon20 docu-pdf"></v-icon>
        <strong class="ml-2 text-[16px] "><span ref="msg"></span></strong>
      </template>
      <template v-else>
        <strong class="ml-2 text-[16px] ">Gen AI 커스텀 프롬프트</strong>
      </template>
      <div class="flex gap-x-2 align-center ml-auto">
        <span class="pr-2">
          마지막 수정일 2024-04-02 14:23:56
        </span>
        <!-- share profile -->
        <div>
          <template v-for="item in avatarList" :key="item.id">
            <v-tooltip :text="item.name" location="bottom">
              <template v-slot:activator="{ props }">
                <v-avatar
                  v-bind="props"
                  size="34px"
                  style="margin-left: -12px;"
                  :image=useGetImageUrl(item.url)></v-avatar>
              </template>
            </v-tooltip>
          </template>
        </div>
        <div class="flex gap-1 border-l pl-2 ml-2">
          <v-tooltip text="공유" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="small"
                variant="text"
                @click="showPanel('panelShare')"
                >
                <v-icon class="pl-icon20 share-black"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="정보" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="small"
                variant="text"
                @click="showPanel('panelInfo')"
                >
                <v-icon class="pl-icon20 info scale-125"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="히스토리" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="small"
                variant="text"
                @click="showPanel('panelHistory')"
                >
                <v-icon class="pl-icon20 time scale-125"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>

        </div>
      </div>
    </div>
    <template v-if="selectedTab === 'tab1'">
      <div class="flex flex-column h-full">
        <div class="flex w-full flex-1">
          <!-- 1 column -->
          <div class="flex flex-col gap-y-4 py-4 px-6 w-[50%]">
            <div>
              <label class="pl-label" for="">프롬프트 명
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details
                placeholder="프롬프트 명을 입력하세요."></v-text-field>
            </div>
            <div>
              <label class="pl-label" for="">
                프롬프트 설명
              </label>
              <v-textarea
                class="pl-form"
                density="compact"
                variant="outlined"
                no-resize
                hide-details
                placeholder="커스텀 프롬프트를 입력하세요.">
              </v-textarea>
            </div>
            <div>
              <div class="flex">
                <label class="pl-label" for="">
                  커스텀 프롬프트
                  <v-badge color="red" dot inline></v-badge>
                </label>
                <!-- 버튼 -->
                <div class="flex gap-1 ml-auto">
                  <!-- <v-tooltip text="확대" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        min-width="24px"
                        icon
                        size="small"
                        variant="text"
                        @click="dialogEditor = true"
                        >
                        <v-icon class="pl-icon20 expand scale-75"></v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip> -->
                  <v-tooltip text="프롬프트 복사" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
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
              </div>
              <!-- 에디터 -->
              <v-textarea
                :model-value="code"
                class="pl-form"
                density="compact"
                variant="outlined"
                no-resize
                row-height="25"
                rows="21"
                hide-details
                placeholder="챗봇의 설명을 입력하세요.">
              </v-textarea>
              <!-- <div class="overflow-hidden h-[420px] w-full rounded-lg border mt-2">
                <monaco-editor
                  v-model="code"
                  :editor-option="{ readOnly: false, colorDecorators: true, padding: { top: 10 }, minimap: { enabled: false} }" />
              </div> -->
              <!-- //mark: dialog editor -->
              <v-dialog
                v-model="dialogEditor"
                fullscreen
                >
                <!-- header -->
                <div class="flex align-center py-2 px-4 bg-[#4f62cd] ">
                  <strong class="text-white text-[16px]">에이전트 생성</strong>
                  <div class="ml-auto">
                    <v-btn
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="dialogEditor = false">
                      <v-icon class="pl-icon20 in-close-white" ></v-icon>
                    </v-btn>
                  </div>
                </div>
                <!-- body -->
                <div class="flex flex-1 h-full ">
                  <monaco-editor
                  v-model="code"
                  :editor-option="{ readOnly: false, colorDecorators: true,  padding: { top: 10 }}" />
                </div>
              </v-dialog>
            </div>
          </div>
          <!-- 2 column -->
          <div class="flex flex-1 flex-col gap-y-4 py-4 px-6 border-l">
            <div class="font-bold text-[15px]">프롬프트 동적 변수</div>
            <div class="w-[350px]">
              <label class="pl-label" for="">
                에이전트 명
              </label>
              <v-text-field
                class=" pl-form"
                density="compact"
                variant="outlined"
                hide-details
                value="$AgentName"
                ></v-text-field>
            </div>
            <div class="w-[350px]">
              <label class="pl-label" for="">
                언어
              </label>
              <v-select
                class=" pl-form"
                v-model="promptSetting.model"
                density="compact"
                variant="outlined"
                menu-icon="pl-icon20 arrow-up"
                hide-details></v-select>
            </div>
            <div class="w-[350px]">
              <label class="pl-label" for="">
                검색 컨텍스트
              </label>
              <v-text-field
                class=" pl-form"
                density="compact"
                variant="outlined"
                hide-details
                value="$RelevantContexts"
                ></v-text-field>
            </div>
            <div class="font-bold text-[15px] mt-2">프롬프트 동적 변수</div>
            <div class="w-[350px]">
              <label class="pl-label" for="">
                Temperature
              </label>
              <div>
                <v-slider
                  v-model="promptSetting.temperature"
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
                      v-model="promptSetting.temperature"
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
            <div class="w-[350px]">
              <label class="pl-label" for="">
                Max Tokens
              </label>
              <div>
                <v-slider
                  v-model="promptSetting.maxTokens"
                  min="0"
                  max="1000"
                  :step="1"
                  hide-details
                  track-size="1"
                  thumb-size="15"
                  color="#4f62cd"
                  >
                  <template v-slot:append>
                    <v-text-field
                      v-model="promptSetting.maxTokens"
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
            <div class="w-[350px]">
              <label class="pl-label" for="">
                Top P
              </label>
              <div>
                <v-slider
                  v-model="promptSetting.topP"
                  min="0"
                  max="1"
                  :step=".05"
                  hide-details
                  track-size="1"
                  thumb-size="15"
                  color="#4f62cd"
                  >
                  <template v-slot:append>
                    <v-text-field
                      v-model="promptSetting.topP"
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
            <div class="w-[350px]">
              <label class="pl-label" for="">
                Frequency penalty
              </label>
              <div>
                <v-slider
                  v-model="promptSetting.frqPanelty"
                  min="-2"
                  max="2"
                  :step=".05"
                  hide-details
                  track-size="1"
                  thumb-size="15"
                  color="#4f62cd"
                  >
                  <template v-slot:append>
                    <v-text-field
                      v-model="promptSetting.frqPanelty"
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
            <div class="w-[350px]">
              <label class="pl-label" for="">
                Presence penalty
              </label>
              <div>
                <v-slider
                  v-model="promptSetting.prePanelty"
                  min="-2"
                  max="2"
                  :step=".05"
                  hide-details
                  track-size="1"
                  thumb-size="15"
                  color="#4f62cd"
                  >
                  <template v-slot:append>
                    <v-text-field
                      v-model="promptSetting.prePanelty"
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
          </div>
        </div>
        <div class="mt-auto flex justify-end gap-x-2 pa-4 border-t">
          <v-btn
            class="pl-btn type-line"
            variant="flat">
            삭제</v-btn>
          <v-btn
            class="pl-btn "
            color="#4f62cd"
            variant="flat"
            >
            저장</v-btn>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- pdf viewer -->
      <template v-if="isPdf">
        <div class="pl-pdf-viewer-wrap">
          <vue-pdf-app style="height: 84vh;" theme="light" :pdf="pdfLink" @pages-rendered="openPdf" :config="config"></vue-pdf-app>
          <div class="fixed right-10 bottom-7">
            <v-badge
              color="error"
              content="12"
              @click="showPanel('panelHistory')"
              class="type-auto cursor-pointer">
              <v-icon class="pl-icon-etc comments"></v-icon>
            </v-badge>
          </div>
        </div>
      </template>
      <!-- 데이타 없을때 -->
      <template v-else>
        <div class="flex h-full justify-center align-center bg-gray-100">
          <div class="text-center pb-20">
            <div>
              <v-icon class="pl-icon-etc no-data"></v-icon>
            </div>
            <span class="text-[18px] font-bold">선택된 문서가 없습니다.</span>
            <p class="text-[16px]">
              문서를 선택하여 상세 내용을 작성하거나,<br>
              문서의 설정 값도 수정할 수 있습니다.
            </p>
          </div>
        </div>

      </template>
    </template>
    <!-- 패널 -->
    <v-slide-x-reverse-transition>
      <GenaiShare v-if="panels.panelShare.value"
        @close="hiddenPanel('panelShare')"
        />
    </v-slide-x-reverse-transition>
    <v-slide-x-reverse-transition>
      <GenaiInfo v-if="panels.panelInfo.value"
        @close="hiddenPanel('panelInfo')"
        />
    </v-slide-x-reverse-transition>
    <v-slide-x-reverse-transition>
      <GenaiHistory v-if="panels.panelHistory.value"
        @close="hiddenPanel('panelHistory')"
        />
    </v-slide-x-reverse-transition>

  </div>
</template>



<style scoped>

</style>