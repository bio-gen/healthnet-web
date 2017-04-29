<template>
  <div id="app">
    <top></top>
    <main>
      <router-view></router-view>
    </main>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from '@/components/Top'
import Bottom from '@/components/Bottom'
export default {
  name: 'app',
  components: {
    Top, Bottom
  }
}
</script>

<style>
main {
  margin-top: 100px;
  margin-bottom: 40px;
}

.btn.btn-primary {
  width: 70px;
}

</style>
