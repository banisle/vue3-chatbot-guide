import { ref } from 'vue'
import { useEventListener } from "./common";

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // Composable 사용!(common.js)
  useEventListener(window, "mousemove", update);

	// 유일하게 다른 점	
  return { x, y }
}