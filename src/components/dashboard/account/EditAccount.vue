<template>
  <div class="edit-account">
    <account-form type="update"></account-form>
  </div>
</template>

<script>
import AccountForm from '@/components/dashboard/account/AccountForm'
export default {
  name: 'editAccount',
  components: {
    AccountForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
