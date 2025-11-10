<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits  } from 'vue'
const emit = defineEmits(["close",]);

const closeDialog = () => {
  emit("close");
}

const tab = ref(null)
// list
const catalogueList = ref<array>([
  {
    title: '컨택센터 비상대응 계획서',
    desc: '비상 대응 계획은 컨택센터에서 발생할 수 있는 인적, 물적 재난을 예발하고 이에 대응하는 방안을 제시합니다.',
    chk: false,
  },
  {
    title: '안전보건환경 규정, 매뉴얼 절차서 및 지침',
    desc: '임직원들이 수행하는 사업에 대해 EHS와 관련 규칙 등을 정함으로써 종사자의 안전보건을 유지 증진시키고 회사의...',
    chk: false,
  },
  {
    title: '해외 프로젝트 수행 및 개인정보 가이드',
    desc: '해외 IT 프로젝트 및 컨택센터 사업 수행과 관련된 주요 단계별 절차, 주요 계약, 이슈 등에 대한 가이드 문서를...',
    chk: false,
  },
  {
    title: '국문 표준 계약서',
    desc: '외부 계약과 관련된 전사 표준 계약서 템플릿 자료',
    chk: false,
  },
  {
    title: '개인정보 보호법(법률)(제19234호)(20240315)',
    desc: '개인정보의 처리 및 보호에 관한 사항을 정함으로써 개인의 자유와 권리를 보호하고 개인의 존엄과 가치를 구현함을 목적...',
    chk: false,
  },
  {
    category: '워크스페이스 > namsik.heo-Workspace',
    title: '2023년도 예산안_위원회별 분석(행안부)',
    desc: '2023년도 예산안_위원회별 분석(행안부)',
    chk: false,
  },
])
const selectedCatalogue = ref<array>([])
const assignCatalogue = ref<boolean>(false)
const selectList = (item) => {
  selectLayer.value = true
  if(item.chk === false) {
    selectedCatalogue.value.splice(item ,1)
    return
  }
  else{
    selectedCatalogue.value.push(item)
  }
}
const selectLayer = ref<boolean>(false)

const cancelCatalogue = () => {
  selectLayer.value = false
  removeMenuActive()
}
const removeMenuActive = () => {
  for (let index = 0; index < catalogueList.value.length; index++) {
    catalogueList.value[index].chk = false
  }
}
</script>
<template>
  <div class="prism-wrap-right-panel">
    <!-- title -->
    <div class="prism-wrap-right-panel--title">
      <span class="text-[16px] font-bold">지식 카탈로그</span>
      <div class="ml-auto">
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="text"
          @click="closeDialog()">
          <v-icon class="pl-icon20 in-close" ></v-icon>
        </v-btn>
      </div>
    </div>
    <!-- content -->
    <div class="prism-wrap-right-panel--content pl-scrollable h-[calc(100vh-114px)]">
      <!-- 적용된 카탈로그 -->
      <div class="p-4">
        <div class="flex align-center ">
          <strong class="text-[15px]">적용된 카탈로그 <span class="ml-2 text-indigo text-[14px]">{{selectedCatalogue.length}}</span></strong>
          <div class="ml-auto">
            <v-tooltip text="상세검색" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="flat"
                  icon
                  size="small"
                  >
                  <v-icon class="pl-icon20 dot-menu-v"></v-icon>
                </v-btn>
              </template>
            </v-tooltip>

          </div>
        </div>
        <!-- 카탈로그 있을때 -->
        <div v-if="assignCatalogue"
          class="flex flex-col mt-2 rounded-lg border bg-gray-100">
          <div
            class="flex hover:bg-gray-100 p-4 cursor-pointer"
            :class="[item.active ? 'bg-gray-100' : '', index === selectedCatalogue.length - 1 ? 'border-b-none' : 'border-b']"
            v-for="item, index in selectedCatalogue"
            :key="item.id">
            <v-icon class="pl-icon20 pinned-color mt-1"></v-icon>
            <div class="ml-2">
              <div class="text-[13px]">{{ item.category }}</div>
              <strong class="text-[15px]">{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex justify-center mt-2 align-center rounded-lg border bg-gray-100 h-[94px]">
            <div class="text-center py-4 px-2">
              <v-icon
                style="width: 30px !important; height: 30px"
                class="pl-icon-etc no-data" />
              <p class="text-[12px] mt-2">
                지식 카탈로그를 아래의 목록에서 선택하십시오.
              </p>
            </div>
          </div>

        </template>

      </div>
      <!-- 전체 카탈로그 -->
      <div class="p-4 py-0">
        <div class="flex align-center mt-4">
          <strong class="text-[15px]">전체 카탈로그 <span class="ml-2 text-indigo text-[14px]">{{catalogueList.length}}</span></strong>
          <div class="ml-auto">
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
      </div>
      <div class="relative">
        <v-tabs
          v-model="tab"
          color="indigo"
          density="compact"
          class="border-b pl-default-tab"
          height="50"
          >
          <v-tab value="tab0">전체</v-tab>
          <v-tab value="tab1">최근적용</v-tab>
          <v-tab value="tab2">즐겨찾기</v-tab>
          <v-tab value="tab3">내 카탈로그</v-tab>
        </v-tabs>
      </div>
      <v-window v-model="tab">
        <v-window-item value="tab0">
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
              placeholder="검색어 입력"
              @click:append-inner=""
            ></v-text-field>
          </div>
          <!-- list -->
          <div class="flex flex-col mt-2 ">
            <div
              :class="item.active ? 'bg-gray-100' : ''"
              class="flex hover:bg-gray-100 p-4 border-b cursor-pointer"
              v-for="item in catalogueList"
              :key="item.id">
              <v-checkbox
                v-model="item.chk"
                class="pl-check flex-[0_0_40px]"
                true-icon="pl-icon20 chk-on"
                false-icon="pl-icon20 chk-off"
                @update:modelValue="selectList(item)"

                ></v-checkbox>
              <div class="ml-4">
                <div class="text-[13px]">{{ item.category }}</div>
                <strong class="text-[15px]">{{ item.title }}</strong>
                <p>{{ item.desc }}</p>
              </div>

            </div>
          </div>

        </v-window-item>
      </v-window>
      <div  v-if="selectLayer"
        class="flex align-center rounded-lg bg-[#4f62cd] p-4 absolute bottom-0 w-[390px] m-4">
        <span class="text-white">({{selectedCatalogue.length}})개의 카탈로그가 선택됨</span>
        <div class="flex align-center gap-x-2 ml-auto border-l pl-4">
          <div
            class="w-14 text-white text-center cursor-pointer"
            @click="cancelCatalogue()"
            >취소</div>
          <div
            class="w-14 text-white text-center cursor-pointer"
            @click="assignCatalogue = true">
            <v-icon class="pl-icon20 chk-white"></v-icon>
            <span class="ml-1">적용</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<style scoped>

</style>