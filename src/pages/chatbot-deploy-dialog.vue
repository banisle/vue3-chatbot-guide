<script setup lang="ts">
//@ts-nocheck
import { ref, defineEmits } from 'vue'
import MonacoEditor from '@/components/monaco-editor.vue'

const code = ref<string>(`(function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.ai.hkpalette.chat.load({
          verify: { projectID: '661eea5003fc48762eef1309' },
          url: 'https://general-runtime.hkpalette.com',
          versionID: 'production'
        });
      };
      s.parentNode.insertBefore(v, s);
      v.src = "https://ai.hkpalette.com/widget/bundle.mjs";
      v.type = "text/javascript";
  })(document, 'script');
`)

const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
}


</script>
<template>
  <div class="rounded-lg bg-white w-[650px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">배포하기</strong>
      <div class="ml-auto">
        <v-btn
          min-width="24px"
          icon
          size="small"
          variant="text"
          @click="closeDialog()">
          <v-icon class="pl-icon20 in-close-white" ></v-icon>
        </v-btn>
      </div>
    </div>
    <!-- body -->
    <div class="flex flex-column">
      <p class="px-6 pt-4">URL 주소 및 위젯 HTML 코드를 복사하여 웹사이트나 모바일 앱에 챗봇을 추가하십시오.</p>
      <div class="flex flex-col gap-y-4 w-full px-6 pt-4 pb-8 h-full">
        <div>
          <label class="pl-label flex-[0_0_150px]" for="">
            위젯 스크립트
          </label>
          <div class="overflow-hidden h-[300px] w-full rounded-lg border">
            <monaco-editor
              v-model="code"
              :editor-option="{ readOnly: false, colorDecorators: true, padding: { top: 10 },minimap: { enabled: false }, }" />
          </div>
        </div>
        <div>
          <label class="pl-label flex-[0_0_150px]" for="">
            URL
            <v-badge color="red" dot inline></v-badge>
          </label>
          <v-text-field
            class="pl-form"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="웹훅 URL을 입력하세요."
            append-inner-icon="pl-icon20 copy-paste"
            ></v-text-field>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="flex justify-end pa-4 pt-2 gap-x-2 border-t">
      <v-btn
        class="pl-btn type-line"
        size="small"
        @click="closeDialog()"
        variant="flat">
        닫기</v-btn>
    </div>

  </div>
</template>

<style scoped>

</style>