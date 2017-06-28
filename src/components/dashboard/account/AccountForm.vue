<template>
  <div class="account-form">
    <el-row>
  		<el-col :md="{span: 8, offset: 8}" :sm="{span: 12, offset: 6}">

        <div v-if="type === 'create'">
          <h2>Sign Up</h2>
          <p>Sign up for a free account.</p>
          <p>Already a user?
            <router-link to="/">Log in</router-link> to your account.
          </p>
        </div>
        <div v-else>
          <h2>My Account</h2>
          <p>Edit your account information.</p>
        </div>

        <alertComponent type="success" v-if="successMsg" :msg="successMsg"
            @faded="successMsg = ''">
        </alertComponent>
        <alertComponent type="danger" v-if="error" :msg="error">
        </alertComponent>

        <el-form :model="credentials" :rules="rules" label-position="left"
            label-width="100px" ref="accountForm">

          <el-form-item label="Name" required>
            <el-col :span="11">
              <el-form-item prop="firstName">
                <el-input type="text" placeholder="First name" v-model="credentials.firstName"
                    auto-complete="on" :autofocus="true" id="firstName">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="lastName">
                <el-input type="text" placeholder="Last name" v-model="credentials.lastName"
                    auto-complete="on">
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item v-if="type === 'update'" prop="title" label="Title">
            <el-input type="text" placeholder="Professional title" v-model="credentials.title">
            </el-input>
          </el-form-item>

          <el-form-item v-if="type === 'update'" prop="location" label="Location">
            <el-input type="text" placeholder="Your current location" v-model="credentials.location">
            </el-input>
          </el-form-item>

          <el-form-item v-if="type === 'update'" prop="institution" label="Institution">
            <el-input type="text" placeholder="Your current institution" v-model="credentials.institution">
            </el-input>
          </el-form-item>

          <el-form-item v-if="type === 'update'" prop="dateOfBirth" label="Date of birth">
            <el-date-picker v-model="credentials.dateOfBirth" type="date" placeholder="Pick a day"
                format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <div v-if="type === 'update'" class="form-group">
            <label for="date-of-birth" class="control-label">Date of birth</label>
            <input type="text" class="form-control" id="dateOfBirth"
              name="date-of-birth" placeholder="yyyy-mm-dd"
              v-model="credentials.dateOfBirth">
          </div>

          <el-form-item v-if="type === 'update'" prop="phoneNumber" label="Phone number">
            <el-input type="text" placeholder="(123) 456-7890" v-model="credentials.phoneNumber">
            </el-input>
          </el-form-item>

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

          <el-form-item>
            <el-button type="primary" @click="submit('accountForm')" :loading="saving">
              <span v-html="type === 'update' ? 'Save' : 'Sign Up'"></span>
            </el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import auth from '@/auth'
import router from '@/router'
import AlertComponent from '@/components/general/AlertComponent'
export default {
  name: 'accountForm',
  components: {
    AlertComponent
  },
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
      rules: {
        firstName: [
          { required: true, message: 'Please enter your first name', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Please enter your last name', trigger: 'blur' }
        ]
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
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'create') {
            this.signup()
          } else if (this.type === 'update') {
            this.update()
          }
        } else {
          return false
        }
      })
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
          if (response.data.errors) {
            if (response.data.errors[0].source.pointer.includes('email')) {
              this.error = 'A user with this email already exists.'
            } else if (response.data.errors[0].source.pointer.includes('password')) {
              this.error = 'Passwords do not match.'
            }
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
