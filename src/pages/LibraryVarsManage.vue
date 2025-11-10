<script setup lang="ts">
//@ts-nocheck
import { ref, computed} from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import LibraryVarsManageCreateDialog from '@/pages/LibraryVarsManage-create-dialog.vue'

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
  { title: '변수', align: 'start', sortable: true, key: 'data01', width: '150' },
  { title: '변수 명', align: 'start', sortable: false, key: 'data02', width: '150' },
  { title: '변수 설명', align: 'start', sortable: false, key: 'data03' },
  { title: '초기값', align: 'start', sortable: false, key: 'data04', width: '80' },
  { title: '등록자', align: 'start', sortable: false, key: 'data05', width: '80' },
  { title: '등록일', align: 'start', sortable: false, key: 'data06', width: '150' },
])
const Data = ref([
  {
    index: 1,
    data01: 'intent_confidence',
    data02: '신뢰도',
    data03: '가장 최근에 일치된 인텐트에 대한 신뢰 구간(0에서 100 사이의 값으로 측정됨)',
    data04: '-',
    data05: '나관리',
    data06: '2024-04-05',
  },
  { index: 2, data01: 'last_event', data02: '마지막 이벤트', data03: '사용자 클라이언트가 트리거한 마지막 이벤트가 포함된 개체', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 3, data01: 'last_response', data02: '마지막 응답', data03: '문자열로 된 상담원의 마지막 응답(텍스트/말하기)', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 4, data01: 'last_utterance', data02: '마지막 발화', data03: '텍스트 문자열에 있는 사용자의 마지막 발언', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 5, data01: 'locale', data02: '장소', data03: '사용자의 로케일(ko-KR, en-US, en-CA, fr-FR)', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 6, data01: 'platform', data02: '플랫폼', data03: '에이전트가 실행중인 플랫폼', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 7, data01: 'sessions', data02: '세션', data03: '특정 사용자가 앱을 연 횟수', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 8, data01: 'timestamp', data02: '타임스탬프', data03: 'UNIX 타임스탬프', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 9, data01: 'user_id', data02: '사용자 아이디', data03: '사용자의 고유 아이디', data04: '-', data05: '나관리', data06: '2024-04-05', },
  { index: 10, data01: 'vf_memory', data02: '가상 메모리', data03: '문자열의 마지막 10개 사용자 입력 및 에이전트 응답(예: 어떻게 도와드릴까요...)', data04: '-', data05: '나관리', data06: '2024-04-05', },

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
// 다이얼로그
const dialogVarCrate = ref<boolean>(false)

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
          @click="dialogVarCrate = true"
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
  <!-- dialog -->
  <v-dialog
    v-model="dialogVarCrate"
    width="auto"
    >
    <LibraryVarsManageCreateDialog
      @close="dialogVarCrate = false"
    />
  </v-dialog>
</template>
<style scoped>

</style>