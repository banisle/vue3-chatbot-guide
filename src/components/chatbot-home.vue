<script setup lang="ts">
//@ts-nocheck
import { ref, computed } from 'vue'
import ChatbotCreateDialog from '@/pages/chatbot-create-dialog.vue';
import ChatbotCanvas from '@/components/chatbot-canvas.vue';
import AgentSummary from '@/pages/agent-summary.vue';
import AgentInfo from '@/pages/agent-info.vue';


// 시나리오
const scenarioList = ref([
  {
    icon: 'type01',
    title: '사내 규정관리 챗봇',
    desc: '사내 인사관리 규정을 대상으로 한 QA 챗봇입니다.',
    creator: '나생성(플랫폼개발본부)',
    createDate: '2024-04-02',
    comment: 7,
    badge: 'NEW',
    active: false,
  },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type02', title: '보고서 작성 챗봇', desc: '2024년도 귀속 연말정산을 위한 근로 자용 안내 자료입니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type02', title: '업무용 차량 신청시스템', desc: '법인차량 사용을 위한 신청시스템', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type05', title: '2023년 부서별 매출현황', desc: '2023년에 사업기획 인벤토리에 대한 본부별/팀별 수주 상황 및 매출 자료', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type04', title: '홈페이지 고객응대 챗봇', desc: '대표 홈페이지에 방문하는 고객 대상 응대 챗봇입니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type02', title: '렌트 장비 현황', desc: '사내 렌트 장비에 대한 현황과 사용자 정보를 확인할 수 있습니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type03', title: '신제품 사용자 매뉴얼', desc: '신제품의 사용자 매뉴얼 안내용 챗봇 입니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type06', title: '근로기준법 안내', desc: '근로기준법 본문, 부칙, 시행령을 확인 할 수 있습니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type06', title: '2024년 귀속 근로자용 연말정산 안내자료', desc: '2024년도 귀속 연말정산을 위한 근로 자용 안내 자료입니다.', createDate: '2024-04-02', comment: 7, },
  { active: false, creator: '나생성(플랫폼개발본부)', icon: 'type07', title: '네이버 톡톡 고객응대 챗봇', desc: '2024년도 귀속 연말정산을 위한 근로 자용 안내 자료입니다. ', createDate: '2024-04-02', comment: 7, },

])
// filter list
const filterScenario = ref(0)


// 챗봇생성
const dialogCreateChatbot = ref<boolean>(false)
const createChatbot = () => {
  dialogCreateChatbot.value = true;
}
const removeCard = (index) => {
  scenarioList.value.splice(index,1)
}

// 레이아웃
// const layoutMode = ref<string>('scenario')
const layoutMode = ref<string>('canvas')
const saveChatbotDialg = () => {
  layoutMode.value = 'canvas';
  dialogCreateChatbot.value = false;
}

// 에이전트 정보
const dialgoAgentInfo = ref<boolean>(false)
const selectCardInfo = ref<object>()
const removeCardActive = () => {
  for (let index = 0; index < scenarioList.value.length; index++) {
    scenarioList.value[index].active = false
  }
}
const showCardInfo = (card) => {
  removeCardActive()
  card.active = true
  dialgoAgentInfo.value = true
  selectCardInfo.value = card
}
const closeAgentInfo = () => {
  dialgoAgentInfo.value = false
  removeCardActive()
}

