<template>
  <div class="not-found">
    <top></top>
      <main>
        <h1>Not Found</h1>
      </main>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './Top'
import Bottom from './Bottom'
export default {
  name: 'not-found-component',
  components: {
    Top, Bottom
  },
  data () {
    return {
      msg: 'Not found component'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
