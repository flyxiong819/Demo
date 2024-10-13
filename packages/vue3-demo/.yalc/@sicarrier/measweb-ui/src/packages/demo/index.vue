<template>
  <div ref="refDemo">
    {{ info }}
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue-demi';

export default defineComponent({
  setup() {
    const refDemo = ref<HTMLElement>();
    const info = ref('');

    onMounted(() => {
      setTimeout(() => {
        info.value = '@sicarrier/measweb-ui: Hello World';
      }, 3000);
      setTimeout(() => {
        info.value = refDemo.value;
      }, 5000);
    });

    return {
      refDemo,
      info,
    }
  },
});
</script>

<style>
@import url('../../styles/common.less');

</style>
