<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

import PropertyTextarea from '@/components/property/property-textarea.vue'

import ResponseaiDialog from '@/components/responseai-dialog.vue';

const props = defineProps(['block','seq','index'])


const dialogSetai = ref<boolean>(false)

const insertText= (text,num) => {
  switch(num){
    case 0:
      props.block.prompt = text
      break;
    case 1:
      props.block.system = text
      break;
    case 2:
      props.block.question = text
      break;
    case 3:
      props.block.instructions = text
      break;
  }
  textareaRefs.value[num].focus();
}

// mark: script: Response Ai
const DataResponseAi = ref<object>({
  promptSetting: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  overridePromptSetting: [
    { title: 'ChatGPT 4', icon: 'prompt-gpt4', value: 0 },
    { title: 'ChatGPT 3.5', icon: 'prompt-new-gpt35', value: 1 },
    { title: 'LLAMA 3', icon: 'prompt-LLAMA3', value: 2 },
    { title: 'Claude 3', icon: 'prompt-Claude3', value: 3 },
    { title: 'Clova X', icon: 'prompt-ClovaX', value: 4 },
    { title: 'Gemini', icon: 'prompt-Gemini', value: 5 },
  ],
  knowledgeCatalog: [
    { title: '지식1', icon: '1', value: 0 },
    { title: '지식2', icon: '2', value: 1 },
  ]
})

// tree 지식 카탈로그
import Tree from "vue3-treeview";

import "vue3-treeview/dist/style.css";

const treeData = ref<object> ({
  config: {
    roots: ["id1", "id2", "id3"],
    keyboardNavigation: false,
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
    id1: {
      text: "사내규정 (21)",
      children: ["id11", "id12", "id13"],
    },
    id11: {
      text: "HR 관리 (6)",
      children: ["id111", "id112", "id113", 'id114', 'id115', 'id116'],
    },
    id111: {
      text: "여비규정_202301.pdf",
    },
    id112: {
      text: "전결규정_2023.pdf",
    },
    id113: {
      text: "휴가규정_202207.pdf",
    },
    id114: {
      text: "인사규정_2021.pdf",
    },
    id115: {
      text: "급여규정_20220704.pdf",
    },
    id116: {
      text: "근무평정규정_2022.pdf",
    },

    id2: {
      text: "재무/회계 기준 (5)",
      children: ['id21'],
    },
    id21: {
      text: "재무/회계 기준",
    },
    id3: {
      text: "정보보안 규정 (3)",
      children: ["id131", "id132"],
    },
    id4: {
      text: "기타 (12)",
    },

  },
})

</script>

