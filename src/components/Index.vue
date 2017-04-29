<template>
  <div class="index">
    <login></login>
  </div>
</template>

<script>
import Login from './Login'
import auth from '@/auth'
import router from '@/router'
export default {
  name: 'index',
  components: {
    Login
  },
  data () {
    return {
      msg: 'Index Page'
    }
  },
  mounted () {
    if (auth.user.authenticated) {
      router.push('dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
