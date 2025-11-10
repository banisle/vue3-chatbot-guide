<script lang="ts" setup>
//@ts-nocheck
import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSmoothStepPath, useVueFlow, useEdge  } from '@vue-flow/core'
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
})


const { removeEdges , onPaneClick, onNodeClick, onEdgeClick} = useVueFlow()

// 엣지 곡선 타입 변경
// const path = computed(() => getBezierPath(props))
const path = computed(() => getSmoothStepPath(props))

// 엣지버튼 show
const clickEdge = ref<string>('')

onEdgeClick(({ edge }) => {
  clickEdge.value = edge.id
});
onPaneClick(() => {
  clickEdge.value = null
})
onNodeClick(({ node }) => {
  clickEdge.value = null
});

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge
    :id="id"
    :style="style"
    :path="path[0]"
    :marker-end="markerEnd" />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <button
        v-if="clickEdge === id"
        class="edgebutton"
        @click="removeEdges(id)"
        ><X size="20" color="#000"/></button>
    </div>
  </EdgeLabelRenderer>
</template>
