<template>
  <div class="inbox">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'inbox',
  data () {
    return {
      msg: 'Inbox component'
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
