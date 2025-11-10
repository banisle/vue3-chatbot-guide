<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDownIcon, MinusCircleIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export interface Input {
  name: string
  type: string
  description: string
  isRequired: boolean
}

const props = defineProps<{ data: Input }>()
const emit = defineEmits(['click-delete'])

const isOpen = ref(true)
const form = ref(props.data)

function handleClickDeleteBtn() {
  emit('click-delete')
}
</script>

<template>
  <div class="rounded-md bg-muted p-4">
    <Collapsible v-model:open="isOpen">
      <collapsible-trigger as-child>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-x-2">
            <chevrons-up-down-icon class="h-4 w-4 cursor-pointer" />
            <p>{{ form.name }}</p>
          </div>
          <Button variant="ghost">
            <minus-circle-icon class="h-4 w-4 cursor-pointer" @click="handleClickDeleteBtn" />
          </Button>
        </div>
      </collapsible-trigger>
      <collapsible-content class="space-y-3 px-3 py-3">
        <Label> 이름 </Label>
        <Input v-model="form.name" placeholder="Enter name" :maxlength="20" />

        <Label>타입</Label>
        <Select>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="타입을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="String"> String </SelectItem>
              <SelectItem value="Integer"> Integer </SelectItem>
              <SelectItem value="Boolean"> Boolean </SelectItem>
              <SelectItem value="Number"> Number </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>섦여</Label>
        <Textarea placeholder="변수 설명 입력" />

        <div class="flex justify-between">
          <Label> 필수 </Label>
          <Switch :checked="form.isRequired" aria-readonly />
        </div>
      </collapsible-content>
    </Collapsible>
  </div>
</template>
