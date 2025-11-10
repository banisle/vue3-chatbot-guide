<script setup lang="ts">
//@ts-nocheck
import { ref, computed } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import { useGetImageUrl } from "@/composables/common.js";

const gridHeaders = ref([
  { title: '번호', align: 'center', sortable: false, key: 'index', width: '80' },
  { title: '카탈로그', align: 'start', sortable: true, key: 'data01' ,width: '120'},
  { title: '카테고리', align: 'start', sortable: false, key: 'data02', width: '180' },
  { title: '제목', align: 'start', sortable: false, key: 'data03', },
  { title: '파일', align: 'start', sortable: false, key: 'data04', width: '350' },
  { title: '오너', align: ' pr-0', sortable: false, key: 'data050', width: '30', },
  { title: '', align: ' pl-1', sortable: false, key: 'data05', width: '150' },
  { title: '북마크일', align: 'start', sortable: false, key: 'data06', width: '120' },
  { title: '해제', align: 'start', sortable: false, key: 'data07', width: '100' },
])
const gridData = ref([
  { data050: '@avatar02.png', index: 1, data01: '지식', data02: '외부 업무지식', data03: '정보공개 관련 법규', data04: '정보공개 관련 법규.pdf', data05: '나문서', data06: '2024-04-05', data07: false, },
  { data050: '@avatar03.png', index: 2, data01: '지식', data02: '내부 업무지식', data03: '23년도_예산안_위원회별 분석', data04: '23년도_예산안_위원회별 분석.pdf', data05:'나성실', data06: '2024-04-05', data07: true, },
  { data050: '@avatar01.svg', index: 3, data01: '지식', data02: '외부 업무지식', data03: '2024 정보공개 매뉴얼', data04: '2024 정보공개 매뉴얼.pdf', data05:'나관리', data06: '2024-04-12', data07: true, },
  { data050: '@avatar01.svg', index: 4, data01: '지식', data02: '내부 업무지식', data03: '공공기관의 정보공개에 관한 법률', data04: '공공기관의 정보공개에 관한 법률.docx', data05:'나관리', data06: '2024-04-05', data07: true, },
  { data050: '@avatar02.png', index: 5, data01: '지식', data02: '내부 업무지식', data03: '서울시 정책연구 자료', data04: '서울시 정책연구 자료.hwpx', data05:'나꼼꼼', data06: '2024-04-05', data07: true, },
])
const paging =ref<object>(
  {
    page: 1,
    perPage: [10,15,30],
    ROW_PER_PAGE: 15,
  }
)
const pageCount = computed(() => {
  return Math.ceil(gridData.value.length / paging.value.ROW_PER_PAGE)
})
const displayStatus = (stat, statList) => {
  let arrStatList = statList

  for (let i = 0; i < arrStatList.length; i++) {
    if (arrStatList[i].title === stat) {
      return arrStatList[i].icon;
    }
  }
}
const extractFileExtension = (filename) => {
  const match = filename.match(/\.([a-z0-9]+)$/i);
  if (match) {
    return match[1]; // 매칭된 그룹 반환
  }
  return null; // 파일 확장자가 없으면 null 반환
}


const gridTab = ref(null)
const gridTabs = ref<array>([
  { text: '지식', value: 'tab01', count: 5},
  { text: '데이터', value: 'tab02', count: 2},
  { text: '어플리케이션', value: 'tab03', count: 0},
  { text: '프롬프트', value: 'tab04', count: 17},
])

</script>
<template>
  <ContentTopLayout />
  <!-- 그리드 -->
  <div class="flex flex-column flex-1">
    <!-- 그리드 상단 툴바 -->
    <div class="relative">
      <v-tabs
        v-model="gridTab"
        :items="gridTabs"
        color="indigo"
        density="compact"
        class="pl-default-tab pl-badge-tab"
        height="48"
        >
        <template v-slot:tab="{ item }">
          <v-tab
            :text="item.text"
            :value="item.value"
            class="pl-badge"
            >
            </v-tab>
        </template>
      </v-tabs>
      <div class="absolute top-[9px] right-0 flex gap-2 ml-auto mr-4">
        <div class="ml-auto">
          <div class="flex align-center">
            <v-btn
              min-width="24px"
              icon
              size="small"
              variant="text"
              >
              <v-icon class="pl-icon20 type-filter"></v-icon>
            </v-btn>
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
    </div>
    <div class="pl-scrollable h-[calc(100vh-224px)]">
      <v-data-table
        hover
        show-select
        v-model:page="paging.page"
        :headers="gridHeaders"
        :items="gridData"
        :items-per-page="paging.ROW_PER_PAGE"
        hide-default-footer
        class="pl-table border-t"
        density="comfortable"
        >
        <!-- 파일 -->
        <template v-slot:item.data04="{ value }">
          <v-icon :class="`pl-icon20 docu-${extractFileExtension(value)}`"></v-icon>
          <span class="pl-2">{{ value }}</span>
        </template>
        <!-- 오너 -->
        <template v-slot:item.data050="{ value }">
          <v-avatar
            size="34px"
            :image=useGetImageUrl(value)></v-avatar>
        </template>

        <!-- 해제 -->
        <template v-slot:item.data07="{ value }">
          <v-btn
            class="ml-auto"
            v-bind="props"
            variant="flat"
            icon
            size="small"
            :disabled="!value"
            >
            <v-icon class="pl-icon20 pinned"></v-icon>
          </v-btn>
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


<style scoped>

</style>