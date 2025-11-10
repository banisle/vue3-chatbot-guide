<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

const props = defineProps(['block','seq','index','num','textDropPos','textEl','blockType'])

const emit = defineEmits(['insertText']);

// emoji
const dropEmoji = ref<boolean>(false)
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
const dropMacro = ref<boolean>(false)
const macroTab = ref(null)
const macroList = ref([
  { title: '사용자 아이디', value: '{User_id}', type: 'String', },
  { title: '사용자 이름', value: '{User_name}', type: 'String', },
  { title: '전화번호', value: '{Tel_num}', type: 'String', },
  { title: '이메일', value: '{Email_id}', type: 'String', },
  { title: '나이', value: '{User_age}', type: 'number', },
])

let clickEmoji = (seq, el) => {
  dropMacro.value = false
  // posEvt(emojiDropPos, el)
  // for (let i = 0; i < dropEmoji.value.length; i++) {
  //   dropEmoji.value[i] = false
  // }
  dropEmoji.value = true
  // console.log("dropMacro.value", dropEmoji.value);
}
let clickMacro = (seq, el) => {
  dropEmoji.value = false
  // posEvt(macroDropPos, el)
  // for (let i = 0; i < dropMacro.value.length; i++) {
  //   dropMacro.value[i] = false
  // }
  dropMacro.value = true
  // console.log("dropMacro.value", dropMacro.value);
}

function insertEmoji(emoji: string, el:any){
  let text = '';
  let cursorPos = el.selectionStart || 0;
  let textBeforeCursor = el.modelValue.substring(0, cursorPos);
  let textAfterCursor = el.modelValue.substring(cursorPos);
  text = textBeforeCursor + emoji + textAfterCursor;

  // 커서 위치 조정
  // let newCursorPos = cursorPos + emoji.length;
  // setTimeout(() => {
  //   textarea.setSelectionRange(newCursorPos, newCursorPos);
  //   textarea.focus();
  // });
  // console.log("textarea", textarea);

  dropEmoji.value = false;
  dropMacro.value = false;

  emit("insertText", text,props.num);
}
</script>

<template>
  <div
    :style="`top: ${textDropPos}px`"
    class="flex align-center fixed right-[400px] bg-white rounded shadow z-50">
    <!-- 상용구 -->
    <v-menu
      location="start"
      width="350px"
      :close-on-content-click=false
      >
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="block.macro"
          v-bind="props"
          variant="plain"
          size="32"
          rounded
          class="text-lg ml-auto"
          @click="clickMacro(seq, $event)"
          >
          <v-icon class="pl-icon20 macro"></v-icon>
        </v-btn>
      </template>
      <!-- 매크로 리스트 -->
      <div
        v-if="dropMacro"
        class=" w-full border rounded bg-white"
        >
        <div class="p-2">
          <v-text-field
            class="pl-form w-[200px]"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="변수 입력"
            prepend-inner-icon="pl-icon20 in-search"
          ></v-text-field>
        </div>
        <div class="p-4 overflow-y-scroll h-[200px] border-t">
          <div
            v-for="item in macroList"
            :key="item.id"
            class="grid grid-cols-3 gap-4 hover:bg-gray-100 cursor-pointer rounded p-2 text-[13px]"
            @click="insertEmoji(item.value,textEl)"
            >
            <span>{{ item.title }}</span>
            <span class="px-2 rounded bg-gray-300">{{ item.value }}</span>
            <span>{{ item.type }}</span>
          </div>
        </div>

      </div>
    </v-menu>
    <!-- 이모지 -->
    <v-menu
      location="end"
      width="180px"
      >
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="block.emoji && blockType == 'textarea'"
          v-bind="props"
          variant="plain"
          size="32"
          rounded
          class="text-lg ml-auto"
          @click="clickEmoji(seq, $event)"
          >
          <v-icon class="pl-icon20 emoji"></v-icon>
        </v-btn>
      </template>
      <!-- 이모지 리스트 -->
      <div
        v-if="dropEmoji"
        class="grid grid-cols-5 gap-4 fixed z-10 -translate-x-full border rounded bg-white p-2"

        >
        <div v-for="icon in emojiList" :key="icon.id">
          <v-btn
            variant="plain"
            size="32"
            rounded
            class="text-lg"
            @click="insertEmoji(icon,textEl)"
            >{{ icon }}</v-btn>
        </div>
      </div>
    </v-menu>

  </div>
</template>

<style scoped>

</style>