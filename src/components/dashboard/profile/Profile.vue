<template>
  <div class="profile">
    <div class ="container-fluid">
      <div class="jumbotron">
        <div class="container text-center">
          <h1>{{ fullName }}</h1>
          <p>{{ this.info.title }} / {{ this.info.degree }}</p>
          <p>{{ this.info.company }}</p>
          <p>{{ this.info.location }}</p>
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
import profile from '@/api/dashboard/profile'
import ProfileEntryList from '@/components/dashboard/profile/ProfileEntryList'
export default {
  name: 'profile',
  components: {
    ProfileEntryList
  },
  data () {
    return {
      user: auth.user,
      info: {
        title: 'Title',
        degree: 'Degree',
        company: 'Company',
        location: 'Location'
      },
      loading: false
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
    profile.getExperienceList(this, this.user.id, (response) => {
      if (response.body.data) {
        this.info.title = response.body.data[0].attributes.title
        this.info.company = response.body.data[0].attributes.company
        this.info.location = response.body.data[0].attributes.location
      }
    })

    profile.getEducationList(this, this.user.id, (response) => {
      if (response.body.data) {
        this.info.degree = response.body.data[0].attributes.degree
      }
      this.loading = false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
