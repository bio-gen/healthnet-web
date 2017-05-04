<template>
  <div class="account">
    <div>
  		<div class="row">
    		<div class="col-md-4 col-md-offset-4">
    			<h2>My Account</h2>
          <p>Edit your account information.</p>

          <div class="alert alert-success" v-if="successMsg">
            <p>{{ successMsg }}</p>
          </div>
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>

          <form @submit="updateUser">
  					<div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-control" id="email" name="email"
                aria-describedby="emailHelp" v-model="user.email" disabled>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password"
                name="password" placeholder="Password"
                v-model="credentials.password" required autofocus>
            </div>

            <div class="form-group">
              <label for="password">Password Confirmation</label>
              <input type="password" class="form-control" id="confirm-password"
                name="confirm-password" placeholder="Confirm Password"
                v-model="credentials.passwordConfirmation" required>
            </div>

            <div class="form-group row">
              <div class="offset-sm-2 col-sm-10">
                <button type="submit" class="btn btn-primary">
                  <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                  <span v-else>Submit</span>
                </button>
              </div>
            </div>
          </form>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'account',
  components: {

  },
  data () {
    return {
      msg: 'Account component',
      user: auth.user,
      credentials: {
        password: '',
        passwordConfirmation: ''
      },
      successMsg: '',
      error: '',
      loading: false
    }
  },
  props: {

  },
  methods: {
    updateUser: function (e) {
      this.loading = true
      e.preventDefault()
      var credentials = {
        data: {
          type: 'users',
          attributes: {
            email: this.user.email,
            password: this.credentials.password,
            password_confirmation: this.credentials.passwordConfirmation
          }
        }
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.updateUser(this, this.user.id, credentials, 'dashboard')
    }
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
