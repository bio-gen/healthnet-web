<template>
  <div class="login">
		<div class="row">
  		<div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
  			<h2>Login</h2>
        <p>Log in to your account or <router-link to="/signup">Sign up</router-link>.</p>

        <form @submit="login">
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
            <button type="submit" class="btn btn-primary form-control pull-right">
              <i v-if="loading" class="fa fa-spinner fa-spin"></i>
              <span v-else>Log In</span>
            </button>
          </div>
        </form>
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
			</div>
		</div>
  </div>
</template>

<script>
// import router from '@/router'
import auth from '@/auth'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Login component',
      credentials: {
        email: '',
        password: ''
      },
      error: '',
      loading: false
    }
  },
  methods: {
    login (e) {
      this.loading = true
      e.preventDefault()
      var credentials = {
        auth: {
          email: this.credentials.email,
          password: this.credentials.password
        }
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(this, credentials, 'dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
