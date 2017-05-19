<template>
  <div class="edit-account">
    <account-form type="update"></account-form>
  </div>
</template>

<script>
import auth from '@/auth'
import AccountForm from '@/components/dashboard/account/AccountForm'
export default {
  name: 'editAccount',
  components: {
    AccountForm
  },
  data () {
    return {
      msg: 'Edit account component',
      user: auth.user
    }
  },
  props: {

  },
  methods: {

  },
  computed: {

  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
