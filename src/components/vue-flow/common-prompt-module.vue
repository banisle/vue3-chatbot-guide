<script lang="ts" setup>
import { ref } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ChevronsUpDownIcon, AlertCircleIcon } from 'lucide-vue-next'
import { Textarea } from '@/components/ui/textarea'

const isOpen = ref(false)
const data = ref('')
</script>

<template>
  <div class="rounded-md bg-muted px-3 py-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>프롬프트</p>
            <tooltip-provider>
              <tooltip>
                <tooltip-trigger>
                  <alert-circle-icon class="h-3 w-3 text-muted-foreground" />
                </tooltip-trigger>
                <tooltip-content>
                  <p class="max-w-60" v-pre>
                    대형 모델의 프롬프트 단어를 입력하여 해당 기능을 구현합니다. 입력 매개변수에서 변수를 도입하려면
                    {{ 변수 이름 }} 메서드를 사용하여 입력 매개변수에서 변수를 도입할 수 있습니다.
                  </p>
                </tooltip-content>
              </tooltip>
            </tooltip-provider>
          </div>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <Textarea
          placeholder="{{ 변수 이름 }} 메서드를 사용하여 입력 매개변수에서 변수를 도입할 수 있습니다."
          v-model="data"
        />
      </collapsible-content>
    </Collapsible>
  </div>
</template>
