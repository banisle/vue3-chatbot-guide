<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import BarChart from '@/components/chart/BarChart.vue'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'

const categoryList = ref([
  { title: '고객 응대', value: '315' },
  { title: '사내 업무지식', value: '20,312' },
  { title: '사내 업무지원', value: '1,247' },
  { title: '서비스 기획', value: '21,456' },
  { title: '마케팅', value: '7,300' },
  { title: '외부지식', value: '7,300' },
])
const chatbotList = ref([
  { title: '생성일', value: '2024-04-15' },
  { title: '카탈로그', value: '어플리케이션' },
  { title: '카테고리', value: '사내 업무관리' },
  { title: '언어', value: '한국어(KO)' },
  { title: 'AI언어 모델', value: 'ChatGPT 4', icon: 'prompt-gpt4' },
])

const agentHeaders = ref([
    { title: '에이전트', align: 'start', sortable: false, key: 'data01' },
    { title: '에이전트 ID', align: 'start', key: 'data02' },
    { title: '상태', align: 'start', key: 'data03' },
    { title: '카탈로그', align: 'start', key: 'data04' },
    { title: '질문 개수', align: 'start', key: 'data05' },
    { title: '일 평균', align: 'start', key: 'data06' },
    { title: '질문 개수', align: 'start', key: 'data07' },
    { title: '비율', align: 'start', key: 'data08' },
    { title: '추이', align: 'start', key: 'data09' },
  ])

const agentData = ref([
  {
    type: 'type01',
    data01: '보고서 작성 챗봇',
    data02: 'prm-sas5830',
    data03: '활성',
    data04: '지식',
    data05: '18,500',
    data06: '4,875',
    data07: '50',
    data08: '18.5%',
    data09: '',
  },
  { type: 'type02', data01: '사내 규정관리 챗봇', data02: 'prm-sas5830', data03: '활성', data04: '어플리케이션', data05: '18,500', data06: '4,875', data07: '50', data08: '18.5%', data09: '', },
  { type: 'type03', data01: '신제품 사용자 매뉴얼', data02: 'prm-sas5830', data03: '활성', data04: '지식', data05: '18,500', data06: '4,875', data07: '50', data08: '18.5%', data09: '', },
  { type: 'type04', data01: '홈페이지 고객응대 챗봇', data02: 'prm-sas5830', data03: '비활성', data04: '지식', data05: '18,500', data06: '4,875', data07: '50', data08: '18.5%', data09: '', },
])
const gridTab = ref(null)

// top
const range = ref({
  start: new Date(2020, 9, 12),
  end: new Date(2020, 9, 16),
});

// chart
const chart = ref({
  // 일별 에이전트 사용 현황
  BarData: {
    labels: [
      '4/15',
      '4/16',
      '4/17',
      '4/18',
      '4/19',
      '4/20',
      '4/21',

    ],
    datasets: [
      {
        backgroundColor: '#4786e3',
        data: [58000, 37000, 40000, 12000, 20000, 18000, 15000],
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
  BarOptions2: {
    responsive: true,
    maintainAspectRatio: false,
    borderRadius: 8,
    // indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      }

    },
  },
  // 에이전트 사용률
  DonughtData: {
    labels: [ '지식', '데이터', '어플리케이션' ],
    datasets: [
      {
        backgroundColor: ['#9481F3', '#67B7DC', '#6771DC', '#B9BDC9', '#D9D9D9'],
        data: [120043, 4500, 8345],
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
              text: ` ${chart.data.labels[i]} (${formatNumber(data)})`,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: 0,
              lineWidth: 0,
              align: 'end',
              index: i
            }))
          }
        },
      }
    },
  },
})
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

</script>

