<template>
  <div class="not-found">
    <div class="jumbotron">
      <div class="container text-center">
        <h1>{{ header }}</h1>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found-component',
  components: {

  },
  data () {
    return {
      header: 'Not found',
      msg: 'The page you are looking for does not exist in our site.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
