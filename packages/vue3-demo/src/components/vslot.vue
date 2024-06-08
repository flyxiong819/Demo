<template>
  <div>
    <div class="header">
      header
    </div>
    <slot name="header" />

    <div class="classbd">
      body
    </div>
    <slot />

    <div class="footer">
      footer
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">

</script>
