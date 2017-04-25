<template>
  <div class="dashboard">
    <top :show="true" :user-name="user.name"></top>
    <main>
      <router-view :user="user"></router-view>
    </main>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from '@/components/Top'
import Bottom from '@/components/Bottom'
import auth from '@/auth'
import router from '@/router'
export default {
  name: 'index',
  components: {
    Top, Bottom
  },
  data () {
    return {
      msg: 'Dashboard page',
      user: {
        id: -1,
        name: '',
        email: ''
      }
    }
  },
  mounted () {
    if (!auth.authenticated()) {
      router.push('/')
    }
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
