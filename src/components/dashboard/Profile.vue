<template>
  <div class="profile">
    <div class ="container-fluid">
      <div class="jumbotron">
        <div class="container text-center">
          <h1>{{ fullName }}</h1>
          <p>Student / Degree / Specialization</p>
          <p>Institution</p>
          <p>Location</p>
        </div>
      </div>
    </div>
    <profileEntryList type="experience" :user="user"></profileEntryList>
    <profileEntryList type="education" :user="user"></profileEntryList>
    <profileEntryList type="certificates" :user="user"></profileEntryList>
    <profileEntryList type="affiliations" :user="user"></profileEntryList>
  </div>
</template>

<script>
import auth from '@/auth'
import ProfileEntryList from '@/components/dashboard/ProfileEntryList'
export default {
  name: 'profile',
  components: {
    ProfileEntryList
  },
  data () {
    return {
      user: auth.user
    }
  },
  props: {

  },
  methods: {

  },
  computed: {
    fullName () {
      return this.user.firstName + ' ' + this.user.lastName
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
