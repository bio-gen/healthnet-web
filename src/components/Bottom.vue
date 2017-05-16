<template>
  <div class="bottom">
    <footer class="container-fluid text-center navbar-fixed-bottom">
      <p>&copy; {{ year }} HealthNet Inc. All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data () {
    return {
      msg: 'Bottom component',
      year: new Date().getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  background-color: #696969;
  color: #F0FFFF;
  padding-top: 10px;
}
</style>
