<script setup lang="ts">
import { reactive, ref, computed, watchEffect, watch, onMounted } from 'vue';
import { useLocalStorage, useMouse, usePreferredDark, debounceFilter } from '@vueuse/core';

const props = defineProps(['title']);

onMounted(() => {
  console.log('zenchen first mounted');
});
onMounted(() => {
  console.log('zenchen second mounted');
});

// tracks mouse position
const { x, y } = useMouse({
  eventFilter: debounceFilter(100)
})

// is user prefers dark theme
const isDark = usePreferredDark()

// persist state in localStorage
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)

console.log('def', props.title);
const nested = {
    count: ref(1),
};

const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
}, {
  onTrigger() {
    debugger;
    console.log('zenchen on trigger');
  },
  onTrack() {
    console.log('zenchen on track');
  }
})

watchEffect(() => {
  console.log('zenchen', nested.count.value + count.value);
})

const numbers = reactive([1, 2, 3, 4])
console.log('zenchen', numbers);

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers)
  }
)

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
</script>

<template>
  <div>
    <span>my title: {{ title }}/{{ props.title }}. my count:{{ count }}</span>
    <br />
    <span>{{nested.count.value}}</span>
    <br />
    <button @click="count ++">Increment count</button>
    <button @click="nested.count.value ++">Nested Increment count</button>
    <br />
    <div>(x,y)=({{x}},{{y}})</div>
    <div>isDark: {{ isDark }}</div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
