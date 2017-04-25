<template>
  <div class="login">
    <div class="container-fluid">
  		<div class="row">
    		<div class="col-md-4 col-md-offset-4">
    			<h2>Login</h2>
          <p>Log in to your account or <router-link to="/signup">Sign up</router-link>.</p>
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>

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
    login: function (e) {
      this.loading = true
      e.preventDefault()
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        password_confirmation: this.credentials.password
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(this, credentials, 'dashboard')
      this.credentials.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
