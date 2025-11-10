<script setup lang="ts">
//@ts-nocheck
import { ref, computed, onMounted, watch, defineComponent  } from 'vue'
import PropertyTextarea from '@/components/property/property-textarea.vue'

const props = defineProps(['block','seq','index','btn'])

const methodList = ref([
  {title:'GET',value:'GET'}
  , {title:'POST',value:'POST'}
  , {title:'PUT',value:'PUT'}
  , {title:'DELETE',value:'DELETE'}
  , {title:'FATCH',value:'FATCH'}
])

const addheader = () => {
  props.block.header.push({key:'',value:'', macro:true, emoji:false})
}

const addParam = () => {
  props.block.parameters.push({key:'',value:'', macro:true, emoji:false})
}
const addBody = () => {
  props.block.body.push({key:'',value:'', macro:true, emoji:false})
}

const addRes = () => {
  props.block.response.push({key:'',value:'', macro:true, emoji:false})
}

const delheader = (i) => {
  props.block.header.splice(i,1)
}

const delParam = (i) => {
  props.block.parameters.splice(i,1)
}
const delBody = (i) => {
  props.block.body.splice(i,1)
}

const delRes = (i) => {
  props.block.response.splice(i,1)
}
const resList = ref([
  { title: 'Apply TO Select {Variable}', value: 'Apply TO Select {Variable}' },
])

const bodyRadioGroup = ref<string>('r01')

// dialog
import ResponseaiDialog from '@/components/responseai-dialog.vue';

const dialogSetai = ref<boolean>(false)

</script>

<template>
  <div class="ui-panel-box">
    <div class="ui-panel-form-list">
      <!-- Request URL -->
      <div>
        <label class="pl-label" for="">
          Request URL
        </label>
        <div class="flex align-center mt-2">
          <div class="w-[100px]">
            <v-select
              :items="methodList"
              v-model="block.method"
              modal-value="setSelect"
              class="pl-form"
              density="compact"
              variant="outlined"
              menu-icon="pl-icon20 arrow-up"
              hide-details>
            </v-select>
          </div>
          <v-text-field
            v-model="block.url"
            class="pl-form ml-2"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="Request URL을 입력하세요">
          </v-text-field>
        </div>
      </div>
      <!-- Headers -->
      <div>
        <div class="flex align-center">
          <label class="pl-label" for="">
            Headers
          </label>
          <v-btn
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            @click="addheader()">
            <span class="text-[18px]">+</span>
          </v-btn>
        </div>
        <div class="flex flex-column gap-y-4">
          <div v-for="header, i in block.header" class="flex">
            <div class="flex-[1_0_auto] flex flex-column gap-y-2">
              <v-text-field
                v-model="header.key"
                class="pl-form"
                placeholder="Enter Key"
                density="compact"
                variant="outlined"
                hide-details>
              </v-text-field>
              <PropertyTextarea
                :block=header
                :type="'api'"
                :blockType="'textfield'"
                :blockKey="'value'"
                :placeholder="'Enter Value'">
              </PropertyTextarea>
            </div>
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="delheader(i)">
              <!-- :style="i === 0 ? 'opacity: 0; pointer-events: none' : 'opacity: 1'" -->
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Parameters -->
      <div>
        <div class="flex align-center">
          <label class="pl-label" for="">
            Parameters
          </label>
          <v-btn
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            @click="addParam()">
            <span class="text-[18px]">+</span>
          </v-btn>
        </div>
        <div class="flex flex-column gap-y-4">
          <div v-for="param, i in block.parameters" class="flex">
            <div class="flex-[1_0_auto] flex flex-column gap-y-2">
              <v-text-field
                v-model="param.key"
                placeholder="Enter Key"
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details>
              </v-text-field>
              <PropertyTextarea
                :block=param
                :type="'api'"
                :blockType="'textfield'"
                :blockKey="'value'"
                :placeholder="'Enter Value'">
              </PropertyTextarea>
            </div>
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="delParam(i)">
              <!-- :style="i === 0 ? 'opacity: 0; pointer-events: none' : 'opacity: 1'" -->
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div v-if="block.method === 'POST'">
        <div class="flex align-center">
          <label class="pl-label" for="">
            Body
          </label>
          <v-btn
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            @click="addBody()">
            <span class="text-[18px]">+</span>
          </v-btn>
        </div>
        <v-radio-group
          inline
          hide-details
          v-model="bodyRadioGroup"
          >
          <v-radio label="Form Data" class="pl-radio" value="r01"></v-radio>
          <v-radio disabled label="URL Encoded" class="pl-radio"></v-radio>
          <v-radio disabled label="Raw" class="pl-radio"></v-radio>
        </v-radio-group>
        <div class="flex flex-column gap-y-4">
          <div v-for="body, i in block.body" class="flex">
            <div class="flex-[1_0_auto] flex flex-column gap-y-2">
              <v-text-field
                v-model="body.key"
                placeholder="Enter Key"
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details>
              </v-text-field>
              <PropertyTextarea
                :block=body
                :type="'api'"
                :blockType="'textfield'"
                :blockKey="'value'"
                :placeholder="'Enter Value'">
              </PropertyTextarea>
            </div>
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="delBody(i)">
              <!-- :style="i === 0 ? 'opacity: 0; pointer-events: none' : 'opacity: 1'" -->
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Capture Response -->
      <div>
        <div class="flex align-center">
          <label class="pl-label" for="">
            Capture Response
          </label>
          <v-btn
            class="ml-auto"
            max-width="30px"
            max-height="30px"
            icon
            size="small"
            variant="flat"
            color="transparent"
            @click="addRes()">
            <span class="text-[18px]">+</span>
          </v-btn>
        </div>
        <div class="flex flex-column gap-y-4">
          <div v-for="res, i in block.response" class="flex">
            <div class="flex-[1_0_auto] flex flex-column gap-y-2">
              <v-text-field
                v-model="res.key"
                placeholder="Enter Key"
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details>
                </v-text-field>
              <v-select
                :items="resList"
                v-model="res.value"
                class="pl-form"
                density="compact"
                variant="outlined"
                menu-icon="pl-icon20 arrow-up"
                hide-details>
              </v-select>
            </div>
            <v-btn
              max-width="30px"
              max-height="30px"
              variant="flat"
              icon
              color="transparent"
              size="small"
              @click="delRes(i)">
              <!-- :style="i === 0 ? 'opacity: 0; pointer-events: none' : 'opacity: 1'" -->
              <v-icon class="pl-icon20 minus-small"></v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- btn -->
      <v-btn
        class="pl-btn ml-auto"
        prepend-icon="pl-icon20 run"
        color="#4f62cd"
        oulined
        @click="dialogSetai = true"
        variant="tonal">
        <span class="normal-case">Send Request</span>
      </v-btn>
    </div>
  </div>

  <!-- dialog -->
  <v-dialog v-model="dialogSetai" width="auto">
    <ResponseaiDialog
      titleProp = 'Send Request'
      typeProp="api"
      @close="dialogSetai = false"
      @save="saveChatbotDialg()" />
  </v-dialog>


</template>

<style scoped>

</style>