<template>
  <ContentTopLayout>
    <template v-slot:header>
      <div class="ml-auto flex align-center">
        <span class="pl-label">기간</span>
        <VDatePicker v-model="range" is-range>
          <template #default="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center ml-2">
              <v-text-field
                style="width: 90px"
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details
                :value="inputValue.start"
                v-on="inputEvents.start"
              ></v-text-field>
              <span class="px-2">~</span>
              <v-text-field
                style="width: 90px"
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details
                :value="inputValue.end"
                v-on="inputEvents.end"
              ></v-text-field>
            </div>
          </template>
        </VDatePicker>
        <v-btn
          class="pl-btn ml-2"
          prepend-icon="pl-icon20 in-search-white"
          color="#4f62cd"
          variant="flat"
          >조회</v-btn>
      </div>
    </template>
  </ContentTopLayout>
  <div class="flex flex-column flex-1 h-full bg-gray-100 p-[24px]">
    <!-- //mark: My 에이전트 요약 -->
    <div>
      <h3 class="pl-tit-group">에이전트 요약</h3>
      <div
        class="pl-grid-box mt-2"
        style="grid-template-columns: 30fr 50fr 350px">
        <div class="pl-base-box">
          <div class="pl-base-box--tit">
            <strong>에이전트 사용률</strong>
          </div>
          <div class="pl-base-box--body flex flex-column h-full">
            <div class="pl-chart-box mt-2 p-2" style="height: 150px;">
              <DoughnutChart
                :data="chart.DonughtData"
                :options="chart.DonughtOptions"
                />
            </div>
            <div class="flex border-t mt-auto pt-3">
              <span class="font-bold text-[16px]">봇 당 평균 질문 개수</span>
              <span class="ml-auto text-blue text-[16px]">65,002</span>
            </div>
          </div>
        </div>
        <div class="pl-base-box">
          <div class="pl-base-box--tit">
            <strong>일별 에이전트 사용 현황 </strong>
            <v-tooltip text="새로고침" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="ml-auto"
                  v-bind="props"
                  variant="flat"
                  icon
                  size="small"
                  >
                  <v-icon class="pl-icon20 refresh"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <div class="pl-base-box--body">
            <div class="flex">
              <div class="pl-chart-box mt-2" style="width: 430px; height: 180px;">
                <BarChart
                  :data="chart.BarData"
                  :options="chart.BarOptions"
                />
              </div>
              <div class="ml-4 flex flex-column flex-1 p-2">
                <div class="w-full p-4 bg-indigo rounded-lg">
                  <div class="flex">
                    <strong class="text-[18px]">총 질문 개수</strong>
                    <span class="ml-auto text-[18px]">2,145,687</span>
                  </div>
                  <div class="flex mt-2 pt-2" style="border-top: 1px solid #DBDBDB">
                    <strong class="text-[14px]">일 평균</strong>
                    <span class="ml-auto text-[14px]">65,002(18.7%)</span>
                  </div>
                </div>
                <div class="w-full p-4">
                  <div class="flex">
                    <strong class="text-[14px]">전체 대비 </strong>
                    <span class="ml-auto text-[14px] text-indigo">2,145,687</span>
                  </div>
                  <div class="flex border-t mt-2 pt-2">
                    <strong class="text-[14px]">전체 일 평균 대비 </strong>
                    <span class="ml-auto text-[14px] text-indigo">65,002(21.4%)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="pl-base-box">
          <div class="pl-base-box--tit">
            <strong>카테고리별</strong>
          </div>
          <div class="pl-base-box--body pl-scrollable">
            <div
              class="flex py-2"
              :class="index === categoryList.length - 1 ? 'border-b-none' : 'border-b' "
              v-for="item, index in categoryList"
              :key="item.id">
              <span class="text-[13px]">{{ item.title }}</span>
              <strong class="text-[13px] ml-auto">{{ item.value }}</strong>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- //mark: My 에이전트 현황 -->
    <div class="flex flex-column flex-1 mt-4">
      <h3 class="pl-tit-group">에이전트별 현황</h3>
      <div
        class="flex-1 pl-grid-box mt-2"
        style="grid-template-columns: 75fr 350px">
        <!-- grid -->
        <div class="pl-base-box">
          <div class="relative">
            <v-tabs
              v-model="gridTab"
              color="indigo"
              density="compact"
              class="pl-default-tab border-b"
              height="50"
              >
              <v-tab value="all">전체</v-tab>
              <v-tab value="kn">지식</v-tab>
              <v-tab >데이터</v-tab>
              <v-tab >어플리케이션</v-tab>
            </v-tabs>
            <div class="absolute top-[9px] right-0 flex gap-2 ml-auto mr-4">
              <v-tooltip text="상세검색" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="flat"
                    icon
                    size="small"
                    >
                    <v-icon class="pl-icon20 type-filter"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="새로고침" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="flat"
                    icon
                    size="small"
                    >
                    <v-icon class="pl-icon20 refresh"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </div>
          <v-window v-model="gridTab">
            <v-window-item value="all">
              <v-data-table
                hover
                class="pl-table"
                :headers="agentHeaders"
                :items="agentData"
                hide-default-footer
                density="comfortable"
                >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      <v-icon :class="`pl-icon20 grid-agent-${item.type} scale-125`"></v-icon>
                      <span class="pl-4">{{ item.data01 }}</span>
                    </td>
                    <td>{{ item.data02 }}</td>
                    <td>
                      <v-chip
                        :color="item.data03 === '활성' ? 'green' : '#dadada'"
                        size="small"
                        class="w-[70px] justify-center"
                        variant="flat">
                        {{ item.data03 }}
                      </v-chip>
                    </td>
                    <td>{{ item.data04 }}</td>
                    <td>{{ item.data05 }}</td>
                    <td>{{ item.data06 }}</td>
                    <td class="text-right">
                      <strong>{{ item.data06 }}</strong>
                      <v-progress-linear
                        color="indigo"
                        :model-value="item.data07"
                        height="10"
                        rounded
                      ></v-progress-linear>
                    </td>
                    <td><strong>{{ item.data08 }}</strong></td>
                    <td><div class="in-chart-graph"></div></td>
                  </tr>
                </template>
              </v-data-table>
            </v-window-item>
            <v-window-item value="kn">
              kn
            </v-window-item>
          </v-window>

        </div>
        <!-- 사내 규정관리 챗봇 -->
        <div class="pl-base-box">
          <div class="pl-base-box--tit">
            <v-icon class="pl-icon20 grid-agent-type02 scale-125"></v-icon>
            <strong class="ml-2">사내 규정관리 챗봇</strong>
          </div>
          <div class="pl-base-box--body">
            <p class="">2024년도 귀속 연말정산을 위한 근로 자용 안내 자료입니다.</p>
          </div>
          <div class="border-t">
            <div class="pl-base-box--body pl-scrollable">
              <div
                class="flex py-2"
                :class="index === chatbotList.length - 1 ? 'border-b-none' : 'border-b' "
                v-for="item, index in chatbotList"
                :key="item.id">
                <span class="text-[13px] flex-[0_0_110px]">{{ item.title }}</span>
                <strong class="text-[13px]">
                  <v-icon v-if="item.icon" :class="`pl-icon20 ${item.icon}`"></v-icon>
                  {{ item.value }}
                </strong>
              </div>
              <div class="pl-chart-box mt-2" style="height: 90px;">
                <BarChart
                  :data="chart.BarData"
                  :options="chart.BarOptions2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.in-chart-graph{
  height: 100%;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjg2IiBoZWlnaHQ9IjEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgb3ZlcmZsb3c9ImhpZGRlbiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3QgeD0iMzQyNyIgeT0iMjU0MyIgd2lkdGg9IjI4NiIgaGVpZ2h0PSIxMzAiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzQyNyAtMjU0MykiPjxnPjxwYXRoIGQ9Ik0zNDQ2LjExIDI2MDIuMDkgMzQ2OS4xMSAyNjAyLjA5IDM0NjkuMTEgMjY2NyAzNDQ2LjExIDI2NjdaTTM0ODMuMTEgMjYyNi4wOSAzNTA3LjExIDI2MjYuMDkgMzUwNy4xMSAyNjY3IDM0ODMuMTEgMjY2N1pNMzUyMS4xMiAyNjIwLjA5IDM1NDUuMTIgMjYyMC4wOSAzNTQ1LjEyIDI2NjcgMzUyMS4xMiAyNjY3Wk0zNTU5LjEyIDI2NTMuMDkgMzU4Mi4xMiAyNjUzLjA5IDM1ODIuMTIgMjY2NyAzNTU5LjEyIDI2NjdaTTM1OTcuMTIgMjY0Mi4wOSAzNjIwLjEyIDI2NDIuMDkgMzYyMC4xMiAyNjY3IDM1OTcuMTIgMjY2N1pNMzYzNS4xMiAyNjQ2LjA5IDM2NTguMTIgMjY0Ni4wOSAzNjU4LjEyIDI2NjcgMzYzNS4xMiAyNjY3Wk0zNjcyLjEyIDI2NTMuMDkgMzY5Ni4xMiAyNjUzLjA5IDM2OTYuMTIgMjY2NyAzNjcyLjEyIDI2NjdaIiBmaWxsPSIjNEY2MkNEIi8+PC9nPjxnPjxwYXRoIGQ9Ik0zNDQ2LjExIDI1OTYuMDkgMzQ2OS4xMSAyNTk2LjA5IDM0NjkuMTEgMjYwMi4wOSAzNDQ2LjExIDI2MDIuMDlaTTM0ODMuMTEgMjYxMS4wOSAzNTA3LjExIDI2MTEuMDkgMzUwNy4xMSAyNjI2LjA5IDM0ODMuMTEgMjYyNi4wOVpNMzUyMS4xMiAyNjEwLjA5IDM1NDUuMTIgMjYxMC4wOSAzNTQ1LjEyIDI2MjAuMDkgMzUyMS4xMiAyNjIwLjA5Wk0zNTU5LjEyIDI2NTAuMDkgMzU4Mi4xMiAyNjUwLjA5IDM1ODIuMTIgMjY1My4wOSAzNTU5LjEyIDI2NTMuMDlaTTM1OTcuMTIgMjYzNy4wOSAzNjIwLjEyIDI2MzcuMDkgMzYyMC4xMiAyNjQyLjA5IDM1OTcuMTIgMjY0Mi4wOVpNMzYzNS4xMiAyNjQxLjA5IDM2NTguMTIgMjY0MS4wOSAzNjU4LjEyIDI2NDYuMDkgMzYzNS4xMiAyNjQ2LjA5Wk0zNjcyLjEyIDI2NTAuMDkgMzY5Ni4xMiAyNjUwLjA5IDM2OTYuMTIgMjY1My4wOSAzNjcyLjEyIDI2NTMuMDlaIiBmaWxsPSIjQzAwMDAwIi8+PC9nPjwvZz48L3N2Zz4=");
}
</style>