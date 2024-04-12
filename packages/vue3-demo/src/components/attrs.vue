<template>
  <div class="cattrs" @click="onClick">测试attrs透传</div>
  <div class="multi">多根节点</div>
</template>

<script setup lang="ts">

async function onClick() {
  fetch('https://st.moneydata.hk/wuji/config/hongbao_cover/cover_paycenter_debug.json')
    .then((res) => res.json())
    .then((json) => console.log('zenchen 2222', json))
    .catch((err) => {
      console.log('fail err', err);
    }).finally(() => {
      console.log('zenchen finally')
    })
}
</script>
