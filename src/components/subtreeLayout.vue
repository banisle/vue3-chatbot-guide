<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits  } from 'vue'
import GenaiUploadDialog from '@/pages/Genai-upload-dialog.vue'
import BarChart from '@/components/chart/BarChart.vue'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'

const emit = defineEmits(["treeClick, selectTab, pdfPageNum"]);

const tab = ref(null)
const selectedTab = ref(null)
const selectTab = (tab) => {
  selectedTab.value = tab
  emit("selectTab", tab);
}

const selectPdfPageNum = (page) => {
  emit("pdfPageNum", page);
}

const filterList = ref([
  { title: '전체 카탈로그' },
  { title: '공유 카탈로그' },
  { title: '내 카탈로그' },
])

// tree
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";

const treeData = ref ({
  config: {
    roots: ["id0"],
    keyboardNavigation: true,
    dragAndDrop: false,
    checkboxes: true,
    editable: false,
    disabled: false,
    padding: 12,
    openedIcon: {
      type: "class",
      class: "pl-icon20 tree-open",
    },
    closedIcon: {
      type: "class",
      class: "pl-icon20 tree-close",
    },

  },
  nodes: {
    id0: {
      text: "한국클라우드",
      children: ["id1", "id2", "id3", "id4"],
      state: { opened: true, },
    },
      id1: {
        text: "사내규정 (21)",
        children: ["id11",],
        state: { opened: true, }
      },
        id11: {
          text: "HR 관리 (6)",
          children: ["id111", "id112", "id113", 'id114', 'id115', 'id116'],
          state: { opened: true, }
        },
          id111: {
            text: "여비규정",
            pdfInfo : {filePath : '/sample_01.pdf'}
          },
          id112: {
            text: "전결규정",
            pdfInfo : {filePath : '/sample_02.pdf'}
          },
          id113: {
            text: "휴가규정",
            pdfInfo : {filePath : '/sample_03.pdf'}
          },
          id114: {
            text: "인사규정",
            pdfInfo : {filePath : '/sample_00.pdf'}
          },
          id115: {
            text: "급여규정",
            pdfInfo : {filePath : '/sample_04.pdf'}
          },
          id116: {
            text: "근무평정규정",
            pdfInfo : {filePath : '/sample_05.pdf'}
          },

      id2: {
        text: "재무/회계 기준 (6)",
        children: ["id21", "id22", "id23", 'id24', 'id25', 'id26'],
        state: { opened: true, }
      },
        id21: { text: "회계규정", pdfInfo : {filePath : '/sample_06.pdf'}},
        id22: { text: "내부회계관리규정", pdfInfo : {filePath : '/sample_01.pdf'}},
        id23: { text: "경비관리규정", pdfInfo : {filePath : '/sample_02.pdf'}},
        id24: { text: "예산관리규정", pdfInfo : {filePath : '/sample_03.pdf'}},
        id25: { text: "경비지급규정", pdfInfo : {filePath : '/sample_04.pdf'}},
        id26: { text: "경조금규정", pdfInfo : {filePath : '/sample_05.pdf'}},
      id3: {
        text: "정보보안 규정 (3)",
        children: ["id31", "id32"],
      },
      id4: {
        text: "기타 (12)",
        children: ["id41", "id42"],
      },

  },
})

const nodeClick = (value) => {
  emit("treeClick", value);
}

// 사용량 보기
const showUsage = ref<boolean>(false)
const usageStat = ref([
  { title: '용량', value: '500MB' },
  { title: '사용량', value: '150MB' },
  { title: '가용량', value: '350MB' },
])
const docuStat = ref([
  { icon: 'cloud-chk', title: '전체 문서 ', value: '38' },
  { icon: 'cloud-upload', title: '내가 올린 문서 ', value: '17' },
  { icon: 'cloud-share', title: '공유 문서 ', value: '6' },
])

// 지식문서 등록 dialog
const dialogUpload = ref<boolean>(false)

