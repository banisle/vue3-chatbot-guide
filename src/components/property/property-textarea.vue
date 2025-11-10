<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import PropertyInsertText from '@/components/property/property-insertText.vue'

const props = defineProps(['block','seq','index','type','blockType','blockKey','placeholder'])

let textDropPos = ref<number>()

let text = ref<string>()

let textareaRefs = ref();

let insertTextDialog = ref<boolean>(false)

let insertTextClick = ref<boolean>(false)

const clickTextarea = (el) => {
  insertTextDialog.value = true;
  textDropPos = textareaRefs.value.getBoundingClientRect().top + window.scrollY
}

const insertText= (text) => {
  // if(props.blockType == 'textarea'){
  //   props.block.msg = text;
  // } else{
    props.block[props.blockKey] = text;
  // }
  textareaRefs.value.focus();
}

//textarea 영역 밖 클릭
const clickOutside = (e) => {
  const target = e.relatedTarget;
  let isButton = false;
  let isEmojiArea = false;
  let isMacroArea = false;
  if(target){
    isButton = target.tagName === 'BUTTON';
    isEmojiArea = target.querySelector('span > i')?.classList.contains('emoji') ?? false;
    isMacroArea = target.querySelector('span > i')?.classList.contains('macro') ?? false;
  }
  if (isButton && isEmojiArea) {
    console.log("이모지영역");
  } else if (isButton && isMacroArea) {
    console.log("상용구영역");
  } else {
    insertTextDialog.value = false;
  }
}

</script>

<template>
  <PropertyInsertText
    v-if="insertTextDialog"
    :block="block"
    :seq="seq"
    :index="index"
    :textDropPos='textDropPos'
    :textEl="textareaRefs"
    :blockType="blockType"
    @insertText="insertText"
    />
  <v-textarea
    v-if="blockType == 'textarea'"
    :ref="(el) => { textareaRefs = el }"
    v-model="block[props.blockKey]"
    variant="outlined"
    height="150px"
    hide-details
    auto-grow
    class="pl-form"
    :placeholder = "placeholder"
    :class="type == 'carousel' || type == 'card' ? 'w-full type-vline' : (type == 'responseAi' ? 'mt-2'  : 'type-upround')"
    @click="clickTextarea($event)"
    v-on:blur="clickOutside($event)"
  ></v-textarea>
  <v-text-field
    v-else
    :ref="(el) => { textareaRefs = el }"
    v-model="block[props.blockKey]"
    :class="`pl-form ${type == 'carousel' ? 'type-vline' : ''}`"
    density="compact"
    variant="outlined"
    hide-details
    :placeholder = "placeholder"
    @click="clickTextarea($event)"
    v-on:blur="clickOutside($event)"
  ></v-text-field>
</template>

<style scoped>

</style>