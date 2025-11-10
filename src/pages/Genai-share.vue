<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits  } from 'vue'
import { useGetImageUrl } from "@/composables/common.js";
const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
}


// 카드
interface CardInfo {
  filename: string;
  fileversion: string;
  avatar: string;
  owner: string;
  shareDate: string;
}
const cardInfo = ref<CardInfo>(
  {
    filename: '인사규정.pdf',
    fileversion: 'V1.3.0',
    avatar: '@avatar02.png',
    owner: '나문서(경영지원본부)',
    shareDate: '2024-04-21 14:34:51'
  }
)
const shareToggleList = ref([
  { active: false, icon: 'share-all', title: '전체 공유' },
  { active: false, icon: 'share-part', title: '부서 공유' },
  { active: true, icon: 'share-each', title: '개별 공유' },
  { active: false, icon: 'share-off', title: '공유 안함' },
])
const selectToggle = (item) => {
  removeshareToggleActive();
  item.active = true;
}
const removeshareToggleActive = () => {
  for (let index = 0; index < shareToggleList.value.length; index++) {
    shareToggleList.value[index].active = false
  }
}
// tree
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";
const shareTab = ref(null)
const selectNodeList = ref([])
const treeData = ref ({
  config: {
    roots: ['id1', 'id2', 'id3', 'id4', 'id5'],
    keyboardNavigation: true,
    dragAndDrop: false,
    checkboxes: true,
    editable: false,
    disabled: false,
    padding: 12,
    checkMode: 1,
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
      id1: {
        text: '지식관리본부',
        children: ['id11', 'id12', 'id13'],
        state: { opened: true, }
      },
        id11: {
          text: '나꼼꼼',
          avatar: '@avatar02.png'
        },
        id12: {
          text: '나문서',
          avatar: '@avatar03.png'
        },
        id13: {
          text: '나관리',
          avatar: '@avatar01.svg'
        },
      id2: {
        text: 'CS센터',
        children: ['id21', 'id22', 'id23'],
      },
        id21: {
          text: '나꼼꼼',
          avatar: '@avatar02.png'
        },
        id22: {
          text: '나문서',
          avatar: '@avatar03.png'
        },
        id23: {
          text: '나관리',
          avatar: '@avatar01.svg'
        },
      id3: {
        text: '경영지원본부',
        children: ['id31', 'id32', 'id33'],
      },
      id4: {
        text: '마케팅본부',
        children: ['id41', 'id42', 'id43'],
      },
      id5: {
        text: '개발본부',
        children: ['id51', 'id52', 'id53'],
      },


  },
})
const addNode = (evt) => {
  console.log("🚀 ~ addNode ~ evt:", evt)

  const getParentName = (id) => {
    let nodes = treeData.value.nodes

    // 해당 id가 nodes에 존재하는지 확인
    if (nodes[id]) {
      return nodes[id].text;
    }

    // 노드들 각각을 순회하면서 children을 탐색
    for (const nodeId in nodes) {
      if (nodes[nodeId].children && nodes[nodeId].children.length > 0) {
        for (const childId of nodes[nodeId].children) {
          const result = getParentName(nodes, childId);
          if (result) {
            return result;
          }
        }
      }
    }

    // id를 찾지 못한 경우
    return null;
  }

  let nodeData:any = {
    avatar: evt.avatar
    ,name: evt.text
    ,part: getParentName(evt.parent)
  }


  selectNodeList.value.push(nodeData)
}
const removeNode = (evt) => {
  let nodeData = { evt }
  selectNodeList.value.splice(nodeData, 1)
}

</script>

