<template>
  <div class="signup">
    <account-form type="create"></account-form>
  </div>
</template>

<script>
import auth from '@/auth'
import router from '@/router'
import AccountForm from '@/components/dashboard/account/AccountForm'
export default {
  name: 'signup',
  components: {
    AccountForm
  },
  data () {
    return {
      msg: 'SignUp component'
    }
  },
  methods: {

  },
  computed: {

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
