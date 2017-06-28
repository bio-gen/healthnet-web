<template>
  <div class="login">
		<el-row>
  		<el-col :md="{span: 8, offset: 8}" :sm="{span: 12, offset: 6}">
  			<h2>Login</h2>
        <p>Log in to your account or <router-link to="/signup">Sign up</router-link>.</p>

        <alertComponent type="danger" v-if="error" :msg="error">
        </alertComponent>

        <el-form :model="credentials" :rules="rules" label-position="top"
            label-width="110px" ref="loginForm">

          <el-form-item label="Email Address" prop="email">
            <el-input type="email" placeholder="Enter email" v-model="credentials.email"
                auto-complete="on" :autofocus="true">
            </el-input>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input type="password" placeholder="Enter password" v-model="credentials.password"
                auto-complete="on" @keyup.enter="login('loginForm')">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login('loginForm')" :loading="loading">
              Log In
            </el-button>
          </el-form-item>

        </el-form>
			</el-col>
		</el-row>
  </div>
</template>

<script>
// import router from '@/router'
import auth from '@/auth'
import AlertComponent from '@/components/general/AlertComponent'
export default {
  name: 'login',
  components: {
    AlertComponent
  },
  data () {
    return {
      msg: 'Login component',
      credentials: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' }
        ]
      },
      error: '',
      loading: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          var credentials = {
            auth: {
              email: this.credentials.email,
              password: this.credentials.password
            }
          }
          // We need to pass the component's this context
          // to properly make use of http in the auth service
          auth.login(this, credentials, 'dashboard')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
