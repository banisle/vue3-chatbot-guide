<script setup lang="ts">
//@ts-nocheck
import { ref, computed } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import HomePromptCreateDialog from '@/pages/Home-prompt-create-dialog.vue'

const gridHeaders = ref([
  { title: '번호', align: 'center', sortable: false, key: 'index', width: '80' },
  { title: '분류', align: 'start', sortable: true, key: 'data01' ,width: '80'},
  { title: '프롬프트', align: 'start', sortable: false, key: 'data02', width: '140' },
  { title: '설명', align: 'start', sortable: false, key: 'data03', },
  { title: '사용 모델', align: 'start', sortable: false, key: 'data04', width: '150' },
  { title: '받은 추천', align: 'start', sortable: false, key: 'data05', width: '100' },
  { title: '공개설정', align: 'start', sortable: false, key: 'data06', width: '100' },
  { title: '공개일', align: 'start', sortable: false, key: 'data07', width: '120' },
  { title: '등록자', align: 'start', sortable: false, key: 'data08', width: '100' },
  { title: '등록일', align: 'start', sortable: false, key: 'data09', width: '120' },
])
const gridData = ref([
  {  index: 1, data01: '요약', data02: '내용 요약(파일)', data03: '파일의 콘텐츠를 원하는 요약 추출과 스타일로 요약할 수 있습니다.', data04: 'ChatGPT 4', data05: 75, data06: true, data07: '2024-04-05', data08: '나관리',  data09: '2024-04-05'},
  {  index: 2, data01: '요약', data02: '인용문 요약', data03: '주요 인용문과 함께 자세한 요약을 할 수 있어요.', data04: 'ChatGPT 4', data05: 38, data06: true, data07: '2024-04-05', data08: '나관리',  data09: '2024-04-05'},
  {  index: 3, data01: '번역', data02: '한영 번역', data03: '다양한 스타일의 어투로 한/영 번역할 수 있어요.', data04: 'LLAMA 3', data05: 0, data06: false, data07: '-', data08: '나관리',  data09: '2024-04-12'},

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
const promptFilterList = ref([
  { title: '전체' },
  { title: '공개' },
  { title: '비공개' },
])

// 다이얼로그
const dialogCreate = ref<boolean>(false)
</script>
<template>
  <ContentTopLayout />
  <!-- 그리드 -->
  <div class="flex flex-column flex-1">
    <!-- 그리드 상단 툴바 -->
    <div class="flex align-center px-4 py-2">
      <div class="flex gap-1">
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 circle-plus"
          variant="flat"
          @click="dialogCreate = true"
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
        v-model:page="paging.page"
        :headers="gridHeaders"
        :items="gridData"
        :items-per-page="paging.ROW_PER_PAGE"
        hide-default-footer
        class="pl-table border-t"
        density="comfortable"
        >
        <!-- ai model -->
        <template v-slot:item.data04="{ value }">
          <v-icon :class="`pl-icon20 ${ displayStatus(value, gridAiModel) }`"></v-icon>
          <span class="pl-2">{{ value }}</span>
        </template>
        <!-- 받은 추천 -->
        <template v-slot:item.data05="{ value }">
          <div class="flex align-center">
            <v-icon class="pl-icon20 thumbs-up"></v-icon>
            <span class="pl-2 text-indigo">{{ value }}</span>
          </div>
        </template>
        <!-- 공개설정 -->
        <template v-slot:item.data06="{ value }">
          <v-switch
            height="30px"
            class="pl-switch"
            inset
            color="#4f62cd"
            hide-details
            :model-value="value"></v-switch>
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
  <!-- dialog -->
  <v-dialog
    v-model="dialogCreate"
    width="auto"
    >
    <HomePromptCreateDialog
      @close="dialogCreate = false"
    />
  </v-dialog>
</template>


<style scoped>

</style>