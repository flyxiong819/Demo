<template>
  <div>
    <div class="header">header</div>
    <slot name="header"></slot>

    <div class="classbd">body</div>
    <slot></slot>

    <div class="footer">footer</div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">

</script>