// 프롬프트
const promptFilterList = ref([
  { title: '전체 프롬포트' },
  { title: '공유 프롬포트' },
  { title: '내 프롬포트' },
])
const promptList = ref([
  {
    title: 'Gen AI 답변',
    status: 'System',
    desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.',
    answer: '나똒띠',
    date: '2024-04-15',
    active: false,
  },
  {
    title: 'Gen AI 커스텀 프롬프트',
    status: 'Custom',
    desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.',
    answer: '나똒띠',
    date: '2024-04-15',
    active: true,
  },
  { title: 'Gen AI 답변', status: 'System', desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.', answer: '나똒띠', date: '2024-04-15',active: false, },
  { title: 'Gen AI 답변', status: 'System', desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.', answer: '나똒띠', date: '2024-04-15',active: false, },
  { title: 'Gen AI 답변', status: 'System', desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.', answer: '나똒띠', date: '2024-04-15',active: false, },
  { title: 'Gen AI 답변', status: 'System', desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.', answer: '나똒띠', date: '2024-04-15',active: false, },
  { title: 'Gen AI 답변', status: 'System', desc: '프롬프트 제약 및 외부 지식 참고 없이 생성 AI의 응답을 변환없이 변환됩니다.', answer: '나똒띠', date: '2024-04-15',active: false, },
])

// ai chat
const aichatData = ref('')
const aichatResult = ref([
  {
    q: '해외출장 숙박비 지급기준은?',
    a: '국외 장기출장인 경우 1 개월을 초과하는 출장일에 대한 일비, 식비 및 숙박비는 70%를 지급한다.',
    referIndexing: [4,7,10]
  },
  {
    q: '해외 출장비 지급기준을 알려줘',
    a: '국외출장비 지급기준은 다음과 같습니다.<br><br>국외출장여비는 아래 각 호의 기준으로 별표 제 3 호에 의하여 지급한다.<br>1. 교통비 : 항공기 탑승기준에 의한 실비 정산<br>2. 숙박비 : 실비정산 단, 직원은 Standard Room 기준으로 이용한다.<br> 3. 식비와 일비 : 식비와 일비는 정액 지급한다.<br>',
    referIndexing: [1,6,8]
  },
])

  // chart
  const chart = ref({
    // 파일 유형별 등록 현황
    BarData: {
      labels: [ 'PDF', 'Word', 'Excel', 'Txt', 'Etc' ],
      datasets: [
        {
          backgroundColor: '#4786e3',
          data: [420, 300, 200, 200, 200, 200,],
        },
      ],
    },
    BarOptions: {
      responsive: true,
      maintainAspectRatio: false,
      borderRadius: 8,
      plugins: {
        legend: {
          display: false,
        }

      },
    },
    // 파일 유형별 용량
    DonughtData: {
      labels: [ 'PDF', 'Word', 'Excel', 'Txt', 'Etc' ],
      datasets: [
        {
          backgroundColor: ['#506FD9', '#85B6FF', '#50586D', '#B9BDC9', '#D9D9D9'],
          data: [51, 33, 12, 6, 3 ],
        }
      ]
    },
    DonughtOptions: {
      responsive: true,
      maintainAspectRatio: false,
      borderWidth: 0,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            padding: 10,
            boxWidth: 10,
            usePointStyle: true,
            pointStyle: 'Rounded',
          },
        }
      },
    },
  })
</script>

<template>
  <div class="layout-subtree">
    <v-tabs
      v-model="tab"
      color="indigo"
      density="compact"
      class="border-b pl-default-tab"
      height="50"
      @click="selectTab(tab)"
      >
      <v-tab value="tab0">지식 카탈로그</v-tab>
      <v-tab value="tab1">프롬프트</v-tab>
      <v-tab value="tab2">AI Chat</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <!-- 지식 카탈로그 -->
      <v-window-item value="tab0">
        <div class="flex flex-column relative h-[calc(100vh-150px)]">
          <!-- 상단 검색 -->
          <div class="p-4 pb-0">
            <v-text-field
              append-inner-icon="pl-icon20 in-search"
              density="compact"
              variant="outlined"
              rounded
              hide-details
              single-line
              clearable
              clear-icon="pl-icon20 in-close"
              class="pl-form"
              placeholder="문서 또는 단어, 키워드를 입력하세요."
              @click:append-inner=""
            ></v-text-field>
          </div>
          <div class="border-b">
            <div class="flex align-center p-4">
              <span class="text-[14px] font-bold">문서 현황 (38) </span>
              <div class="ml-auto flex gap-1 align-center">
                <v-tooltip text="필터" location="bottom">
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
                          <v-icon class="pl-icon20 type-filter"></v-icon>
                        </v-btn>
                      </template>
                      <v-list width="200px">
                        <v-list-item
                          v-for="(item, i) in filterList"
                          :key="i"
                        >
                          <div
                            class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                            @click=""
                            >
                            <span class="font-normal text-sm normal-case pl-2">{{ item.title }}</span>
                          </div>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-tooltip>
                <v-tooltip text="지식 분류" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="showUsage = false"
                      >
                      <v-icon class="pl-icon20 category"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="사용량 보기" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="showUsage = true"
                      >
                      <v-icon class="pl-icon20 info scale-125"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
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
            </div>
          </div>
          <!-- 지식 분류 트리 -->
          <template v-if="!showUsage">
            <!-- tree -->
            <div class="p-4 h-full pl-scrollable">
              <div class="pl-tree border-none pa-0">
                <tree
                  @nodeFocus="nodeClick($event)"
                  :config="treeData.config"
                  :nodes="treeData.nodes">
                  <template #before-input="props">
                    <span class="before pl-1">
                      <v-icon
                        v-if="!props.node.children.length"
                        class="pl-icon20 tree-docu"></v-icon>
                    </span>
                  </template>
                </tree>
              </div>
            </div>
            <!-- 하단 툴바 -->
            <div class="flex gap-1 align-center p-4 border-t mt-auto h-[50px]">
              <v-tooltip text="분류 생성" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 add-folder"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="문서 등록" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    @click="dialogUpload = true"
                    >
                    <v-icon class="pl-icon20 cloud-up"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="분류 삭제" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 trash"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="위로" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="ml-auto"
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 box-up"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="아래로" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 box-down"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </template>
          <!-- 사용량 보기 -->
          <template v-else>
            <div class="p-4 h-full pl-scrollable flex flex-column gap-y-6">
              <!-- 사용량 현황 -->
              <div>
                <v-progress-linear
                  color="orange"
                  bg-color="#000"
                  model-value="30"
                  height="10"
                  rounded
                ></v-progress-linear>
                <div class="mt-2 text-right">
                  <span class="text-orange">150MB</span> / <span>500MB</span>
                </div>
                <div class="flex align-center justify-between mt-3">
                  <div
                    class="flex-1 flex flex-column text-center"
                    v-for="item in usageStat"
                    :key="item.id">
                    <span>{{ item.title }}</span>
                    <span>{{ item.value }}</span>
                  </div>
                  <v-tooltip text="업그레이드" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        class="ml-auto"
                        v-bind="props"
                        variant="text"
                        icon
                        size="small"
                        >
                        <v-icon class="pl-icon20 upgrade"></v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </div>
              </div>
              <!-- 파일 유형별 용량 -->
              <div class="border-t pt-4">
                <span class="text-[14px] font-bold">파일 유형별 용량</span>
                <div class="pl-chart-box mt-2 p-2" style="height: 140px">
                  <DoughnutChart
                    :data="chart.DonughtData"
                    :options="chart.DonughtOptions"
                    />
                </div>
              </div>
              <!-- 파일 유형별 등록 현황 -->
              <div class="border-t pt-4">
                <span class="text-[14px] font-bold">파일 유형별 등록 현황</span>
                <div class="pl-chart-box mt-2" style="height: 150px">
                  <BarChart
                    :data="chart.BarData"
                    :options="chart.BarOptions"
                    />
                </div>
              </div>
              <!-- 문서 현황 -->
              <div class="border-t pt-4">
                <div
                  class="flex py-1"
                  v-for="item, index in docuStat"
                  :key="item.id">
                  <v-icon v-if="item.icon" :class="`pl-icon20 ${item.icon}`"></v-icon>
                  <span class="text-[13px] ml-2">{{ item.title }}</span>
                  <span class="text-[13px] ml-auto">
                    {{ item.value }}
                  </span>
                </div>
              </div>
            </div>
          </template>

        </div>
        <!-- dialog -->
        <v-dialog
          v-model="dialogUpload"
          width="auto"
          >
          <GenaiUploadDialog
            @close="dialogUpload = false"
          />
        </v-dialog>
      </v-window-item>
      <!-- //mark: 프롬프트 -->
      <v-window-item value="tab1">
        <div class="flex flex-column relative h-[calc(100vh-150px)]">
          <!-- 상단 검색 -->
          <div class="p-4 pb-0">
            <v-text-field
              append-inner-icon="pl-icon20 in-search"
              density="compact"
              variant="outlined"
              rounded
              hide-details
              single-line
              clearable
              clear-icon="pl-icon20 in-close"
              class="pl-form"
              placeholder="프롬프트 명을 입력하세요."
              @click:append-inner=""
            ></v-text-field>
          </div>
          <div class="border-b">
            <div class="flex align-center p-4">
              <span class="text-[14px] font-bold">문서 현황 (38) </span>
              <div class="ml-auto flex gap-1 align-center">
                <v-tooltip text="필터" location="bottom">
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
                          <v-icon class="pl-icon20 type-filter"></v-icon>
                        </v-btn>
                      </template>
                      <v-list width="200px">
                        <v-list-item
                          v-for="(item, i) in promptFilterList"
                          :key="i"
                        >
                          <div
                            class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                            @click=""
                            >
                            <span class="font-normal text-sm normal-case pl-2">{{ item.title }}</span>
                          </div>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-tooltip>
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
                <v-tooltip text="프롬포트 등록" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 circle-plus"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>

              </div>
            </div>
          </div>
          <!-- list -->
          <div class="flex flex-column h-full pl-scrollable">
            <div
              :class="`flex flex-column p-4 border-b hover:bg-gray-100 cursor-pointer ${ item.active ? 'bg-gray-100' :'' }`"
              v-for="item in promptList"
              :key="item.id">
              <div class="flex align-center">
                <strong>{{ item.title }}</strong>
                <v-chip
                  :color="item.status === 'System' ? 'blue' : 'green'"
                  size="small"
                  class="w-[70px] justify-center ml-auto"
                  variant="flat">
                  {{ item.status }}
                </v-chip>
              </div>
              <p class="mt-2">{{ item.desc }}</p>
              <div class="flex align-center mt-2">
                <span>
                  <v-icon class="pl-icon20 people"></v-icon>
                  <span class='ml-2'>{{ item.answer }}</span>
                </span>
                <span class="ml-4">
                  <v-icon class="pl-icon20 voc-date"></v-icon>
                  <span class='ml-2'>{{ item.date }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </v-window-item>
      <!-- AI Chat -->
      <v-window-item value="tab2">
        <div class="flex flex-column relative h-[calc(100vh-150px)]">
          <div class="p-4">
            <v-menu location="bottom" >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="pl-btn type-line w-full mt-2 justify-space-between"
                  append-icon="pl-icon20 arrow-up"
                  variant="flat"
                  hide-details
                >
                문서의 범위를 선택하세요.
                </v-btn>
              </template>
              <div class="pl-tree pl-scrollable h-[250px]">
                <tree
                  :config="treeData.config"
                  :nodes="treeData.nodes">
                  <template #before-input="props">
                    <span class="before pl-1">
                      <v-icon
                        v-if="!props.node.children.length"
                        class="pl-icon20 tree-docu"></v-icon>
                    </span>
                  </template>
                </tree>
              </div>

            </v-menu>
          </div>
          <div class="border-t p-4">
            <!-- no data -->
            <template v-if="aichatData.length === 0">
              <div class="text-center">
                지식문서 내에서 답변을 제공합니다.
              </div>
            </template>
            <!-- data -->
            <template v-else>
              <div class="flex flex-column gap-y-4">
                <div
                  calss="flex flex-column"
                  v-for="item in aichatResult"
                  :key="item.id">
                  <div>
                    <v-icon class="pl-icon20 grid-agent-type01"></v-icon>
                    <span class="pl-2">{{item.q}}</span>
                  </div>
                  <div class="rounded-lg border  mt-2">
                    <div class="flex p-2">
                      <v-icon class="pl-icon20 ai-answer"></v-icon>
                      <div v-html="item.a"></div>
                    </div>
                    <div class="flex gap-1 p-2 align-center mt-1 border-t">
                      <div>
                        <v-tooltip text="좋아요" location="bottom">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              class="ml-auto"
                              v-bind="props"
                              variant="text"
                              icon
                              size="small"
                              >
                              <v-icon class="pl-icon20 thumbs-up"></v-icon>
                            </v-btn>
                          </template>
                        </v-tooltip>
                        <v-tooltip text="도움 안되요" location="bottom">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              class="ml-auto"
                              v-bind="props"
                              variant="text"
                              icon
                              size="small"
                              >
                              <v-icon class="pl-icon20 thumbs-down"></v-icon>
                            </v-btn>
                          </template>
                        </v-tooltip>
                        <v-tooltip text="복사" location="bottom">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              class="ml-auto"
                              v-bind="props"
                              variant="text"
                              icon
                              size="small"
                              >
                              <v-icon class="pl-icon20 copy-paste"></v-icon>
                            </v-btn>
                          </template>
                        </v-tooltip>
                      </div>
                      <div class="ml-auto flex gap-1">
                        [
                        <div
                          v-for="page,index in item.referIndexing"
                          :key="item.id">
                          <span class="text-[14px] font-bold hover:bg-blue-300 cursor-pointer" @click="selectPdfPageNum(page)">
                            {{ page }}
                          </span>
                          <template v-if="index !== item.referIndexing.length - 1">,</template>
                        </div>
                        ]
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </template>
          </div>
          <!-- 하단 툴바 -->
          <div class="flex gap-1 align-center p-4 border-t mt-auto h-[50px]">
            <v-text-field
              append-inner-icon="pl-icon20 refresh"
              density="compact"
              variant="outlined"
              rounded
              hide-details
              single-line
              clearable
              clear-icon="pl-icon20 in-close"
              class="pl-form"
              placeholder="질문을 입력하세요."
              @click:append-inner="aichatData = ''"
              @keydown.enter="aichatData = true"
            ></v-text-field>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </div>

</template>



<style scoped>

</style>