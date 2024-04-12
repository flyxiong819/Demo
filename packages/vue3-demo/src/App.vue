
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <MyComp @click="abc"></MyComp>
    <HelloWorld msg="Vue 3 + TypeScript + Vite" title="zenchen" />
    <NoSetup>
      <div class="" style="color: red;">test</div>
      <template #test>
        <div>传入具名插槽</div>
      </template>
      <div style="color: blue;">传入default插槽</div>
    </NoSetup>
    <Vmodel></Vmodel>
    <Attrs  
      class="tclass"
      style="color: red;"
      @click="console.log('father click')"
      @tt="console.log('father tt')"></Attrs>

    <Vslot>
      <div>test default1</div>
      <template #header>
        <div class="">test header</div>
      </template>
      <div>test default2</div>
      <template #footer>
        <div>test footer</div>
      </template>
      <div>test default3</div>
    </Vslot>
  </div>
</template>

<script lang="ts">

import { reactive, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import MyComp from './components/my-comp';
import NoSetup from './components/no-setup.vue';
import Vmodel from './components/vmodel.vue';
import Attrs from './components/attrs.vue';
import Vslot from './components/vslot.vue';

export default {
  components: {
    HelloWorld,
    NoSetup,
    MyComp,
    Vmodel,
    Attrs,
    Vslot,
  },
  setup() {
    const abc = () => {
      alert('组件上绑定click事件，不需要加.native也可以触发原生事件。（vue3没有.native修饰符了）');
    }
    const insetup = ref(2);
    console.log('insetup', insetup);
    // @ts-ignore
    console.log('insetup', insetup.value);
    return {
      abc,
      insetup,
    }
  },
  mounted() {
    // @ts-ignore
    console.log('zenchen', this.insetup);
    // @ts-ignore
    console.log('zenchen', this.insetup.value);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