</script>
<template>
  <div class="flex flex-col w-full bg-gray-100">
    <!-- layout: 시나리오 리스트 -->
    <div v-if="layoutMode === 'scenario'" class="flex flex-col w-full">
      <!-- top toolbar -->
      <div class="layout-content-top">
        <h2 class="text-[20px] font-bold">에이전트</h2>
        <div class="flex  gap-x-2 ml-auto">
          <v-text-field
            append-inner-icon="pl-icon20 in-search"
            density="compact"
            variant="outlined"
            rounded
            min-width="180px"
            hide-details
            single-line
            clearable
            clear-icon="pl-icon20 in-close"
            class="w-60 pl-form"
            placeholder="에이전트 검색"
            @click:append-inner=""
          ></v-text-field>
          <v-btn
            class="pl-btn"
            prepend-icon="pl-icon20 add-white"
            color="#4f62cd"
            @click="createChatbot"
            variant="flat">
            에이전트 생성
          </v-btn>
        </div>
      </div>
      <div class="flex">
        <!-- 카드 리스트 -->
        <div class="flex-1">
          <!-- scenario toolbar -->
          <div class="flex align-center w-full h-[50px] px-4 border-b border-gray-200 bg-gray-100">
            <v-tabs
              color="indigo"
              density="compact"
              class="border-b pl-default-tab"
              height="50"
              >
              <v-tab >전체</v-tab>
              <v-tab >지식</v-tab>
              <v-tab >데이터</v-tab>
              <v-tab >어플리케이션</v-tab>
            </v-tabs>
            <!-- 버튼 -->
            <div class="ml-auto flex align-center">
              <v-tooltip text="새로고침" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 refresh"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-btn-toggle
                v-model="filterScenario"
                class="pl-btn-toggle type-icon"
                density="compact"
                variant="plain"
                mandatory
                >
                <v-tooltip text="요약보기" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="36px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 board-grid"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="목록보기" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="36px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 board-list"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-btn-toggle>
            </div>

          </div>
          <!-- scenario list -->
          <div class="grid grid-cols-4 auto-rows-max gap-4 p-6 pl-scrollable h-[calc(100vh-155px)]" >
            <!-- list  -->
            <div
              :class="`chatbot-card border rounded-lg bg-white active-${scenario.active}`"
              v-for="scenario, index in scenarioList"
              :key="scenario.id">
              <div v-if="scenario.badge"
                class="card-badge">
                {{ scenario.badge }}
              </div>
              <div class="flex align-center p-4">
                <v-icon
                  style="width: 35px !important; height: 35px !important;"
                  :class="`flex-[0_0_35px] pl-icon20 grid-agent-${scenario.icon}`"></v-icon>
                <strong class="pl-2 text-[14px] truncate">
                  {{scenario.title}}
                </strong>
              </div>
              <div class="h-[70px] text-ellipsis overflow-hidden text-sm px-4">
                {{scenario.desc}}
              </div>
              <div class="flex justify-space-between mt-4 border-t h-[50px] p-4">
                <div class="text-[12px] text-slate-600">
                  <div class="d-inline-flex align-center ">
                    <v-icon class="pl-icon20 card-comment"></v-icon>
                    <span class="ml-2">{{scenario.comment}}</span>
                  </div>
                  <div class="d-inline-flex align-center ml-4">
                    <v-icon class="pl-icon20 card-date"></v-icon>
                    <span class="ml-2">{{scenario.createDate}}</span>
                  </div>
                </div>
              </div>
              <div class="chatbot-card--btn h-[50px] px-2 mt-4">
                <v-tooltip text="챗봇 삭제" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="removeCard(index)"
                      >
                      <v-icon class="pl-icon20 card-remove"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="상세 정보" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="ml-auto"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      @click="showCardInfo(scenario)"
                      >
                      <v-icon class="pl-icon20 card-info"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="플로우 수정" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      min-width="24px"
                      icon
                      size="small"
                      variant="text"
                      >
                      <v-icon class="pl-icon20 card-edit"></v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>


            </div>
          </div>
        </div>
        <!-- 현황 패널 -->
        <AgentSummary />
        <!-- 정보 패널 -->
        <v-slide-x-reverse-transition>
          <AgentInfo v-if="dialgoAgentInfo"
            :scenario = selectCardInfo
            @close="closeAgentInfo"
          />
        </v-slide-x-reverse-transition>
      </div>
    </div>
    <!-- layout: 챗봇 빌더 -->
    <ChatbotCanvas v-else/>
  </div>
  <!-- dialog -->
  <v-dialog
    v-model="dialogCreateChatbot"
    width="auto"
  >
    <ChatbotCreateDialog
      @close="dialogCreateChatbot = false"
      @saveStep="saveChatbotDialg()"
    />
  </v-dialog>
</template>


<style scoped>

</style>