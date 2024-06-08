<template>
  <div class="yourcss">
    no setup <br>
    <div>
      具名slot1: 
      <slot name="test" />
    </div>
    <span>
      默认slot1:<br>
      <slot />
    </span>
    <span>
      默认slot2: <br>
      <slot />
    </span>
    <div>
      具名slot2: 
      <slot name="test" />
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
