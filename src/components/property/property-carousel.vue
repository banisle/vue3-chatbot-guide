<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'

import PropertyTextarea from '@/components/property/property-textarea.vue'
import PropertyImg from '@/components/property/property-img.vue'
import PropertyButton from '@/components/property/property-button.vue'
import PropertyDiscrepancy from '@/components/property/property-discrepancy.vue'

const props = defineProps(['element','block','seq','index','btn'])

//블럭삭제 이벤트 - 캐로셀 단일삭제
function delBlock(num){
  props.block.data.splice(num,1);
}

//캐러셀추가 이벤트
function addBlock(){
  props.block.data.push({'type':'blockCarousel','data':'','title':'','msg':'','btnGroupId':'','btn':[], 'addbtn':true, 'macro':true, 'emoji':true})
}

const discrepancy = ref(false)

const btnClick = () => {
  let leng = props.block.data.length
  let btnCnt = 0;
  for(let i=0;i<leng;i++){
    btnCnt = btnCnt + props.block.data[i].btn.length;
  }
  discrepancy.value =  btnCnt > 0 ? true : false;
}

</script>

<template>
  <div
    v-for="carousel,num in block.data" :key="num"
    :class="num !== 0 ? 'mt-4' : ''"
    class="relative"
    >
    <div class="">
      <!-- 삭제 버튼 -->
      <div v-if="num != 0" class="absolute top-[-10px] right-[-10px] z-10">
        <v-btn
          max-width="24px"
          max-height="24px"
          icon
          variant="outlined"
          color="#999"
          style="background: #FFF"
          @click="delBlock(num)"
          >
          <v-icon class="pl-icon20 minus"></v-icon>
        </v-btn>
      </div>
      <PropertyImg
        :block="carousel"
        :seq="seq"
        :index="index"
        :num="num"
        />
      <div class="flex flex-col w-full">
        <PropertyTextarea
          :block = carousel
          :seq = seq
          :index = index
          :type = "'carousel'"
          :blockType="'textfield'"
          :blockKey="'title'"
          :placeholder = "'카드 제목을 입력하세요'"
          >
        </PropertyTextarea>
        <PropertyTextarea
          :block = carousel
          :seq = seq
          :index = index
          :type = "'carousel'"
          :blockType="'textarea'"
          :blockKey="'msg'"
          :placeholder = "'카드 내용을 입력하세요'"
          >
        </PropertyTextarea>
      </div>
    </div>
    <!--캐러셀 버튼-->
    <div class="w-full">
      <PropertyButton
        :block="carousel"
        :seq="seq"
        :index="index"
        :btn="btn"
        :num="num"
        @btnClick="btnClick"
        ></PropertyButton>
    </div>
  </div>
  <div v-if="block.type == 'blockCarouselGroup'" class="text-center mt-2">
    <v-btn
      max-width="24px"
      max-height="24px"
      icon
      variant="outlined"
      color="#000"
      style="background: #FFF; opacity: .6"
      @click="addBlock()"
      >
      <v-icon class="pl-icon20 plus"></v-icon>
    </v-btn>
  </div>
  <!-- 일치하지 않을경우 -->
  <PropertyDiscrepancy
    v-if="discrepancy"
    :discrepancy="element.discrepancy"
    :seq="element.index"
    :index="index"
    :num="'-1'"
    @btnClick = "btnClick"
    ></PropertyDiscrepancy>
</template>

<style scoped>

</style>