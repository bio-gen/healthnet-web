<template>
  <div class="profile">
    <div class="jumbotron">
      <div class="container text-center">
        <h1>{{ user.name }}</h1>
        <p>Student/Degree/Specialization</p>
        <p>Institution</p>
        <p>Location</p>
      </div>
    </div>

    <div class="container-fluid bg-3 text-center">
      <h3>Experience</h3><br>
      <div class="row">
        <div class="col-sm-12">
          <p>Some text.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Profile component'
    }
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
