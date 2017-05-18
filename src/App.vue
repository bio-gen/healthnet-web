<template>
  <div id="app">
    <top></top>
    <main class="container-fluid">
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
  font-family: Candara, "Segoe UI";
  margin-top: 80px;
  margin-bottom: 40px;
}

main a:hover {
  text-decoration: none;
  text-shadow: 2px 2px 1px #D3D3D3;
}

main a:link {
  text-decoration: none;
}

.btn.btn-primary {
  width: 70px;
}

</style>