<template>
  <div class="ui-panel-form-list">
    <div>
      <label class="pl-label" for="">
        데이터 소스
        <!-- <v-badge color="red" dot inline></v-badge> -->
      </label>
      <v-radio-group
        inline
        v-model="block.source"
        hide-details
        >
        <v-radio label="AI Model" value="ai" class="pl-radio"></v-radio>
        <v-radio label="Knowledge Base" value="knowledge" class="pl-radio"></v-radio>
      </v-radio-group>
    </div>
    <!-- AI Model -->
    <template v-if="block.source === 'ai'" >
      <div>
        <label class="pl-label" for="">
          Prompt
        </label>
        <PropertyTextarea
          :block = block
          :seq = seq
          :index = index
          :type = "'responseAi'"
          :blockType="'textarea'"
          :blockKey="'prompt'"
          :placeholder = "'프롬프트를 입력하세요.'"
          >
        </PropertyTextarea>
      </div>
      <div class="flex flex-col gap-y-2">
        <div>
          <label class="pl-label" for="">
            Prompt Setting
          </label>
          <v-select
            :items="DataResponseAi.promptSetting"
            v-model="block.promptSetting"
            class="pl-form mt-2"
            placeholder="모델을 선택하십시오."
            density="compact"
            variant="outlined"
            menu-icon="pl-icon20 arrow-up"
            hide-details
            >
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
        </div>
        <div class="flex-col ">
          <label class="pl-label" for="">
            Temperature
          </label>
          <div>
            <v-slider
              v-model="block.temperature"
              min="0"
              max="1"
              :step="0.1"
              hide-details
              track-size="1"
              thumb-size="15"
              color="#4f62cd"
              >
              <template v-slot:append>
                <v-text-field
                  v-model="block.temperature"
                  style="width: 50px"
                  class="pl-form is-sm ml-4"
                  reverse
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </template>
            </v-slider>
          </div>
        </div>
        <div class="flex-col ">
          <label class="pl-label" for="">
            Max Tokens
          </label>
          <div>
            <v-slider
              v-model="block.maxTokens"
              min="0"
              max="512"
              :step="1"
              track-size="1"
              hide-details
              thumb-size="15"
              color="#4f62cd"
              >
              <template v-slot:append>
                <v-text-field
                  v-model="block.maxTokens"
                  class="pl-form is-sm ml-4"
                  style="width: 50px"
                  reverse
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </template>
            </v-slider>
          </div>
        </div>
        <div class="">
          <label class="pl-label" for="">
            System
          </label>
          <PropertyTextarea

            :block = block
            :seq = seq
            :index = index
            :type = "'responseAi'"
            :blockType="'textarea'"
            :blockKey="'system'"
            :placeholder = "'you are a helpful assistant'"
            >
          </PropertyTextarea>
        </div>
      </div>
      <v-btn
        class="pl-btn ml-auto"
        prepend-icon="pl-icon20 run"
        color="#4f62cd"
        oulined
        @click="dialogSetai = true"
        variant="tonal">
        <span class="normal-case">Preview</span>
      </v-btn>
    </template>
    <!-- Knowledge Base -->
    <template v-if="block.source === 'knowledge'" >
      <div class="flex flex-column gap-y-2">
        <div>
          <label class="pl-label" for="">
            지식 카탈로그
            <!-- <v-badge color="red" dot inline></v-badge> -->
          </label>
          <div>
            <v-menu :location="location">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="pl-btn type-line w-full mt-2"
                  append-icon="pl-icon20 arrow-up"
                  variant="flat"
                  hide-details
                >
                LLM이 참조할 문서의 범위를 지정하세요.
                </v-btn>
              </template>
              <div class="pl-tree">
                <tree
                  :config="treeData.config"
                  :nodes="treeData.nodes">
                  <template #before-input="props">
                    <span class="before pl-1">
                      <v-icon
                        v-if="!props.node.children.length"
                        class="pl-icon20 tree-docu"></v-icon>
                    </span>
                  </template>
                </tree>
              </div>

            </v-menu>
          </div>
          <!-- <v-select
            :items="DataResponseAi.knowledgeCatalog"
            v-model="block.knowledgeCatalog"
            class="pl-form mt-2"
            placeholder="LLM이 참조할 문서의 범위를 지정하세요"
            density="compact"
            variant="outlined"
            menu-icon="pl-icon20 arrow-up"
            hide-details
            >
          </v-select> -->
        </div>
        <div>
          <label class="pl-label" for="">
            Question
            <!-- <v-badge color="red" dot inline></v-badge> -->
          </label>
          <PropertyTextarea
            :block = block
            :seq = seq
            :index = index
            :type = "'responseAi'"
            :blockType="'textarea'"
            :blockKey="'question'"
            :placeholder = "'Enter query to  knowledge base {variable)'"
            >
          </PropertyTextarea>
        </div>
        <div>
          <label class="pl-label" for="">
            Instructions
          </label>
          <PropertyTextarea
            :block = block
            :seq = seq
            :index = index
            :type = "'responseAi'"
            :blockType="'textarea'"
            :blockKey="'instructions'"
            :placeholder = "'Enter Instructions for response'"
            >
          </PropertyTextarea>
        </div>
      </div>
      <div class="flex align-center h-[50px]">
        <label class="pl-label" for="">
          Not found path
        </label>
        <v-switch
          v-model="block.notFoundPathToggle"
          color="#4f62cd"
          inset
          hide-details
          class="ml-auto pl-switch"
          density="compact"
          ></v-switch>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex align-center h-[50px]">
          <label class="pl-label" for="">
            Override Prompt Setting
            <!-- <v-badge color="red" dot inline></v-badge> -->
          </label>
          <v-switch
            v-model="block.overridePromptSetToggle"
            color="#4f62cd"
            inset
            hide-details
            class="ml-auto pl-switch"
            density="compact"
            ></v-switch>
        </div>
        <template
          v-if="block.overridePromptSetToggle"
          >
          <v-select
            :items="DataResponseAi.overridePromptSetting"
            v-model="block.overridePromptSetting"
            class="pl-form"
            placeholder="모델을 선택하십시오."
            density="compact"
            variant="outlined"
            menu-icon="pl-icon20 arrow-up"
            hide-details
            >
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
          <div class="flex-col ">
            <label class="pl-label" for="">
              Temperature
            </label>
            <div>
              <v-slider
                v-model="block.temperature"
                min="0"
                max="1"
                :step="0.1"
                hide-details
                track-size="1"
                thumb-size="15"
                color="#4f62cd"
                >
                <template v-slot:append>
                  <v-text-field
                    v-model="block.temperature"
                    style="width: 50px"
                    class="pl-form is-sm ml-4"
                    reverse
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </template>
              </v-slider>
            </div>
          </div>
          <div class="flex-col ">
            <label class="pl-label" for="">
              Max Tokens
            </label>
            <div>
              <v-slider
                v-model="block.maxTokens"
                min="0"
                max="512"
                :step="1"
                track-size="1"
                hide-details
                thumb-size="15"
                color="#4f62cd"
                >
                <template v-slot:append>
                  <v-text-field
                    v-model="block.maxTokens"
                    class="pl-form is-sm ml-4"
                    style="width: 50px"
                    reverse
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </template>
              </v-slider>
            </div>
          </div>
          <div class="">
            <label class="pl-label" for="">
              System
            </label>
            <PropertyTextarea
              :block = block
              :seq = seq
              :index = index
              :type = "'responseAi'"
              :blockType="'textarea'"
              :blockKey="'system'"
              :placeholder = "'you are a helpful assistant'"
              >
            </PropertyTextarea>
          </div>
        </template>
      </div>
      <v-btn
        class="ml-auto"
        prepend-icon="pl-icon20 run"
        color="#4f62cd"
        oulined
        @click="dialogSetai = true"
        variant="tonal">
        <span class="normal-case">Preview</span>
      </v-btn>
    </template>
    <!-- dialog -->
    <v-dialog
      v-model="dialogSetai"
      width="auto"
    >
      <ResponseaiDialog
        titleProp="Set Variables"
        @close="dialogSetai = false"
        @save="saveChatbotDialg()"
      />
    </v-dialog>

  </div>
</template>

<style scoped>

</style>