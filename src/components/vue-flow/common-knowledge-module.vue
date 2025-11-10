<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDownIcon, PlusIcon, AlertCircleIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

type KnowledgeItem = {
  knowledgeId: string
}

const isOpen = ref(true)
const data = ref<{
  relatedKnowledgeArray: KnowledgeItem[]
  maxRecalls: number[]
  minMatchingDegree: number[]
}>({
  relatedKnowledgeArray: [{ knowledgeId: '' }],
  maxRecalls: [3],
  minMatchingDegree: [0.4]
})

const knowledgeOptions = ref([
  {
    label: 'knowledge-base1',
    value: 'knowledge-base1Id1'
  },
  {
    label: 'knowledge-base2',
    value: 'knowledge-base1Id2'
  }
])

function handleOnClickAddBtnInInput(e: Event) {
  e.stopPropagation()
  isOpen.value = true
  data.value.relatedKnowledgeArray.push({
    knowledgeId: ''
  })
}

function handleClickDeleteBtnInInput(index: number) {
  data.value.relatedKnowledgeArray.splice(index, 1)
}
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>지식</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    일치시켜야 하는 지식의 범위를 선택하고, 선택한 지식에서만 정보를 불러올 수 있습니다.
                    선택된 지식
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
        <div
          class="flex w-full cursor-pointer items-center gap-x-2"
          v-for="(item, index) in data.relatedKnowledgeArray"
          :key="index"
        >
          <Select v-model="item.knowledgeId">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="지식 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="(item, index) in knowledgeOptions" :key="index" v-if="knowledgeOptions.length > 0">
                <SelectItem :key="item.value" :value="item.value">
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
              <p class="px-2 text-muted-foreground" v-else>no items</p>
            </SelectContent>
          </Select>
          <minus-circle-icon class="h-4 w-4" @click="() => handleClickDeleteBtnInInput(index)" />
        </div>
        <div class="flex gap-x-8">
          <div class="flex w-52 items-center gap-x-1">
            <p class="text-nowrap text-sm text-muted-foreground">최대 리콜 횟수</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    지식에서 모델에 반환되는 최대 단락 수입니다. 숫자가 클수록 더 많은 콘텐츠가 반환됩니다.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Slider v-model="data.maxRecalls" :max="10" :min="1" :step="1" />
          <p class="w-8">
            {{ data.maxRecalls?.[0] }}
          </p>
        </div>
        <div class="flex gap-x-8">
          <div class="flex w-52 items-center gap-x-1">
            <p class="text-nowrap text-sm text-muted-foreground">최소 매칭 정도</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60">
                    설정된 일치 정도에 따라 단락을 선택하고 모델에 반환합니다. 일치도가 낮은 콘텐츠는
                    일치도가 낮은 콘텐츠는 세트가 리콜되지 않습니다.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
          <Slider v-model="data.minMatchingDegree" :max="0.99" :min="0.01" :step="0.1" />
          <p class="w-8">
            {{ data.minMatchingDegree?.[0] }}
          </p>
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
