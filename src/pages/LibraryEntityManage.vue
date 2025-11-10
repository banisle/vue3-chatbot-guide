<script setup lang="ts">
//@ts-nocheck
import { ref, computed} from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'



const agentSelect = ref<object>({
  model: 0,
  opt: [
    { title: '한국클라우드 데모존', icon: 'ai-bot', value: 0 },
  ]
})

// grid
const selected = ref([])
const Headers = ref([
  { title: '번호', align: 'center', sortable: false, key: 'index', width: '80' },
  { title: '엔티티', align: 'start', sortable: true, key: 'data01', width: '250' },
  { title: '설명', align: 'start', sortable: false, key: 'data02' },
  { title: '데이터 타입', align: 'start', sortable: false, key: 'data03', width: '150' },
  { title: '등록자', align: 'start', sortable: false, key: 'data04', width: '80' },
  { title: '등록일', align: 'start', sortable: false, key: 'data05', width: '150' },
])
const Data = ref([
  { index: 1, data01: 'bank_speak', data02: '이 엔티티는 사용자가 찾고 있는 은행 영역을 포착합니다.', data03: 'Custom', data04: '나관리', data05: '2024-04-05', },
  { index: 2, data01: 'No', data02: '아니오', data03: 'Custom', data04: '나관리', data05: '2024-04-05', },
  { index: 3, data01: 'Stop', data02: '정지', data03: 'Custom', data04: '나관리', data05: '2024-04-05', },
  { index: 4, data01: 'Cancel', data02: '취소', data03: 'Custom', data04: '나관리', data05: '2024-04-05', },
  { index: 5, data01: 'Repeat', data02: '반복하다', data03: 'Custom', data04: '나관리', data05: '2024-04-05', },


])
const paging =ref<object>(
  {
    page: 1,
    perPage: [10,15,30],
    ROW_PER_PAGE: 15,
  }
)
const pageCount = computed(() => {
  return Math.ceil(Data.value.length / paging.value.ROW_PER_PAGE)
})

</script>
<template>
  <ContentTopLayout>
    <template v-slot:header>
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
  <div class="flex flex-column flex-1">
    <!-- 그리드 상단 툴바 -->
    <div class="flex align-center px-4 py-2">
      <div class="flex gap-1">
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 circle-plus"
          variant="flat"
          >
          등록</v-btn>
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 edit"
          variant="flat"
          >
          수정</v-btn>
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 card-remove-red"
          variant="flat">
          삭제</v-btn>
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 refresh"
          variant="flat">
          새로고침</v-btn>
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
        show-select
        v-model="selected"
        v-model:page="paging.page"
        :headers="Headers"
        :items="Data"
        :items-per-page="paging.ROW_PER_PAGE"

        item-value="index"
        hide-default-footer
        class="pl-table border-t"
        density="comfortable"
        >
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