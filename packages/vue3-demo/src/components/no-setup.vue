<template>
  <div class="yourcss">
    no setup <br />
    <div>
      具名slot1: 
      <slot name="test"></slot>
    </div>
    <span>
      默认slot1:<br />
      <slot></slot>
    </span>
    <span>
      默认slot2: <br />
      <slot></slot>
    </span>
    <div>
      具名slot2: 
      <slot name="test"></slot>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  
}
</script>

<style>

.yourcss {

}
</style>
