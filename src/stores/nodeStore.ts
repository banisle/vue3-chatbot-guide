
//@ts-nocheck
import KnowledgeNode from '@/components/vue-flow/nodes/knowledge-node.vue';
import { defineStore } from 'pinia'
import { ref } from 'vue'

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.

export const makeNodeStore = defineStore('makeNode', () => {
  const makeNodeId = ref<number>(1);
  const addBlockList = ref([
    {
      icon: 'block-responseai',
      title: 'Response AI',
      type: 'blockResponseai'
    },
    {
      icon: 'block-setai',
      title: 'Set AI',
      type: 'blockSetai'
    },
    {
      icon: 'block-text',
      title: '텍스트',
      type: 'blockText',
      class: 'border-t'
    },
    {
      icon: 'block-img',
      title: '이미지',
      type: 'blockImg'
    },
    {
      icon: 'block-card',
      title: '카드',
      type: 'blockCard'
    },
    {
      icon: 'block-carousel',
      title: '캐러셀',
      type: 'blockCarouselGroup'
    },
    {
      icon: 'block-path',
      title: '경로 선택',
      type: 'blockIntentGroup',
      class: 'border-t'
    },
    {
      icon: 'block-capture',
      title: '사용자 응답 캡처',
      type: 'blockCapture',
    },
    {
      icon: 'block-condition',
      title: '조건',
      type: 'blockConditionGroup',
      class: 'border-t'
    },
    {
      icon: 'block-variable',
      title: '변수 설정',
      type: 'blockVariable'
    },
    {
      icon: 'block-end',
      title: '종료',
      type: 'blockEnd'
    },
    {
      icon: 'block-api',
      title: 'API',
      type: 'blockApi',
      class: 'border-t'
    },
    {
      icon: 'block-js',
      title: 'Java Script',
      type: 'blockJs',
    },
  ])

  function makeNode(type: string) {
    let nodeData = []
    switch (type) {
      case 'blockText':
        console.log('blockText');
        nodeData = {
          'index':0
          ,shortcut:true
          ,addAction:true
          ,discrepancy:{
            toggle:true
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,btn:true
          ,data:[
            {
              type: 'blockText'
              , icon: 'block-text'
              , addbtn:true
              , msg: ''
              , title:'텍스트'
              , macro:true
              , emoji:true
            }
          ]
        }
        break;
      case 'btnGroup':
        console.log('btnGroup');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'btnGroup'
            , addbtn:true
            , title:'버튼'
            , 'btnGroupId':'0'
            , 'btn':[
              {
                'type':'btn'
                , 'title':'0'
                , 'action':[]
                , 'data':''
                , 'id':'0'
                , 'strg':false
              }
            ]
        }]}
        break;
      case 'shortcut':
        console.log('shortcut');
        nodeData = {
          type: 'shortcut'
          , addbtn:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          , title:'바로가기'
          , 'btnGroupId':'0'
          , 'btn':[]
        }
        break;
      case 'blockImg':
        console.log('blockImg');
        nodeData = {
          'index':0
          ,shortcut:true
          ,addAction:true
          ,discrepancy:{
            toggle:true
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockImg'
            , icon: 'block-img'
            , addbtn:true
            , img: ''
            , title:'이미지'
          }]
        }
        break;
      case 'blockCard':
        console.log('card');
        nodeData = {
          'index':0
          ,shortcut:true
          ,addAction:true
          ,discrepancy:{
            toggle:true
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockCard'
            , icon: 'block-card'
            , addbtn:true
            , title:'카드'
            , img: ''
            , msg:''
            , macro:true
            , emoji:true
          }]
        }
        break;
      case 'blockCarouselGroup':
        console.log('carousel');
        nodeData = {
          'index':0
          ,shortcut:true
          ,addAction:true
          ,discrepancy:{
            toggle:true
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockCarouselGroup'
            , icon: 'block-carousel'
            , title:'캐러셀'
            , data: [
              {
                type: 'blockCarousel'
                , addbtn:true
                , img: ''
                , title:''
                , msg:''
                , btnGroupId:''
                , btn:[]
                , macro:true
                , emoji:true
              }
            ]
          }]
        }
        break;
      case 'blockIntentGroup':
        console.log('intent');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockIntentGroup'
            , icon: 'block-Intent'
            , addbtn:false
            , title:'경로 선택'
            , 'intent':[]
            , 'action':[]
            , macro:true
            , emoji:false
          }]
        }
        break;
      case 'blockConditionGroup':
        console.log('condition');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockConditionGroup'
            , icon: 'block-Condition'
            , addbtn:false
            , title:'조건'
            , 'if':[]
            , 'action':[]
            , macro:true
            , emoji:false
          }]
        }
        break;
      case 'blockResponseai':
        console.log('ai');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockResponseai'
            , icon: 'block-responseai'
            , addbtn:false
            , title:'Response AI'
            , source:'ai'
            , prompt:''
            , promptString:''
            , temperature:'0.7'
            , maxTokens:'128'
            , system:''
            , knowledgeCatalog:''
            , question: ''
            , instructions: ''
            , notFoundPathToggle: true
            , overridePromptSetToggle: false
            , macro:true
            , emoji:false
          }]
        }
        break;
      case 'blockSetai':
        console.log('ai');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockSetai'
            , icon: 'block-responseai'
            , addbtn:false
            , title:'set AI'
            , source:''
            , prompt:''
            , promptSetting:''
            , temperature:'0.7'
            , maxTokens:'128'
            , system:''
            , macro:true
            , emoji:false
          }]
        }
        break;
      case 'blockApi':
        console.log('api');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[{
            type: 'blockApi'
            , icon: 'block-api'
            , addbtn:false
            , title:'blockApi'
            , url:''
            , method:'GET'
            , header:[]
            , parameters:[]
            , body:[]
            , response:[{value:'Apply TO Select {Variable}'}]
            , macro:true
            , emoji:false
          }]
        }
        break;
        case 'blockCapture':
          console.log('capture');
          nodeData = {
            'index':0
            ,shortcut:false
            ,addAction:false
            ,discrepancy:{
              toggle:true
              ,value:false
              ,msg:['']
              ,num:1
              ,action:[]
            }
            ,data:[{
              type: 'blockCapture'
              , icon: 'block-capture'
              , addbtn:false
              , title:'blockCapture'
              , userRes:'Entire user reply'
              , userResVal:'캡처한 응답을 담을 변수를 선택하십시오.'
              , prompt:[]
              , num:1
              , action:[]
              , macro:false
              , emoji:false
            }]
          }
          break;
        case 'blockEnd':
          console.log('capture');
          nodeData = {
            'index':0
            ,shortcut:false
            ,addAction:false
            ,discrepancy:{
              toggle:false
              ,value:false
              ,msg:['']
              ,num:1
              ,action:[]
            }
            ,btn:false
            ,data:[
              {
                type: 'blockEnd'
                , icon: 'block-end'
                , addbtn:false
                , msg: ''
                , title:'End Block'
                , macro:false
                , emoji:false
              }
            ]
          }
          break;
      case 'action':
        console.log('action');
        nodeData = {
          'index':0
          ,shortcut:false
          ,addAction:true
          ,discrepancy:{
            toggle:false
            ,value:false
            ,msg:['']
            ,num:1
            ,action:[]
          }
          ,data:[
            {
              type: 'action'
              , icon: 'block-action'
              , msg: ''
              , title:'액션'
              , macro:true
              , emoji:true
            }
          ]
        }
        break;
      default:
        console.log(type);
        nodeData = {
          'index':0
          ,data:[{
            'type': type
            , data: ''
            , title:''
        }]}
        break;
    }
    return nodeData;
  }

  return { makeNodeId, addBlockList, makeNode }
})

