<template>
  <div class="top">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse"
            data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Our Icon</a>
        </div>
        <div v-if="show" class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li v-bind:class="{active: isActive('/dashboard')}"><router-link to="/dashboard">Home</router-link></li>
            <li v-bind:class="{active: isActive('/dashboard/profile')}"><router-link to="/dashboard/profile">Profile</router-link></li>
            <li v-bind:class="{active: isActive('/dashboard/meeting')}"><router-link to="/dashboard/meeting">Meeting</router-link></li>
            <li v-bind:class="{active: isActive('/dashboard/inbox')}"><router-link to="/dashboard/inbox">Inbox</router-link></li>
            <li v-bind:class="{active: isActive('/dashboard/notifications')}"><router-link to="/dashboard/notifications">Notifications</router-link></li>
            <li v-bind:class="{active: isActive('/dashboard/settings')}"><router-link to="/dashboard/settings">Settings</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a>{{ userName }}</a>
            </li>
            <li>
              <a @click="logout" href="#">
                <span class="glyphicon glyphicon-log-in"></span> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'top',
  data () {
    return {
      msg: 'Top component'
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: ''
    }
  },
  methods: {
    isActive: function (r) {
      return this.$route.path === r
    },
    logout: function () {
      auth.logout('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  margin-bottom: 0;
  border-radius: 0;
}
</style>
