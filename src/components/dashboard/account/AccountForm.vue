<template>
  <div class="account-form">
    <div class="row">
  		<div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
        <div v-html="headerInformation"></div>
        <div class="alert alert-success alert-dismissable" v-if="successMsg">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <p>{{ successMsg }}</p>
        </div>
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
        <form @submit="submit">
          <div class="form-group row required">
            <div class="col-md-6">
              <label for="first-name" class="control-label">First name</label>
              <input type="text" class="form-control" id="firstName"
                name="first-name" placeholder="Your first name"
                v-model="credentials.firstName" required autofocus>
            </div>

            <div class="col-md-6">
              <label for="last-name" class="control-label">Last name</label>
              <input type="text" class="form-control" id="lastName"
                name="last-name" placeholder="Your last name"
                v-model="credentials.lastName" required>
            </div>
          </div>

          <div v-if="type === 'update'" class="form-group">
            <label for="title" class="control-label">Title</label>
            <input type="text" class="form-control" id="title"
              name="title" placeholder="Your professional title"
              v-model="credentials.title">
          </div>

          <div v-if="type === 'update'" class="form-group">
            <label for="location" class="control-label">Location</label>
            <input type="text" class="form-control" id="location"
              name="location" placeholder="Your current location"
              v-model="credentials.location">
          </div>

          <div v-if="type === 'update'" class="form-group">
            <label for="institution" class="control-label">Institution</label>
            <input type="text" class="form-control" id="institution"
              name="institution" placeholder="Your current institution"
              v-model="credentials.institution">
          </div>

          <div v-if="type === 'update'" class="form-group">
            <label for="date-of-birth" class="control-label">Date of birth</label>
            <input type="text" class="form-control" id="dateOfBirth"
              name="date-of-birth" placeholder="yyyy-mm-dd"
              v-model="credentials.dateOfBirth">
          </div>

          <div v-if="type === 'update'" class="form-group">
            <label for="phone-number" class="control-label">Phone number</label>
            <input type="text" class="form-control" id="phoneNumber"
              name="phone-number" placeholder="(123) 456-7890"
              v-model="credentials.phoneNumber">
          </div>

          <div class="input-group">
            <div class="checkbox" v-if="type === 'update'">
              <label>
                <input type="checkbox" ref="changePassword" v-model="changePassword" />
                Change password
              </label>
            </div>
          </div>

    			<div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input type="email" class="form-control" id="email" name="email"
              aria-describedby="emailHelp" placeholder="Your email"
              v-model="credentials.email" required :disabled="type === 'update'">
          </div>

          <div v-if="changePassword || type === 'create'">
            <div v-if="type === 'update'" class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input type="password" class="form-control" id="oldPassword"
                name="old-password" placeholder="Old password"
                v-model="oldPassword">
            </div>

            <div class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input type="password" class="form-control" id="password"
                name="password" :placeholder="type === 'update' ? 'New password' : 'Password'"
                v-model="credentials.password" :required="type === 'create'">
            </div>

            <div class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input type="password" class="form-control" id="confirmPassword"
                name="confirm-password"
                :placeholder="type === 'update' ? 'Confirm new password' : 'Confirm password'"
                v-model="credentials.passwordConfirmation" :required="type === 'create'">
            </div>
          </div>

          <br/>

          <div class="form-group">
            <button type="submit" class="btn btn-primary form-control pull-right">
              <i v-if="saving" class="fa fa-spinner fa-spin"></i>
              <span v-else v-html="type === 'update' ? 'Save' : 'Sign Up'"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
import router from '@/router'
export default {
  name: 'accountForm',
  data () {
    return {
      credentials: {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        location: '',
        institution: '',
        dateOfBirth: '',
        phoneNumber: '',
        password: '',
        passwordConfirmation: '',
        setCredentials (user) {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.email = user.email
          this.title = user.title
          this.location = user.location
          this.institution = user.institution
          this.dateOfBirth = user.dateOfBirth
          this.phoneNumber = user.phoneNumber
        }
      },
      changePassword: false,
      oldPassword: '',
      successMsg: '',
      error: '',
      saving: false
    }
  },
  props: {
    type: {  // create, update
      type: String,
      required: true
    }
  },
  methods: {
    submit (e) {
      this.saving = true
      e.preventDefault()
      if (this.type === 'create') {
        this.signup()
      } else if (this.type === 'update') {
        this.update()
      }
    },
    signup () {
      var data = {
        first_name: this.credentials.firstName,
        last_name: this.credentials.lastName,
        email: this.credentials.email,
        password: this.credentials.password,
        password_confirmation: this.credentials.passwordConfirmation
      }
      // We need to pass the component's this context to properly make use of
      // http in the auth service
      auth.signup(this, data, (response) => {
        this.saving = false
        // Redirect to index
        router.push('/')
      }, (response) => {
        this.saving = false
        if (response.status === 422) {
          if (response.data.password_confirmation) {
            this.error = 'Passwords do not match.'
          } else if (response.data.email) {
            this.error = 'A user with this email already exists.'
          }
        } else {
          this.error = 'There was an error processing your request (' +
              response.status + ' - ' + response.data + '). Please contact the ' +
              'system administrator.'
        }
      })
    },
    update () {
      var data = {
        first_name: this.credentials.firstName,
        last_name: this.credentials.lastName,
        title: this.credentials.title,
        location: this.credentials.location,
        institution: this.credentials.institution,
        date_of_birth: this.credentials.dateOfBirth,
        phone_number: this.credentials.phoneNumber
      }

      auth.updateUser(this, auth.user.id, data, (response) => {
        auth.user.updateUser(data)
        localStorage.setItem('user', JSON.stringify(this.user))
        this.saving = false
        this.error = ''
        this.successMsg = 'Account information saved successfully.'
      }, (response) => {
        this.saving = false
        if (response.status === 422) {
          this.error = 'Incorrect data input.'
        } else {
          this.error = 'Server error (Status ' + response.status + ').'
        }
      })
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
    this.$nextTick(() => {
      var element = document.getElementById('firstName')
      element.focus()
      element.select()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
