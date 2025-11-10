<script lang="ts" setup>
import { PropType, ref, watchEffect } from 'vue'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNode, useVueFlow } from '@vue-flow/core'

type InputItem = {
  name: string
  type: 'reference' | 'input'
  value: string
}

type Option = {
  groupName: string
  options: {
    label: string
    value: string
  }[]
}

const props = defineProps({
  staticNameKey: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: ''
  }
})

const isOpen = ref(true)
const data = ref<InputItem[]>([])
watchEffect(() => {
  if (props.staticNameKey) {
    if (typeof props.staticNameKey === 'string') {
      data.value.push({
        name: props.staticNameKey,
        type: 'reference',
        value: ''
      })
    } else {
      props.staticNameKey.forEach((key) => {
        data.value.push({
          name: key,
          type: 'reference',
          value: ''
        })
      })
    }
  }
})

const referenceOptions = ref<Option[]>([])

const node = useNode()
const { findNode } = useVueFlow()
watchEffect(() => {
  if (node.connectedEdges && node.connectedEdges.value.length > 0) {
    const filteredEdges = node.connectedEdges.value.filter((item) => item.target === node.id)
    referenceOptions.value = filteredEdges.map((edge) => {
      const node = findNode(edge.source)
      const currentItem: Option = {
        groupName: node?.data.title ?? node?.label,
        options: []
      }

      if (node?.data.output) {
        node?.data.output
          .filter((item: any) => Boolean(item.name))
          .forEach((option: any) => {
            currentItem.options.push({
              label: option.name,
              value: option.name
            })
          })
      } else {
        currentItem.options = []
      }
      return currentItem
    })
  }
})

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.push({ name: '', type: 'reference', value: '' })
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.splice(index, 1)
}
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>입력 폼</p>
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
            <plus-icon
              class="h-4 w-4 cursor-pointer text-primary"
              @click="handleOnClickAddBtnInInput"
              v-if="!staticNameKey"
            />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <div class="flex gap-x-4">
          <Label class="w-3/12 text-sm text-muted-foreground">이름</Label>
          <Label class="w-3/12 text-sm text-muted-foreground">타입</Label>
          <Label class="w-6/12 text-sm text-muted-foreground">값</Label>
        </div>
        <div class="flex gap-x-4" v-for="(item, index) in data" :key="index">
          <div class="w-3/12">
            <p v-if="staticNameKey">{{ item.name }}</p>
            <Input v-model="item.name" placeholder="이름을 입력하세요" v-else />
          </div>
          <div class="w-3/12">
            <Select v-model="item.type">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="타입을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="reference"> 참조 </SelectItem>
                  <SelectItem value="input"> 입력 폼</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-6/12 cursor-pointer items-center gap-x-2">
            <Select v-if="item.type === 'reference'" v-model="item.value">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="(group, index) in referenceOptions" :key="index" v-if="referenceOptions.length > 0">
                  <SelectLabel>{{ group.groupName }}</SelectLabel>
                  <SelectItem v-for="option in group.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
                <p class="px-2 text-muted-foreground" v-else>no items</p>
              </SelectContent>
            </Select>
            <Input v-model="item.value" placeholder="값을 입력하세요" v-else />
            <minus-circle-icon
              class="h-4 w-4"
              @click="() => handleClickDeleteBtnInInput(index)"
              v-if="!staticNameKey"
            />
          </div>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
