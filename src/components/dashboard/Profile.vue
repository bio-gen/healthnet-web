<template>
  <div class="profile">
    <div class ="container-fluid">
      <div class="jumbotron">
        <div class="container text-center">
          <h1>{{ name }}</h1>
          <p>Student / Degree / Specialization</p>
          <p>Institution</p>
          <p>Location</p>
        </div>
      </div>
    </div>

    <div class="container-fluid bg-3">
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <a data-toggle="collapse" href="#experienceList">
                Experience
              </a>
            </h3>
          </div>
          <div id="experienceList" class="panel-collapse collapse in">
            <ul class="list-group">
              <li class="list-group-item">Experience 1</li>
              <li class="list-group-item">Experience 2</li>
              <li class="list-group-item">Experience 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Profile component',
      user: auth.user
    }
  },
  props: {

  },
  methods: {

  },
  computed: {
    name () {
      var name = this.user.name.substring(0, this.user.name.indexOf('@'))
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
