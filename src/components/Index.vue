<template>
  <div class="index">
    <top></top>
    <main>
      <login></login>
    </main>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './Top'
import Login from './Login'
import Bottom from './Bottom'
import auth from '@/auth'
import router from '@/router'
export default {
  name: 'index',
  components: {
    Top, Login, Bottom
  },
  data () {
    return {
      msg: 'Index Page'
    }
  },
  mounted () {
    if (auth.authenticated()) {
      router.push('dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
