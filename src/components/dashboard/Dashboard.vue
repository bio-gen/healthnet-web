<template>
  <div class="dashboard">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from '@/auth'
import router from '@/router'
export default {
  name: 'index',
  components: {

  },
  data () {
    return {
      msg: 'Dashboard page'
    }
  },
  mounted () {
    if (!auth.user.authenticated) {
      router.push('/')
    }
  },
  route: {
    // Check the users auth status before
    // allowing navigation to the route
    canActivate () {
      return auth.user.authenticated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
