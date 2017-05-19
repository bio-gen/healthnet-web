<template>
  <div class="meeting">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'meeting',
  data () {
    return {
      msg: 'Meeting component'
    }
  },
  props: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
