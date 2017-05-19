<template>
  <div class="account-form">
    <div class="row">
  		<div class="col-md-4 col-md-offset-4">
        <div v-html="headerInformation"></div>
        <form @submit="submit">
          <div class="form-group row">
            <div class="col-md-6">
              <label for="first-name">First Name</label>
              <input type="text" class="form-control" id="first-name"
                name="first-name" placeholder="Your first name"
                v-model="credentials.firstName" required autofocus>
            </div>

            <div class="col-md-6">
              <label for="last-name">Last Name</label>
              <input type="text" class="form-control" id="last-name"
                name="last-name" placeholder="Your last name"
                v-model="credentials.lastName" required>
            </div>
          </div>

    			<div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input type="email" class="form-control" id="email" name="email"
              aria-describedby="emailHelp" placeholder="Your email"
              v-model="credentials.email" required :disabled="type === 'update'">
          </div>

          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input type="password" class="form-control" id="password"
              name="password" :placeholder="type === 'update' ? 'New Password' : 'Password'"
              v-model="credentials.password" :required="type === 'create'">
          </div>

          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input type="password" class="form-control" id="confirm-password"
              name="confirm-password"
              :placeholder="type === 'update' ? 'Confirm New Password' : 'Confirm Password'"
              v-model="credentials.passwordConfirmation" :required="type === 'create'">
          </div>

          <br/>

          <div class="form-group row">
            <div class="offset-md-2 col-md-10">
              <button type="submit" class="btn btn-primary">
                <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                <span v-else v-html="type === 'update' ? 'Save' : 'Sign Up'"></span>
              </button>
            </div>
          </div>
        </form>
        <div class="alert alert-success" v-if="successMsg">
          <p>{{ successMsg }}</p>
        </div>
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'accountForm',
  data () {
    return {
      credentials: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        setCredentials (user) {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.email = user.email
        }
      },
      successMsg: '',
      error: '',
      loading: false
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    submit (e) {
      this.loading = true
      e.preventDefault()
      if (this.type === 'create') {
        this.signup()
      } else if (this.type === 'update') {
        this.update()
      }
    },
    signup () {
      var credentials = {
        data: {
          type: 'users',
          attributes: {
            first_name: this.credentials.firstName,
            last_name: this.credentials.lastName,
            email: this.credentials.email,
            password: this.credentials.password,
            password_confirmation: this.credentials.passwordConfirmation
          }
        }
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.signup(this, credentials, '/')
    },
    update (e) {
      console.log('Updating and stuff...')
    }
  },
  computed: {
    headerInformation () {
      if (this.type === 'create') {
        return `<h2>Sign Up</h2>
                <p>Sign up for a free account.</p>
                <p>Already a user?
                  <a href="/">Log in</a> to your account.
                </p>`
      } else if (this.type === 'update') {
        return `<h2>My Account</h2>
                <p>Edit your account information.</p>`
      } else {
        return ''
      }
    }
  },
  mounted () {
    if (this.type === 'update' && auth.user.authenticated) {
      this.credentials.setCredentials(auth.user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
