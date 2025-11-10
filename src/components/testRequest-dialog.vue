<script lang="ts" setup>
//@ts-nocheck
import { ref } from 'vue'
import { defineEmits } from 'vue'
import MonacoEditor from './monaco-editor.vue'

const props = defineProps(['titleProp'])
const emit = defineEmits(["close","save"]);

const closeDialog = () => {
  emit("close");
}
const tab = ref(null)
const code = ref(
  '{\n  {\n   "keyword" :  "palette",\n   "valuable" : "no"\n  }\n}'
)
</script>

<template>
  <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">{{ titleProp }}</strong>
      <div class="ml-auto">
        <v-btn min-width="24px" icon size="small" variant="text">
          <v-icon class="pl-icon20 in-close-white" @click="closeDialog()"></v-icon>
        </v-btn>
      </div>
    </div>
    <!-- body -->
    <div class="flex flex-col gap-y-4 py-2 px-4 border-t">
      <v-tabs
        v-model="tab"
        class="pl-tabs"
        hide-slider
        >
        <v-tab value="one">Body</v-tab>
        <v-tab value="two">Headers</v-tab>
      </v-tabs>
      <div class="h-[350px] w-full ">
        <monaco-editor
          v-model="code"
          :editor-option="{ readOnly: true, colorDecorators: true, }" />
      </div>
    </div>
     <!-- footer -->
     <div class="flex justify-end pa-4 pt-2 gap-x-2">
      <v-btn
        class="pl-btn"
        height="30px"
        @click="closeDialog()"
        variant="outlined">
        닫기</v-btn>
    </div>
  </div>
</template>
