<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits  } from 'vue'
const emit = defineEmits(["close", "selectTemplate"]);

const closeDialog = () => {
  emit("close");
}

const tab = ref(null)
// list
const templateList = ref<array>([
  {
    title: '메일 초안 작성(회의 안내)',
    desc: '회의를 안내하는 메일의 초안을 작성해 드립니다.',
    owner: '나공개',
    favor: 17,
    fileSize: '20KB',
    active: false,
  },
  { type: 'report', title: '보고서 작성', desc: '내부 또는 외부 회의 후 회의 내용에 대한 보고서 초안을 작성', owner: '나공개', favor: 17, fileSize: '20KB', active: false, },
  { title: '메일 초안 작성(자료 전달)', desc: '자료를 전달 시 사용할 수 있는 메일의 초안을 작성해 드립니다.', owner: '나공개', favor: 17, fileSize: '20KB', favorActive: true, active: false, },
  { type: 'place', title: '출장지 최적의 교통편 추천', desc: '출장지와 출발지에 따라 최적의 교통편을 안내해 드립니다.', owner: '나공개', favor: 17, fileSize: '20KB', active: false, },
  { title: '내용 요약(파일)', desc: '파일의 컨텍스트를 원하는 요약 수준과 스타일로 요약할 수 있습니다', owner: '나공개', favor: 17, fileSize: '20KB', active: false, },
  { title: '번역(영어 번역)', desc: '다양한 스타일의 어투로 한/영 번역할 수 있어요', owner: '나공개', favor: 17, fileSize: '20KB', active: false, },
])
const selectList = (item) => {
  removeMenuActive()
  item.active = true
  emit("selectTemplate", item.type);
}
const removeMenuActive = () => {
  for (let index = 0; index < templateList.value.length; index++) {
    templateList.value[index].active = false
  }
}

</script>
<template>
  <div class="prism-wrap-right-panel">
    <!-- title -->
    <div class="prism-wrap-right-panel--title">
      <span class="text-[16px] font-bold">프롬프트 템플릿</span>
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
    <div class="prism-wrap-right-panel--content">
      <div class="relative">
        <v-tabs
          v-model="tab"
          color="indigo"
          density="compact"
          class="border-b pl-default-tab"
          height="50"
          >
          <v-tab value="tab0">공개 템플릿</v-tab>
          <v-tab value="tab1">추천 템플릿</v-tab>
          <v-tab value="tab2">내 템플릿</v-tab>
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
          <div class="flex flex-col mt-2 pl-scrollable h-[calc(100vh-223px)]">
            <div
              :class="item.active ? 'bg-gray-100' : ''"
              class="hover:bg-gray-100 p-4 border-b cursor-pointer"
              v-for="item in templateList"
              @click="selectList(item)"
              :key="item.id">
              <strong class="text-[15px]">{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
              <div class="mt-2 flex align-center gap-x-4">
                <div class="flex align-center">
                  <v-icon class="pl-icon20 people-nobg"></v-icon>
                  <span class="ml-1">{{ item.owner }}</span>
                </div>
                <div class="flex align-center">
                  <v-icon :class="`pl-icon20 ${ item.favorActive ? 'favorite-star-fill' : 'favorite-star'}`"></v-icon>
                  <span class="ml-1">{{ item.favor }}</span>
                </div>
                <div class="flex align-center">
                  <v-icon class="pl-icon20 file-size"></v-icon>
                  <span class="ml-1">{{ item.fileSize }}</span>
                </div>
              </div>
            </div>

          </div>

        </v-window-item>
      </v-window>
    </div>

  </div>
</template>


<style scoped>

</style>