<template>
  <div class="pl-scrollable panelDialog h-[calc(100vh-151px)] top-[151px]">
    <!-- title -->
    <div class="panelDialog--title">
      <span class="text-[16px] font-bold">공유설정</span>
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
    <div class="panelDialog--content">
      <!-- 카드 -->
      <div class="pl-card">
        <div class="pl-card--title bg-[#A267DC]">
          <strong>{{ cardInfo.filename }}</strong>
          <span class="ml-auto text-[12px]">{{ cardInfo.fileversion }}</span>
        </div>
        <div class="pl-card--content">
          <!-- info -->
          <div class="flex align-center">
            <div>
              <v-avatar
                class="flex-[0_0_40px]"
                size="40px"
                :image=useGetImageUrl(cardInfo.avatar)></v-avatar>
            </div>
            <div class="flex flex-column ml-2">
              <div>
                <strong>오너 :</strong> <span>{{ cardInfo.owner }}</span>
              </div>
              <div class="mt-1">
                <strong>공유 :</strong> <span>{{ cardInfo.shareDate }}</span>

              </div>
            </div>
          </div>
          <!-- share group -->
          <div class="grid grid-cols-4 gap-4 mt-3 pt-3 border-t ">
            <div
              class="flex flex-column align-center"
              v-for="item, index in shareToggleList"
              :key="item.id">
              <v-btn
                :class="`selectShareBtn active-${ item.active }`"
                :prepend-icon="`pl-icon-etc ${ item.icon }`"
                @click="selectToggle(item)"
                variant="text">
              </v-btn>
              <span class="mt-2 text-[13px] font-regular normal-case">{{ item.title }}</span>
            </div>
          </div>

        </div>
      </div>
      <!-- tab -->
      <v-tabs
        v-model="shareTab"
        color="indigo"
        density="compact"
        class="pl-default-tab border-b mt-3"
        height="50"
        >
        <v-tab value="tab0">조직도로 지정</v-tab>
        <v-tab value="tab1">검색 지정</v-tab>
      </v-tabs>
      <v-window v-model="shareTab">
        <!-- 조직도로 지정 -->
        <v-window-item value="tab0">
          <div class="border rounded-lg mt-3">
            <!-- 트리 -->
            <div class="pl-4">
              <div class="pl-tree h-[250px] pl-scrollable border-0">
                <tree
                  @nodeChecked="addNode($event)"
                  @nodeUnchecked="removeNode($event)"
                  :config="treeData.config"
                  :nodes="treeData.nodes">
                  <template #before-input="props">
                    <span class="before pl-1">
                      <div v-if="!props.node.children.length">
                        <v-avatar
                          size="34px"
                          :image=useGetImageUrl(props.node.avatar)></v-avatar>
                      </div>
                    </span>
                  </template>
                </tree>
              </div>
            </div>
            <!-- 선택 노드 -->
            <div class="flex flex-column gap-y-2 mt-2 border-t p-4 pr-0 h-[150px] pl-scrollable">
              <div
                class="flex align-center"
                v-for="item in selectNodeList"
                :key="item.id">
                <v-avatar
                  size="34px"
                  :image=useGetImageUrl(item.avatar)></v-avatar>
                <span class="pl-2">{{ item.name }}</span>
                <span class="pl-2">{{ item.part }}</span>
                <v-btn
                  class="ml-auto"
                  icon
                  size="small"
                  variant="text"
                  @click="removeNode(item)"
                  >
                  <v-icon class="pl-icon20 in-close scale-75"></v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-window-item>
        <!-- 검색 지정 -->
        <v-window-item value="tab1">
          <div class="border rounded-lg mt-3">
            <div class="h-[250px] pl-scrollable p-4">
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
                placeholder="사용자 찾기"
                @click:append-inner=""
              ></v-text-field>
              <div class="flex flex-column gap-y-2 mt-2">
                <div
                  class="flex align-center"
                  v-for="item in selectNodeList"
                  :key="item.id">
                  <v-checkbox
                    class="pl-check"
                    true-icon="pl-icon20 chk-on"
                    false-icon="pl-icon20 chk-off"
                    ></v-checkbox>
                  <v-avatar
                    size="34px"
                    :image=useGetImageUrl(item.avatar)></v-avatar>
                  <span class="pl-2">{{ item.name }}</span>
                  <span class="pl-2">{{ item.part }}</span>
                </div>
              </div>
            </div>
            <!-- 선택 노드 -->
            <div class="flex flex-column gap-y-2 mt-2 border-t p-4 pr-0 h-[150px] pl-scrollable">
              <div
                class="flex align-center"
                v-for="item in selectNodeList"
                :key="item.id">
                <v-avatar
                  size="34px"
                  :image=useGetImageUrl(item.avatar)></v-avatar>
                <span class="pl-2">{{ item.name }}</span>
                <span class="pl-2">{{ item.part }}</span>
                <v-btn
                  class="ml-auto"
                  icon
                  size="small"
                  variant="text"
                  @click="removeNode(item)"
                  >
                  <v-icon class="pl-icon20 in-close scale-75"></v-icon>
                </v-btn>
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