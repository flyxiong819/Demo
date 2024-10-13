<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isKeepAlive" />
    </keep-alive>
    <router-view v-if="!isKeepAlive" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
  },
})
export default class App extends Vue {

  private get isKeepAlive() {
    return this.$route.meta && this.$route.meta.keepAlive;
  }

  private async created() {
  }
  private mounted() {
  }
}
</script>

<style lang="less">
#app {
  min-height: 100%;
}

/** 业务内容动态使用的class */
.custom-dialog_btnColor {
  color: #FA5151!important;
}
</style>
