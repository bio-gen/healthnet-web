<template>
  <div class="bottom">
    <footer class="container-fluid text-center navbar-fixed-bottom">
      <p>Footer Text</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data () {
    return {
      msg: 'Bottom component'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  background-color: #f2f2f2;
}
</style>
