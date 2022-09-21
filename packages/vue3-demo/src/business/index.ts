import { computed, unref, Ref } from "vue";


export function useAdd(a: Ref<number> | number, b: Ref<number> | number): Ref<number> {
  return computed(() => unref(a) + unref(b));
}
