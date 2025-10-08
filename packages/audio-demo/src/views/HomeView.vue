<template>
  <main>

    <canvas ref="refCanvas" class="visualizer" height="60px" width="856"></canvas>
    <button @click="handleStart">开始录音</button>

    <button @click="handleStop">停止录音</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MyAudio } from '@/utils/audio';

const myaudio = new MyAudio();

const refCanvas = ref<HTMLCanvasElement|null>(null);

function handleStart() {
  myaudio.startAudio(refCanvas.value).then(() => {
    console.log('click start audio')
  });
}

function handleStop() {
  myaudio.stopAudio().then((file) => {
    console.log('click stop audio')
    console.log(file)
  });
}

</script>

<style scoped>
.visualizer {
  border: 1px solid #eee;
  display: block;
}
</style>
