<template>
  <div class="notifications">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'notifications',
  data () {
    return {
      msg: 'Notifications component'
    }
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
