<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

const agentSelect = ref<object>({
  model: 0,
  opt: [
  { title: '한국클라우드 데모존', icon: 'ai-bot', value: 0 },
  ]
})
</script>

<template>
  <div class="layout-content-top ml-[60px] pl-4 w-auto">
    <div
      class="flex align-center text-[22px] font-bold leading-none">
      {{ route.meta.parentName }}
    </div>
    <div class="ml-auto flex align-center">
      <span class="pl-label">에이전트</span>
      <v-select
        v-model="agentSelect.model"
        class="pl-form ml-2 w-[220px]"
        :items="agentSelect.opt"
        density="compact"
        variant="outlined"
        placeholder="챗봇의 이름을 입력하세요."
        menu-icon="pl-icon20 arrow-up"
        hide-details>
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
      <v-btn
        class="pl-btn ml-2"
        prepend-icon="pl-icon20 in-search-white"
        color="#4f62cd"
        variant="flat"
        >조회</v-btn>

    </div>
  </div>
</template>



<style scoped>

</style>