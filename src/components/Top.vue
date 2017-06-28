<template>
  <div class="top">
    <el-menu v-if="user.authenticated" theme="dark" default-active="/dashboard"
        class="menu" mode="horizontal" router key="dashboard-menu" id="menu"
        :class="{'responsive': responsive}">
      <li class="item-container">
        <a role="button">
        Our Icon
        </a>
      </li>
      <li class="item-container">
        <el-form :model="searchForm">
          <el-input placeholder="Search" icon="search" v-model="searchForm.searchInput"
            :on-icon-click="search">
          </el-input>
        </el-form>
      </li>
      <el-menu-item class="menu-item" index="/dashboard">
        <i class="glyphicon glyphicon-home"></i>
        Home
      </el-menu-item>
      <el-menu-item class="menu-item" index="/dashboard/profile">
        <i class="glyphicon glyphicon-user"></i>
        Profile
      </el-menu-item>
      <el-menu-item class="menu-item" index="/dashboard/meeting">
        <i class="glyphicon glyphicon-comment"></i>
        Meeting
      </el-menu-item>
      <el-menu-item class="menu-item" index="/dashboard/inbox">
        <i class="glyphicon glyphicon-envelope"></i>
        Inbox
      </el-menu-item>
      <el-menu-item class="menu-item" index="/dashboard/notifications">
        <i class="glyphicon glyphicon-bell"></i>
        Alerts
      </el-menu-item>
      <el-submenu index="0" id="submenu">
        <template slot="title">
          <img id="avatar" :src="userAvatar"/>
        </template>
        <el-menu-item index="/dashboard/email">
          {{ user.email }}
        </el-menu-item>
        <hr/>
        <el-menu-item index="/dashboard/edit-account">
          <span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;My Account
        </el-menu-item>
        <el-menu-item index="/dashboard/settings">
          <span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;Settings
        </el-menu-item>
        <hr/>
        <el-menu-item index="/" @click="logout">
          <span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Logout
        </el-menu-item>
      </el-submenu>
      <li class="item-container" id="toggleBtn">
        <a @click="toggleResponsive" role="button">
          <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
        </a>
      </li>
    </el-menu>

    <el-menu v-else theme="dark" class="menu" mode="horizontal"
        key="index-menu">
      <li class="item-container">
        <a role="button">
        Our Icon
        </a>
      </li>
    </el-menu>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'top',
  data () {
    return {
      user: auth.user,
      searchForm: {
        searchInput: ''
      },
      responsive: false
    }
  },
  methods: {
    search (e) {
      e.preventDefault()
      console.log(`Searching for ${this.searchForm.searchInput}...`)
    },
    logout () {
      auth.logout('/')
    },
    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    toggleResponsive () {
      this.responsive = !this.responsive
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
  .menu {
    position: fixed;
    margin-bottom: 0;
    border-radius: 0;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 100;
  }

  .menu-item {
    text-align: center;
  }

  .menu a {
    text-align: center;
  }

  .menu a:link {
    text-decoration: none;
  }

  .menu a:active {
    text-decoration: none;
  }

  .menu a:hover {
    text-decoration: none;
  }

  .menu-item i {
    display: block;
    margin-top: 15px;
    margin-bottom: -17px;
  }

  #avatar {
    height: 19px;
    margin-right: 5px;
  }

  hr {
    margin-top: 0;
    margin-bottom: 0;
  }

  .item-container {
    height: 60px;
    line-height: 60px;
    float: left;
    padding: 0 20px;
  }

  .item-container a {
    color: #bfcbd9;
  }

  .item-container a:hover {
    color: #20a0ff;
  }

  #toggleBtn {
    display: none;
  }

  /* When the screen is less than 850 pixels wide, hide all links, except for the first and last ones.
  Show the toggle menu icon */
  @media screen and (max-width: 850px) {
    .menu:not(.responsive) li:not(:first-child):not(:last-child) {
      display: none;
    }

    #toggleBtn {
      position: absolute;
      right: 0;
      display: block;
    }
  }

  /* The "responsive" class is added to the menu with JavaScript when the user clicks on the icon.
  This class makes the menu look good on small screens (display the links vertically instead of horizontally) */
  @media screen and (max-width: 850px) {
    .menu.responsive {
      position: relative;
      margin-bottom: -50px;
    }

    .menu.responsive li {
      display: block;
      text-align: center;
      float: none;
    }

    #toggleBtn {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  /*
  #submenu {
    float: right;
  }
  */

</style>
