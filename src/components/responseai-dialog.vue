<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits(["close","save"]);
const props = defineProps(['titleProp', 'typeProp'])

const closeDialog = () => {
  emit("close");
}
const saveDialog = () => {
  emit("save");
}

import testRequestDialog from '@/components/testRequest-dialog.vue';

const dialogTestRequest = ref<boolean>(false)

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
      <div>
        <label class="pl-label" for="">
          <v-icon class="pl-icon20 block-variable"></v-icon>
          <span class="ml-2">{last_utterance}</span>
        </label>
        <v-textarea
          class="pl-form mt-2"
          variant="outlined"
          height="150px"
          hide-details
          auto-grow
          placeholder="Enter a value">
        </v-textarea>
      </div>
      <div v-if="typeProp === 'api'">
        <label class="pl-label" for="">
          <v-icon class="pl-icon20 block-variable"></v-icon>
          <span class="ml-2">{company}</span>
        </label>
        <v-textarea
          class="pl-form mt-2"
          variant="outlined"
          height="150px"
          hide-details
          auto-grow
          placeholder="Enter a value">
        </v-textarea>
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
        <template v-if="typeProp === 'api'">
          <v-btn
            class="pl-btn"
            height="30px"
            color="#4f62cd"
            @click="dialogTestRequest = true"
            variant="flat">
            Request</v-btn>
        </template>
        <template v-else>
          <v-btn
            class="pl-btn"
            height="30px"
            color="#4f62cd"
            @click="saveDialog()"
            variant="flat">
            Generate</v-btn>
        </template>
    </div>
  </div>
  <!-- 추가 dialog -->
  <v-dialog
    v-model="dialogTestRequest"
    width="auto"
  >
    <testRequestDialog
      titleProp="Test Request"
      @close="dialogTestRequest = false"
    />
  </v-dialog>
</template>

<style scoped>

</style>