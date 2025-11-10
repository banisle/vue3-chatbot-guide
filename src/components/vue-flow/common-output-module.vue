<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useNode } from '@vue-flow/core'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Output = {
  name: string
  type: string
  description: string
}

const props = defineProps({
  data: {
    type: Object as PropType<Output[]>,
    default: () => []
  }
})

const typesOptions = [
  {
    value: 'String',
    label: 'String'
  },
  {
    value: 'Integer',
    label: 'Integer'
  },
  {
    value: 'Boolean',
    label: 'Boolean'
  },
  {
    value: 'Number',
    label: 'Number'
  },
  {
    value: 'Object',
    label: 'Object'
  },
  {
    value: 'Array<String>',
    label: 'Array<String>'
  },
  {
    value: 'Array<Integer>',
    label: 'Array<Integer>'
  },
  {
    value: 'Array<Boolean>',
    label: 'Array<Boolean>'
  },
  {
    value: 'Array<Number>',
    label: 'Array<Number>'
  },
  {
    value: 'Array<Object>',
    label: 'Array<Object>,'
  }
]

const node = useNode()

const isOpen = ref(false)
const data = ref<Output[]>(props.data)
if (props.data.length !== 0) {
  isOpen.value = true
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.push({ name: '', type: '', description: '' })
  node.node.data = {
    ...node.node.data,
    output: data
  }
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.splice(index, 1)
  node.node.data = {
    ...node.node.data,
    output: data
  }
}
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>출력</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    프롬프트 단어에 추가해야 하는 정보를 입력하며, 프롬프트 단어에서 참조할 수 있는
                    프롬프트 단어로 참조할 수 있는 정보를 입력합니다.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Button variant="ghost">
            <plus-icon class="h-4 w-4 cursor-pointer text-primary" @click="handleOnClickAddBtnInInput" />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <div class="flex gap-x-4">
          <Label class="w-4/12 text-sm text-muted-foreground">이름</Label>
          <Label class="w-2/12 text-sm text-muted-foreground">타입</Label>
          <Label class="w-6/12 text-sm text-muted-foreground">설명</Label>
        </div>
        <div class="flex gap-x-4" v-for="(item, index) in data" :key="index">
          <div class="w-3/12">
            <Input v-model="item.name" placeholder="Enter name" />
          </div>
          <div class="w-3/12">
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="타입을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="option in typesOptions" :value="option.value" :key="option.value">
                    {{ option?.label }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-6/12 cursor-pointer items-center gap-x-2">
            <Input v-model="item.description" placeholder="변수의 용도를 설명하세요." />
            <minus-circle-icon class="h-4 w-4 text-primary" @click="() => handleClickDeleteBtnInInput(index)" />
          </div>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
