<template>
  <div class="signup">
    <div class="container-fluid">
  		<div class="row">
    		<div class="col-md-4 col-md-offset-4">
    			<h2>Sign Up</h2>
          <p>Sign up for a free account.</p>
          <p>Already a user? <router-link to="/">Log in</router-link> to your account.</p>
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>

          <form @submit="signup">
  					<div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-control" id="email" name="email"
                aria-describedby="emailHelp" placeholder="Enter email"
                v-model="credentials.email" required autofocus>
              <small id="emailHelp" class="form-text text-muted">
                We will never share your email with anyone else.
              </small>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password"
                name="password" placeholder="Password"
                v-model="credentials.password" required>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
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
import router from '@/router'
export default {
  name: 'signup',
  components: {

  },
  data () {
    return {
      msg: 'SignUp component',
      credentials: {
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      error: '',
      loading: false
    }
  },
  methods: {
    signup: function (e) {
      this.loading = true
      e.preventDefault()
      var credentials = {
        data: {
          type: 'users',
          attributes: {
            email: this.credentials.email,
            password: this.credentials.password,
            password_confirmation: this.credentials.passwordConfirmation
          }
        }
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.signup(this, credentials, 'dashboard')
    }
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
