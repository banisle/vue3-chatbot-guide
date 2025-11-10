<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue'
import ContentTopLayout from '@/components/contentTopLayout.vue'
import { object } from 'zod';

const filterList = ref([
  { title: '전체' },
  { title: '활성' },
  { title: '비활성' },
])
// 채널 리스트
const channelList = ref([
  {
    selected: false,
    active: true,
    channelName: '챗봇(T-Talk)',
    icon: 'share-teletalk',
    desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오.'
  },
  { selected: false, active: true, channelName: '카카오톡', icon: 'share-kakaotalk', desc: 'Palette 챗봇을 카카오의 고객 상담 채널인 카카오톡과 연결하여 고객의 질문에 자동으로 답변할 수 있습니다.', subdesc: 'Palette 챗봇을 네이버의 고객 상담 채널인 네이버 톡톡과 연결하여 고객의 질문에 자동으로 답변할 수 있습니다.' },
  { selected: false, active: true, channelName: 'WhatsApp', icon: 'share-whatsapp', desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오.' },
  { selected: false, active: false, channelName: '페이스북 메신저', icon: 'share-facebook', desc: '페이스북과 에이전트를 연동하여 메신저 사용자에게 자동으로 답변하십시오.' },
  { selected: false, active: true, channelName: '네이버 톡톡', icon: 'share-ntalk', desc: '네이버 톡톡과 에이전트를 연동하여 고객에게 자동으로 답변하여 업무 효율성을 높이세요', subdesc: 'Palette 챗봇을 네이버의 고객 상담 채널인 네이버 톡톡과 연결하여 고객의 질문에 자동으로 답변할 수 있습니다.' },
  { selected: false, active: true, channelName: '콜봇', icon: 'share-callbot', desc: '대표 전화번호를 이용한 실시간 음성 대화하기 가능한 STT/TTS기능을 활용해보세요' },
  { selected: false, active: false, channelName: '보이스봇', icon: 'share-voicebot', desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오' },
  { selected: false, active: true, channelName: '네이버 톡톡', icon: 'share-ntalk', desc: '네이버 톡톡과 에이전트를 연동하여 고객에게 자동으로 답변하여 업무 효율성을 높이세요' },
  { selected: false, active: true, channelName: 'WhatsApp', icon: 'share-whatsapp', desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오.' },
  { selected: false, active: false, channelName: '페이스북 메신저', icon: 'share-facebook', desc: '페이스북과 에이전트를 연동하여 메신저 사용자에게 자동으로 답변하십시오.' },
  { selected: false, active: true, channelName: '라인', icon: 'share-line', desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오' },
  { selected: false, active: true, channelName: '콜봇', icon: 'share-callbot', desc: '대표 전화번호를 이용한 실시간 음성 대화하기 가능한 STT/TTS기능을 활용해보세요' },
  { selected: false, active: false, channelName: '보이스봇', icon: 'share-voicebot', desc: '실시간으로 대화할 수 있는 채팅창을 웹사이트에 설정하십시오' },
])
const selectedChannelData = ref<object>(null)
const selectChannel = (item) => {
  removeChannelSelected()
  item.selected = true
  selectedChannelData.value = item
}
const removeChannelSelected = () => {
  for (let index = 0; index < channelList.value.length; index++) {
    channelList.value[index].selected = false
  }
}
const sttServiceInput = ref<boolean>(false)
const ttsServiceInput = ref<boolean>(false)

</script>
<template>
  <!-- header -->
  <ContentTopLayout>
    <template v-slot:header>
      <div class="flex  gap-x-2 ml-auto">
        <v-text-field
          append-inner-icon="pl-icon20 in-search"
          density="compact"
          variant="outlined"
          rounded
          min-width="180px"
          hide-details
          single-line
          clearable
          clear-icon="pl-icon20 in-close"
          class="w-60 pl-form"
          placeholder="검색어 입력"
          @click:append-inner=""
        ></v-text-field>
        <v-btn
          class="pl-btn"
          prepend-icon="pl-icon20 add-white"
          color="#4f62cd"
          @click="createChatbot"
          variant="flat">
          연동채널 생성
        </v-btn>
      </div>
    </template>
  </ContentTopLayout>
  <!-- 채널 연동 -->
  <div class="flex h-full">
    <!-- 리스트 -->
    <div class="flex flex-column flex-[0_0_500px] border-r">
      <!-- 상단 -->
      <div class="flex align-center px-4 h-[50px]">
        <span class="text-[14px] font-bold">연결 가능한 채널 (7)</span>
        <div class="ml-auto flex gap-1 align-center">
          <v-tooltip text="필터" location="bottom">
            <template v-slot:activator="{ props: tooltip }">
              <v-menu
                class="dropUi"
                location="bottom">
                <template v-slot:activator="{ props: menu }">
                  <v-btn
                    v-bind="{ ...tooltip, ...menu }"
                    min-width="24px"
                    icon
                    size="small"
                    variant="text"
                    >
                    <v-icon class="pl-icon20 type-filter"></v-icon>
                  </v-btn>
                </template>
                <v-list width="200px">
                  <v-list-item
                    v-for="(item, i) in filterList"
                    :key="i"
                  >
                    <div
                      class="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
                      @click=""
                      >
                      <span class="font-normal text-sm normal-case pl-2">{{ item.title }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-tooltip>
          <v-tooltip text="새로고침" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                class="ml-auto"
                v-bind="props"
                variant="text"
                icon
                size="small"
                >
                <v-icon class="pl-icon20 refresh"></v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </div>
      <!-- 리스트 -->
      <div class="flex flex-column border-t pl-scrollable h-[calc(100vh-150px)]">
        <div
          :class="`flex p-4 border-b hover:bg-gray-100 cursor-pointer ${ item.selected ? 'bg-gray-100' :'' }`"
          v-for="item in channelList"
          @click="selectChannel(item)"
          :key="item.id">
          <v-icon
            style="width: 30px !important; height: 30px !important"
            :class="`flex-[0_0_40px] pl-icon20 ${ item.icon } `"></v-icon>
          <div class="flex flex-1 flex-column ml-2">
            <div class="font-bold">{{ item.channelName }}</div>
            <div>{{ item.desc }}</div>
          </div>
          <div class="ml-2 flex-[0_0_50px]">
            <v-switch
              class="pl-switch"
              inset
              color="#4f62cd"
              hide-details
              v-model="item.active"></v-switch>
          </div>
        </div>
      </div>
    </div>

    <!-- 컨텐츠 -->
    <div v-if="selectedChannelData"
      class="flex flex-column flex-1 h-full ">
      <div class="p-4 pl-6 pl-scrollable h-[calc(100vh-165px)]">
        <div class="flex flex-column" >
          <div class="flex flex-1 ml-2">
            <v-icon
              :class="`flex-[0_0_20px] mt-1 pl-icon20 ${ selectedChannelData.icon }`"></v-icon>
            <div class="ml-2 font-bold text-[16px]">
              {{ selectedChannelData.channelName }} 연동 설정
            </div>
          </div>
          <div class="mt-2 ">{{ selectedChannelData.subdesc }}</div>
        </div>
        <!-- 카카오톡 -->
        <template v-if="selectedChannelData.channelName === '카카오톡'">
          <div class="mt-4 flex flex-column p-4 border rounded-lg bg-gray-100">
            <div class="flex">
              <v-icon class="pl-icon-etc docu-info"></v-icon>
              <div class="ml-2 flex-1">
                <p class="ml-1">카카오 톡톡과 Palette 챗봇을 연결하려면 아래 세 가지가 필요합니다.</p>
                <ul class="pl-list-dot is-no-border">
                  <li>카카오 챗봇용 파트너 계정</li>
                  <li>에이전트를 추가할 웹훅 URL</li>
                  <li>Authorization Token</li>
                </ul>
              </div>
              <div>
                <v-btn
                  class="pl-btn"
                  size="small"
                  color="#333"
                  variant="flat"
                  >
                  카카오 톡톡 계정 생성 알아보기</v-btn>
              </div>
            </div>
            <div class="flex border-t mt-2 pt-2 ">
              <v-icon class="pl-icon20 caution"></v-icon>
              <p class="ml-2">위 세 가지가 아직 준비되어 있지 않으셨으면, <strong>카카오톡 계정 생성 단계를 먼저 진행</strong>하신 후 연동 설정을 해주십시오.</p>
            </div>
          </div>
          <!-- form -->
          <div class="flex flex-1 flex-col gap-y-4 py-4">
            <div class="w-[700px]">
              <label class="pl-label" for="">
                Webhook URL
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class="pl-form"
                density="compact"
                variant="outlined"
                hide-details
                placeholder="웹훅 URL을 입력하세요."
                ></v-text-field>
            </div>
            <div class="w-[700px]">
              <label class="pl-label" for="">
                Authorization Token
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class=" pl-form"
                density="compact"
                variant="outlined"
                hide-details
                placeholder="연동 토큰을 입력하세요."
                ></v-text-field>
            </div>
            <div class="w-[700px]">
              <label class="pl-label" for="">
                Channel IDL
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class=" pl-form"
                density="compact"
                variant="outlined"
                hide-details
                placeholder="비즈니스 채널ID를 입력하세요."
                ></v-text-field>
            </div>
          </div>
        </template>
        <template v-if="selectedChannelData.channelName === '콜봇'">
          <div class="mt-4 flex flex-column p-4 border rounded-lg bg-gray-100">
            <div class="flex">
              <v-icon class="pl-icon-etc docu-info"></v-icon>
              <div class="ml-2 flex-1">
                <p class="ml-1">대표 전화번호를 이용한 실시간 음성 대화하기 가능한 STT/TTS 기능을 활용해보세요.</p>
                <ul class="pl-list-dot is-no-border">
                  <li class="flex w-[250px]">총 라이선스 수 <strong class="ml-auto">50</strong></li>
                  <li class="flex w-[250px]">사용중인 라이선스 수 <strong class="ml-auto">35</strong></li>
                  <li class="flex w-[250px]">사용 가능한 라이선스 <strong class="ml-auto">15</strong></li>
                </ul>
              </div>
            </div>
            <div class="flex border-t mt-2 pt-2 ">
              <v-icon class="pl-icon20 caution"></v-icon>
              <p class="ml-2"><strong>콜봇</strong> 연결 설정은 콜센터 정보가 필요합니다. 관리자에게 문의 후 설정하여 주십시오.</p>
            </div>
          </div>
          <!-- form -->
          <div class="flex flex-1 flex-col gap-y-4 py-4">
            <div class="w-[700px]">
              <label class="pl-label" for="">
                IP PBX 주소
                <v-badge color="red" dot inline></v-badge>
              </label>
              <div class="flex align-center">
                <v-text-field
                  class="pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="IP-PBX 주소를 입력하세요."
                  ></v-text-field>
                <v-btn
                  class="ml-2"
                  max-width="30px"
                  max-height="30px"
                  icon
                  size="small"
                  variant="flat"
                  color="transparent"
                  @click="limitedList.push('')"
                  >
                  <span class="text-[18px]">+</span>
                </v-btn>
              </div>
            </div>
            <div class="w-[700px]">
              <label class="pl-label" for="">
                서비스 번호(대표번호)
                <v-badge color="red" dot inline></v-badge>
              </label>
              <div class="flex flex-col gap-y-2">
                <div class="flex align-center">
                  <div class="flex-[0_0_150px]">
                    <v-text-field
                      class="pl-form "
                      density="compact"
                      variant="outlined"
                      hide-details
                      value="1644-1588"
                      ></v-text-field>
                  </div>
                  <v-text-field
                    class=" pl-form ml-2"
                    density="compact"
                    variant="outlined"
                    hide-details
                    placeholder="설명을 입력하세요."
                    ></v-text-field>
                  <v-btn
                    class="ml-2"
                    max-width="30px"
                    max-height="30px"
                    icon
                    size="small"
                    variant="flat"
                    color="transparent"
                    >
                    <span class="text-[18px]">+</span>
                  </v-btn>

                </div>
                <div class="flex align-center">
                  <v-text-field
                    class="pl-form"
                    density="compact"
                    variant="outlined"
                    hide-details
                    value="07057784545@101.106.35.100:31559"
                    ></v-text-field>
                    <v-btn
                      class="ml-2"
                      max-width="30px"
                      max-height="30px"
                      icon
                      size="small"
                      variant="flat"
                      color="transparent"
                      >
                      <v-icon class="pl-icon20 minus-small"></v-icon>
                    </v-btn>
                </div>
                <p >사용중인 IP-PBX에서 콜봇으로 호를 Routing 시에 사용하게 될 Request URI 리스트</p>
              </div>
            </div>
            <div class="w-[700px] border-t py-2">
              <label class="pl-label" for="">
                Default Transfer 정보
              </label>
              <p>예외 상황 발생 시 아래에 등록된 번호로 호 전환이 진행됩니다.</p>
              <div class="mt-2 flex align-center gap-x-2">
                <v-text-field
                  class=" pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="상담원 번호"
                  ></v-text-field>
                <v-select
                  class="pl-form"
                  :items="[]"
                  density="compact"
                  variant="outlined"
                  placeholder="그룹 선택"
                  menu-icon="pl-icon20 arrow-up"
                  hide-details></v-select>
                <v-text-field
                  class=" pl-form"
                  density="compact"
                  variant="outlined"
                  hide-details
                  placeholder="Port"
                  ></v-text-field>
                <v-btn
                  class=""
                  max-width="30px"
                  max-height="30px"
                  icon
                  size="small"
                  variant="flat"
                  color="transparent"
                  >
                  <span class="text-[18px]">+</span>
                </v-btn>

              </div>
            </div>
            <div class="w-[700px] border-t pt-2">
              <label class="pl-label" for="">
                STT 서비스 키
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class="pl-form type-login "
                variant="outlined"
                hide-details
                placeholder="STT 사용을 위해 발급 받은 라이선스 Key를 입력하세요."
                :append-inner-icon="sttServiceInput ? 'pl-icon20 pass-eye' : 'pl-icon20 pass-eye-off'"
                @click:append-inner="sttServiceInput = !sttServiceInput"
                :type="sttServiceInput ? 'text' : 'password'"

              ></v-text-field>
            </div>
            <div class="w-[700px] ">
              <label class="pl-label" for="">
                TTS 서비스 키
                <v-badge color="red" dot inline></v-badge>
              </label>
              <v-text-field
                class="pl-form type-login "
                variant="outlined"
                hide-details
                placeholder="TTS 사용을 위해 발급 받은 라이선스 Key를 입력하세요."
                :append-inner-icon="ttsServiceInput ? 'pl-icon20 pass-eye' : 'pl-icon20 pass-eye-off'"
                @click:append-inner="ttsServiceInput = !ttsServiceInput"
                :type="ttsServiceInput ? 'text' : 'password'"

              ></v-text-field>
            </div>
            <div class="w-[700px] ">
              <label class="pl-label" for="">
                SIP 로깅 헤더
              </label>
              <v-text-field
                class="pl-form "
                density="compact"
                variant="outlined"
                hide-details
                placeholder="User Info"
                ></v-text-field>
            </div>
          </div>
        </template>
      </div>
      <!-- 버튼 -->
      <div class="mt-auto flex justify-end gap-x-2 pa-4 border-t">
        <v-btn
          class="pl-btn "
          color="#4f62cd"
          variant="flat"
          >
          저장</v-btn>
      </div>

    </div>

  </div>

</template>


<style scoped>

</style>