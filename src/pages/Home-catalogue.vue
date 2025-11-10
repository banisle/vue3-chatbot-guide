<script setup lang="ts">
//@ts-nocheck
import { ref, computed } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import HomeCatalogueCreateDialog from '@/pages/Home-catalogue-create-dialog.vue'

const gridHeaders = ref([
  { title: '번호', align: 'center', sortable: false, key: 'index', width: '80' },
  { title: '카탈로그', align: 'start', sortable: true, key: 'data01' ,width: '120'},
  { title: '카테고리', align: 'start', sortable: false, key: 'data02', width: '180' },
  { title: '제목', align: 'start', sortable: false, key: 'data03', },
  { title: '파일', align: 'start', sortable: false, key: 'data04', width: '350' },
  { title: '공개설정', align: 'start', sortable: false, key: 'data05', width: '100' },
  { title: '공개일', align: 'start', sortable: false, key: 'data06', width: '120' },
  // { title: '등록자', align: 'start', sortable: false, key: 'data07', width: '100' },
  { title: '등록일', align: 'start', sortable: false, key: 'data08', width: '120' },
])
const gridData = ref([
  { index: 1, data01: '지식', data02: '외부 업무지식', data03: '정보공개 관련 법규', data04: '정보공개 관련 법규.pdf', data05: true, data06: '2024-04-05', data07: '나관리', data08: '2024-04-05', },
  { index: 2, data01: '지식', data02: '내부 업무지식', data03: '23년도_예산안_위원회별 분석', data04: '23년도_예산안_위원회별 분석.pdf', data05: true, data06: '2024-04-05', data07: '나관리', data08: '2024-04-05', },
  { index: 3, data01: '지식', data02: '외부 업무지식', data03: '2024 정보공개 매뉴얼', data04: '2024 정보공개 매뉴얼.pdf', data05: true, data06: '2024-04-12', data07: '나관리', data08: '2024-04-12', },
  { index: 4, data01: '지식', data02: '내부 업무지식', data03: '공공기관의 정보공개에 관한 법률', data04: '공공기관의 정보공개에 관한 법률.docx', data05: true, data06: '2024-04-05', data07: '나관리', data08: '2024-04-05', },
  { index: 5, data01: '지식', data02: '내부 업무지식', data03: '서울시 정책연구 자료', data04: '서울시 정책연구 자료.hwpx', data05: false, data06: '2024-04-05', data07: '나관리', data08: '2024-04-05', },
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


// 다이얼로그
const dialogCreate = ref<boolean>(false)
</script>
<template>
  <ContentTopLayout />
  <div class="flex">
    <!-- tree -->
    <div class="flex flex-col border-r">
      <div class="border-b">
        <div class="flex align-center h-[48px] px-4">
          <span class="text-[14px] font-bold">문서 현황 (38) </span>
          <div class="ml-auto flex gap-1 align-center">
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
      <!-- tree -->
      <div class="p-4 pl-scrollable h-[calc(100vh-198px)]">
        <div class="pl-tree border-none pa-0">
          <tree
            :config="treeData.config"
            :nodes="treeData.nodes">
            <template #before-input="props">
              <span class="before pl-1">
                <v-icon
                  v-if="!props.node.children.length"
                  class="pl-icon20 tree-close"></v-icon>
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
      </div>
    </div>
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
          <!-- 공개설정 -->
          <template v-slot:item.data05="{ value }">
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

    </div>
  </div>
  <!-- dialog -->
  <v-dialog
    v-model="dialogCreate"
    width="auto"
    >
    <HomeCatalogueCreateDialog
      @close="dialogCreate = false"
    />
  </v-dialog>
</template>


<style scoped>

</style>