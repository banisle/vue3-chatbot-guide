<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted  } from 'vue'
import { useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'

// visible
const storeChatbotPreview = useChatobtPreviewStore()
const { isVisible } = storeToRefs(storeChatbotPreview)

// chatlog
const chatLog = ref([
  {
    type: 'notice',
    text: '새로운 채팅이 시작되었습니다',
  },
  {
    type: 'bot',
    text: '안녕하세요, 저는 당신의 업무를 지원하는 챗봇입니다. 이것은 샘플 메시지입니다.',
  },
  {
    type: 'cs',
    text: '나고객',
  },
  {
    type: 'bot',
    text: '나고객님!. 반가워요^^',
  },
  {
    type: 'notice',
    text: '채팅이 종료되었습니다',
  },
])

// training
const chart = ref({
  DonughtData: {
    labels: [ '트레이닝 완료', '트레이닝 실패' ],
    datasets: [
      {
        backgroundColor: ['#5D9CF5', '#FF7C80', '#6771DC', '#B9BDC9', '#D9D9D9'],
        data: [98, 2],
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
          padding: 20,
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'Rounded',
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: ` ${chart.data.labels[i]} ${data}%`,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: 0,
              lineWidth: 0,
              index: i
            }))
          }
        },

      }
    },
  },
})
let agentAcco = ref<object>({
  active: false,
  loading: false,
  loadingDone: false,
})
const load = () => {
  agentAcco.value.loading = true
  setTimeout(() => (
    agentAcco.value.loadingDone = true
  ), 2000)
}
const reload = () => {
  agentAcco.value.loading = false
  agentAcco.value.loadingDone = false
}
</script>
<template>
  <template v-if="isVisible">
    <div class="ui-chat-wrap shadow-md">
      <!-- 헤더 -->
      <div class="ui-chat-header">나의 첫번째 챗봇
        <v-btn
          class="ml-auto"
          max-width="30px"
          max-height="30px"
          icon
          size="small"
          variant="flat"
          color="transparent"
          @click="storeChatbotPreview.toggleVisible(false)">
          <v-icon class="pl-icon20 in-close-white"></v-icon>
        </v-btn>
      </div>
      <!-- 채팅 내역 -->
      <div class="ui-chat-inner">
        <!--  training -->
        <div class="flex flex-col align-center">
          <div class="flex w-full align-center h-[40px]">
            <div class="flex align-center">
              <div class="w-4 h-4 rounded-full bg-[#ffd5d5] border-2 border-[#fa6a6a] mr-2"></div>
              <span class="text-[15px]">Training</span>
            </div>
            <v-tooltip :text="agentAcco.active ? '닫힘' : '펼침'" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="ml-auto"
                  v-bind="props"
                  variant="flat"
                  icon
                  size="small"
                  color="transparent"
                  @click="agentAcco.active = !agentAcco.active"
                  >
                  <v-icon :class="`pl-icon20 ${ agentAcco.active ? 'arrow-down' : 'arrow-up' }`"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <div
            v-if="agentAcco.active"
            class="flex flex-col w-full align-center ">
            <template v-if="agentAcco.loadingDone">
              <div class="pl-chart-box mt-2 p-2" style="height: 110px;">
                <DoughnutChart
                  :data="chart.DonughtData"
                  :options="chart.DonughtOptions"
                  />
              </div>
              <div class="w-[140px]">
                <v-btn
                  class="pl-btn w-full mt-2"
                  color="#333"
                  @click="reload()"
                  variant="flat">
                  트레이닝 다시하기
                </v-btn>
              </div>

            </template>
            <template v-if="!agentAcco.loadingDone">
              <div v-if="!agentAcco.loading" class="flex flex-col align-center h-[110px]">
                <v-icon class="pl-icon-etc training-q"></v-icon>
                <strong class="mt-2 text-[16px]">에이전트  학습이 필요합니다.</strong>
                <p>새로운  인텐트, 엔티티 적용을 위해 에이전트를 학습시키십시오.</p>
              </div>
              <div v-else class="flex flex-col align-center h-[110px]">
                <div class="flex justify-center w-full h-[60px] pt-4">
                  <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <strong class="mt-2 text-[16px]">에이전트 학습이 진행 중입니다.</strong>
                <p>학습량 과 자원에 따라 몇 분 정도 걸릴 수도 있습니다.</p>
              </div>
              <div class="w-[140px]">
                <v-btn
                  v-bind="props"
                  :loading="agentAcco.loading"
                  class="pl-btn w-full mt-2"
                  color="#333"
                  @click="load()"
                  variant="flat">
                  <template v-slot:loader>
                    <v-progress-circular
                      :size="20"
                      :width="2"
                      color="#FFF"
                      indeterminate
                    ></v-progress-circular>
                    <span class="ml-2">
                      트레이닝 취소
                    </span>
                  </template>
                  트레이닝 하기
                </v-btn>
              </div>
            </template>
          </div>
        </div>
        <!-- log -->
        <template v-for="msg in chatLog" :key="msg.id">
          <div
            v-if="msg.type === 'notice'"
            class="ui-chat-msg"><span>{{msg.text}}</span></div>
          <div v-else class="flex ">
            <v-icon
              v-if="msg.type === 'bot'"
              class="pl-icon20 chat-logo"></v-icon>
            <div :class="`ui-msg ${msg.type}`">
              {{msg.text}}</div>
          </div>
        </template>
      </div>
      <!-- 채팅 입력 -->
      <div class="ui-chat-input">
        <v-text-field
          class="pl-form "
          density="compact"
          rounded="0"
          variant="flat"
          hide-details
          placeholder="무엇이든 물어보세요."
        ></v-text-field>
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="flat"
          >
          <v-icon class="pl-icon20 chat-msg"></v-icon>
        </v-btn>

      </div>

    </div>


  </template>
</template>


<style scoped>

</style>