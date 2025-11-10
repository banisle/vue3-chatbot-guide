<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import { usePropertyPanelStore, useSelectedNodeStore, useChatobtPreviewStore } from '@/stores/panelStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps(['block','seq','index','num'])

const storeSelectedNode = useSelectedNodeStore()
const { nodeData,allNode } = storeToRefs(storeSelectedNode)

const imgRefs = ref();

const changeImage = (event) => {
  const files = event.target?.files
  if (files.length > 0){
    const file = files[0]

    // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
    const reader = new FileReader()

    // load 이벤트 핸들러. 리소스 로딩이 완료되면 실행됨.
    reader.onload = (e) => {
      if(props.num != '-1'){
        nodeData.value.data.block[props.seq].data[props.index].data[props.num].img = e.target.result;
      } else {
        props.block.img = e.target.result;
      }
    } // ref previewImage 값 변경

    // 컨텐츠를 특정 file에서 읽어옴. 읽는 행위가 종료되면 loadend 이벤트 트리거함
    // & base64 인코딩된 스트링 데이터가 result 속성에 담김
    reader.readAsDataURL(file)
  }
}

const changeImageBtn = () => {
  imgRefs.value.click();
}

const delImg = () => {
  if(props.num != '-1'){
    nodeData.value.data.block[props.seq].data[props.index].data[props.num].img = '';
  } else {
    props.block.img = '';
  }
}
</script>

<template>
  <div
    class="w-full bg-white border rounded-lg rounded-b-0 border-b-0 text-center flex align-center justify-center"
    >
    <div
      class="relative flex flex-col justify-center align-center w-full min-h-[100px]"
      style="cursor: pointer;"
      >
      <label
        :for="`imgInput-${seq}${index}${num}`"
        class="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
        ></label>
      <input
        type="file"
        :ref="(el) => { imgRefs = el }"
        :id="`imgInput-${seq}${index}${num}`"
        @change="changeImage($event)"
        style="display: none"
        >
      </input>
      <div
        v-if="block.img"
        class="property-img">
        <img :src="block.img" class="max-h-[150px] p-1"/>
        <div class="over-btn">
          <v-btn
            class="pl-btn"
            variant="flat"
            height="30px"
            @click="changeImageBtn()"
            >이미지 변경</v-btn>
          <v-btn
            style="min-width: 0;"
            class="pl-btn pa-0"
            variant="flat"
            width="30px"
            height="30px"
            @click="delImg()"
            >
          <v-icon class="pl-icon20 card-remove-red"></v-icon></v-btn>
        </div>
      </div>
      <div v-else class="img-drop">
        <div class="drop-msg flex flex-col justify-center align-center p-4">
          <v-icon class="pl-icon20 block-img"></v-icon>
          <span class="mt-2">클릭해서 이미지를 설정하십시오.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>