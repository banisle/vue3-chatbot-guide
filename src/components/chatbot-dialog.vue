<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits(["close","save"]);

const closeDialog = () => {
  emit("close");
}
const saveDialog = () => {
  emit("save");
}

const channelList = ref([
  { active: false, icon: 'share-teletalk', title: '텔레톡(T-Talk)' },
  { active: false, icon: 'share-ntalk', title: '네이버 톡톡' },
  { active: false, icon: 'share-instagram', title: '인스타그램 DM' },
  { active: false, icon: 'share-line', title: '페이스북 메신저' },
  { active: false, icon: 'share-facebook', title: '라인' },
])

const selectChannel = (item) => {
  removeChannelActive();
  item.active = true;
}

const removeChannelActive = () => {
  for (let index = 0; index < channelList.value.length; index++) {
    channelList.value[index].active = false
  }
}

</script>
<template>
  <div class="rounded-lg bg-white w-[500px] ">
    <!-- header -->
    <div class="flex align-center py-2 px-4 bg-[#4f62cd] rounded-t-lg">
      <strong class="text-white text-[16px]">챗봇 생성</strong>
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
    <div class="flex flex-col gap-y-4 py-2 px-4 border-t">
      <div>
        <label class="pl-label" for="">
          회사선택
          <v-badge color="red" dot inline></v-badge>
        </label>
        <v-select
          class="pl-form"
          :items="[]"
          density="compact"
          variant="outlined"
          placeholder="선택하십시오"
          menu-icon="pl-icon20 arrow-up"
          hide-details></v-select>
      </div>
      <div>
        <label class="pl-label" for="">
          적용 채널 선택
          <v-badge color="red" dot inline></v-badge>
        </label>
        <div class="rounded bg-white border p-3 ">
          <span>생성할 챗봇을 적용할 채널을 아래에서 선택하십시오.</span>
          <div class="grid grid-cols-3 gap-1 mt-2">
            <div
              v-for="item, index in channelList"
              :key="item.id">
              <v-btn
                :class="`selectChannelBtn leading-[0] w-full justify-start active-${ item.active }`"
                :prepend-icon="`pl-icon20 ${ item.icon }`"
                @click="selectChannel(item)"
                variant="text">
                <span class="text-[12px] font-regular normal-case">{{ item.title }}</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label class="pl-label" for="">
          챗봇 이름
          <v-badge color="red" dot inline></v-badge>
        </label>
        <v-text-field
          class="pl-form"
          density="compact"
          variant="outlined"
          hide-details
          placeholder="챗봇의 이름을 입력하십시오."></v-text-field>
      </div>
      <div>
        <label class="pl-label" for="">
          챗봇 설명
        </label>
        <v-textarea
          class="pl-form"
          density="compact"
          variant="outlined"
          hide-details
          placeholder="챗봇의 설명을 입력하세요.">
        </v-textarea>
      </div>

    </div>
    <!-- footer -->
    <div class="flex justify-end pa-4 pt-2 gap-x-2">
      <v-btn
        class="pl-btn"
        color="#4f62cd"
        height="30px"
        @click="closeDialog()"
        variant="flat">
        닫기</v-btn>
      <v-btn
        class="pl-btn"
        height="30px"
        @click="saveDialog()"
        variant="outlined">
        저장</v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>