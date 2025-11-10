import { onMounted, onUnmounted, unref, watchEffect } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

export function useMessage(target, message) {
  unref(target).innerHTML = message;
}

export function useGetImageUrl(iconNm) {
  return new URL(`/${iconNm}`, import.meta.url.split('://')[0]+'://'+import.meta.url.split('://')[1]).href;
}

export function useSomething(arg) {
	function doSomething() {
		// arg를 이용한 복잡한 코드
	}
	
	if (isRef(arg)) {
		watchEffect(doSomething);
	} else {
		doSomething();
	}
}