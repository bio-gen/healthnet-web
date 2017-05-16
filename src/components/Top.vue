<template>
  <div class="top">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button v-if="user.authenticated" type="button" class="navbar-toggle" data-toggle="collapse"
            data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Our Icon</a>
        </div>
        <div v-if="user.authenticated" class="collapse navbar-collapse" id="myNavbar">

          <form class="navbar-form navbar-left">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search">
              <div class="input-group-btn">
                <button class="btn btn-default" type="submit">
                  <i class="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>

          <ul class="nav navbar-nav navbar-right small">
            <li v-bind:class="{active: isActive('/dashboard')}">
              <router-link to="/dashboard">
                <i class="glyphicon glyphicon-home"></i><br/>
                Home
              </router-link>
            </li>
            <li v-bind:class="{active: isActive('/dashboard/profile')}">
              <router-link to="/dashboard/profile">
                <i class="glyphicon glyphicon-user"></i><br/>
                Profile
              </router-link>
            </li>
            <li v-bind:class="{active: isActive('/dashboard/meeting')}">
              <router-link to="/dashboard/meeting">
                <i class="glyphicon glyphicon-comment"></i><br/>
                Meeting
              </router-link>
            </li>
            <li v-bind:class="{active: isActive('/dashboard/inbox')}">
              <router-link to="/dashboard/inbox">
                <i class="glyphicon glyphicon-envelope"></i><br/>
                Inbox
              </router-link>
            </li>
            <li v-bind:class="{active: isActive('/dashboard/notifications')}">
              <router-link to="/dashboard/notifications">
                <i class="glyphicon glyphicon-bell"></i><br/>
                Alerts
              </router-link>
            </li>
            <li v-bind:class="{active: isActive('/dashboard/account', '/dashboard/settings')}"
                class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button">
                <div id="userDropdown">
                  <img id="avatar" class="img-rounded" :src="userAvatar"/>
                  <!-- {{ user.name }} -->
                  <span class="caret"></span>
                </div>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/dashboard/profile">
                    {{ user.email }}
                  </router-link>
                </li>
                <li class="divider"></li>
                <li>
                  <router-link to="/dashboard/edit-account">
                    <span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;My Account
                  </router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings">
                    <span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;Settings
                  </router-link>
                </li>
                <li class="divider"></li>
                <li>
                  <a @click="logout" href="#">
                    <span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Logout
                  </a>
                </li>
              </ul>
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
      msg: 'Top component',
      user: auth.user
    }
  },
  props: {

  },
  methods: {
    isActive (...routes) {
      for (var route of routes) {
        if (this.$route.path === route) {
          return true
        }
      }
      return false  // If none of the routes matches
    },
    logout () {
      auth.logout('/')
    }
  },
  computed: {
    userAvatar () {
      return '/static/user-md.png'
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

#userDropdown {
  padding-top: 7px;
}

#avatar {
  height: 19px;
  margin-right: 5px;
}

.nav li {
  text-align: center;
}

.nav a {
  height: 50px;
  padding-top: 5px;
}

.dropdown-menu a {
  height: 30px;
}

.dropdown ul li {
  text-align: left;
}
</style>
