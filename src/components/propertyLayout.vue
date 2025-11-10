<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch  } from 'vue'
import { useVueFlow } from '@vue-flow/core';
import draggable from 'vuedraggable'
import { usePropertyPanelStore, useSelectedNodeStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'

import { useDropzone } from "vue3-dropzone";

// 패널 visible
const storePropertyPanel = usePropertyPanelStore()
const { isVisible } = storeToRefs(storePropertyPanel)

// selected node data
const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

//버튼 편집
const setBtn = ref<boolean>(false);
const btnIndex = ref<number>(0);

const btnActionList = ref([
  { title: '노드연결', value: 1 },
  { title: 'URL링크', value: 2 },
  { title: '메시지전송', value: 3 },
  { title: '전화', value: 4 },
  { title: '상담사 연결', value: 5 },
  { title: '종료', value: 6 },
]);

//연결노드 선택 리스트
const nodeList = ref<string[]>([]);

// emoji
const dropEmoji = ref<boolean[]>([
  false
])
const emojiList = ref<string[]>([
'😁',
'🤣',
'😂',
'😉',
'😊',
'😇',
'🥰',
'😍',
'🤩',
'😘',
'😜',
'🤑',
'🤗',
'🤔',
'🤠',
'😎',
'😳',
'😢',
'😭',
'😱'
])

// textarea의 ref를 저장할 배열
// const textareaRefs = ref<(HTMLTextAreaElement | null)[]>([]);
let textareaRefs = ref([])

let emojiDropPos = ref<number>(0)

let clickEmoji = (index, el) => {
  emojiDropPos.value = el.clientY
  for (let index = 0; index < dropEmoji.value.length; index++) {
    dropEmoji.value[index] = false
  }
  dropEmoji.value[index] = true
}

//이모지 삽입
function insertEmoji(emoji: string, seq:number, index: number){
  // this.nodeData.data.block[index].data = this.nodeData.data.block[index].data+emoji;

  const textarea = textareaRefs.value[index]

  if (!textarea) return; // 참조가 아직 설정되지 않은 경우 종료

  const cursorPos = textarea.selectionStart || 0;

  const textBeforeCursor = this.nodeData.data.block[seq].data[index].data.substring(0, cursorPos);
  const textAfterCursor = this.nodeData.data.block[seq].data[index].data.substring(cursorPos);

  // 선택한 이모지를 현재 커서 위치에 삽입
  this.nodeData.data.block[seq].data[index].data = textBeforeCursor + emoji + textAfterCursor;

  // 커서 위치 조정
  const newCursorPos = cursorPos + emoji.length;
  setTimeout(() => {
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    textarea.focus();
  });

  dropEmoji.value[index] = false;
}

//블럭추가 이벤트
function addBlock(type){
  if(this.nodeData.data.block){
    this.nodeData.data.block.push({index:this.nodeData.data.block.length,data:[{'type':type,'data':'' }]});
  } else {
    let block = {index:0,data:[{'type':type,'data':''}]}
    this.nodeData.data = {
      'block':block,
      'title': this.nodeData.data.title
    };
  }
}

//버튼추가 이벤트
function addBtn(seq,index){
  this.nodeData.data.block[seq].data.push({'type':'btn','title':index,'action':'','data':'' });
  setBtn.value = true;
  btnIndex.value = index+1;
}

//블럭삭제 이벤트
function delBlock(seq){
  this.nodeData.data.block.splice(seq,1);
}

//버튼편집 레이아웃 열기
function openBtnLayout(index){
  setBtn.value = true;
  btnIndex.value = index;
}

//버튼 저장
function strgBtn(){
  setBtn.value = !setBtn.value
}

//이미지 드롭존
const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

function onDrop(acceptFiles, rejectReasons) {
  console.log(acceptFiles);
  console.log(rejectReasons);
}
// const previewImage = ref<string>('')  // vue ref- 반응형 값을 저장

const changeImage = (event,seq,index) => {
  const files = event.target?.files
  if (files.length > 0){
    const file = files[0]

    // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
    const reader = new FileReader() 

    // load 이벤트 핸들러. 리소스 로딩이 완료되면 실행됨.
    reader.onload = (e) => {
      // previewImage.value = e.target.result 
      nodeData.value.data.block[seq][index].data = e.target.result;
    } // ref previewImage 값 변경

    // 컨텐츠를 특정 file에서 읽어옴. 읽는 행위가 종료되면 loadend 이벤트 트리거함 
    // & base64 인코딩된 스트링 데이터가 result 속성에 담김
    reader.readAsDataURL(file)

  }
}

watch(setBtn, (data) => {
  let leng = allNode.value.length
  for(let i=0;i<leng;i++){
    if(nodeData.value.id != allNode.value[i].id){
      nodeList.value[i] = {
        title: allNode.value[i].data.title ? allNode.value[i].data.title : allNode.value[i].label
        , value:allNode.value[i].id
      }
    }
  }
});

const dragArray = ref();
const drag = ref<boolean>(false);

const myArray = ref([
  { id: 1, name: 'Item 1', content: 'Content 1' },
  { id: 2, name: 'Item 2', content: 'Content 2' },
  { id: 3, name: 'Item 3', content: 'Content 3' },
]);

</script>
<template>
  <v-slide-x-reverse-transition>
    <div
      v-if="isVisible"
      class="overflow-y-scroll absolute w-[410px] h-[calc(100vh-122px)] border-l border-gray-200 p-2 top-[57px] right-0 bg-white">
      <div>id: {{ nodeData.id }}</div>
      <div>노드명:
        <v-text-field
          v-model="nodeData.data.title"
          hide-details
          density="compact"
          variant="outlined"
          ></v-text-field>
      </div>
      <br><hr><br>
      <div class="relative">
        <draggable 
          v-model="nodeData.data.block" 
          group="people"
          @start="drag=true"
          @end="drag=false"
          item-key="index"
        >
          <template #item="{element}">
            <AccordionRoot
              class="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
              default-value="item-1"
              type="single"
              :collapsible="true"
            >
              <template v-for="node,key in element" :key="element.index">
                <AccordionItem v-if="key == 'data'" class="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]" :value="element.index">
                  <AccordionHeader class="flex">
                    <AccordionTrigger class="text-grass11  shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group">
                      <span>{{ node[0].type }}</span>
                      <v-btn @click="delBlock(element.index)">블록삭제</v-btn>
                      <v-icon class="pl-icon20 arrow-down"></v-icon>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent class="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                    <div class="px-5 py-4">
                      <div v-for="block,index in node" :key="block.id">
                        <template v-if="block.type == 'textarea' || block.type == 'blockText'">
                          <v-btn
                            variant="plain"
                            size="32"
                            rounded
                            class="text-lg"
                            @click="clickEmoji(index, $event)"
                            >😁</v-btn>
                          <v-slide-x-transition>
                            <div
                              v-if="dropEmoji[index]"
                              class="grid grid-cols-4 gap-4 fixed z-10 -translate-x-full border rounded bg-white"
                              :style="`top: ${emojiDropPos + 19}px`"
                              >
                              <div v-for="icon in emojiList" :key="icon.id">
                                <v-btn
                                  variant="plain"
                                  size="32"
                                  rounded
                                  class="text-lg"
                                  @click="insertEmoji(icon,element.index,index)"
                                  >{{ icon }}</v-btn>
                              </div>
                            </div>
                          </v-slide-x-transition>
                        </template>
                        <v-textarea
                          v-if="block.type == 'textarea' || block.type == 'blockText'"
                          :ref="(el) => { textareaRefs[index] = el }"
                          v-model="block.data"
                          no-resize
                          variant="outlined"
                        ></v-textarea>
                        <v-text-field
                          v-if="block.type == 'text-field'"
                          :ref="`textareaRef${index}`"
                          v-model="block.data"
                          no-resize
                          variant="outlined"
                        ></v-text-field>
                        <div
                          v-if="block.type == 'img'"
                        >
                          <div v-bind="getRootProps()">
                            <input v-bind="getInputProps()" @change="changeImage($event,element.index,index)"/>
                            <img :src="block.data"/>
                            <p v-if="isDragActive">Drop the files here ...</p>
                            <p v-else>vue3 Dropzone</p>
                          </div>
                          <button @click="open">open click</button>
                        </div>
                        <v-btn
                          v-if="block.type == 'btn'"
                          :ref="`textareaRef${index}`"
                          v-model="block.data"
                          no-resize
                          variant="outlined"
                          @click="openBtnLayout(index)"
                        >{{ block.title }}</v-btn>
                        <v-btn
                          v-if="(node[0].type == 'textarea' || block.type == 'blockText') && index == node.length-1"
                          @click="addBtn(element.index,index)"
                        >
                          <span>버튼</span>
                        </v-btn>
                        <div
                          v-if="setBtn &&  index == node.length-1"
                        >
                          <span>버튼명</span>
                          <v-text-field
                            v-model="node[btnIndex].title"
                          ></v-text-field> 
                          <span>버튼액션</span>
                          <v-select
                            :items="btnActionList"
                            v-model="node[btnIndex].action"
                          ></v-select>
                          <v-select
                            v-if="node[btnIndex].action != '' && node[btnIndex].action == '1'"
                            v-model="node[btnIndex].data"
                            :items="nodeList"
                            placeholder = "연결할 노드를 선택하세요"
                          ></v-select>
                          <v-text-field
                            v-if="node[btnIndex].action != '' && node[btnIndex].action != '1'"
                            v-model="node[btnIndex].data"
                            :placeholder = "node[btnIndex].action == '2' ? '연결할 URL주소를 입력하세요.' 
                              : node[btnIndex].action == '3' ? '채팅방에 전송할 메시지를 입력하세요.' 
                              : node[btnIndex].action == '4' ? '(-)를 제외한 연결할 전화번호를 입력하세요.'
                              : node[btnIndex].action == '5' ? '상담직원으로 자동 연결됩니다.'
                              : '채팅이 종료됩니다.'"
                            :disabled="node[btnIndex].action == '5' || node[btnIndex].action == '6'"
                          ></v-text-field> 
                          <v-btn
                            @click="strgBtn()"
                          >저장</v-btn>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </template>
            </AccordionRoot>
          </template>
        </draggable>
        <br>
        <div>
          <v-btn
            @click="addBlock('blockText')"
          >
            <span>텍스트</span>
          </v-btn>
        </div>
        <div>
          <v-btn
            @click="addBlock('text-field')"
          >
            <span>문자</span>
          </v-btn>
        </div>
        <div>
          <v-btn
            @click="addBlock('img')"
          >
            <span>이미지</span>
          </v-btn>
        </div>
        <div>
          <v-btn
            @click="addBlock('btn')"
          >
            <span>버튼</span>
          </v-btn>
        </div>
        <!-- <br>
        <div>
          바로연결버튼
          <v-switch
            v-model="nodeData.data.block.linkBtn"
          >
          </v-switch>
          <v-btn
            @click=""
          >
            <span>버튼추가</span>
          </v-btn>
        </div> -->
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>
<style scoped>

</style>