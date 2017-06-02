<template>
  <div class="profile">
    <div class="jumbotron">
      <form @keyup.esc="cancel" @submit="save">
        <div class="container text-center">
          <img id="profilePicture" class="img-rounded" width="20%"
             :alt="fullName" :src="profilePicture"/>
          <h1 v-if="!editing">
            <a class="cool" v-if="!editing" title="Click to edit" v-on:click="editUser" role="button">
              {{ fullName }}
            </a>
          </h1>
          <h1 v-else>
            <div class="form-group row">
              <div class="col-md-4 col-md-offset-2">
                <input type="text" class="form-control input-lg" id="firstName"
                  placeholder="First name" v-model="userInformation.firstName" required>
              </div>
              <div class="col-md-4">
                <input type="text" class="form-control input-lg" id="lastName"
                  placeholder="Last name" v-model="userInformation.lastName" required>
              </div>
            </div>
          </h1>
        </div>

        <div class="container text-center">
          <div v-if="!editing">
            <p v-if="user.title">
              <a v-if="!editing" title="Click to edit" v-on:click="editUser" role="button">
                {{ user.title }}
              </a>
            </p>
            <p v-if="user.institution">
              <a v-if="!editing" title="Click to edit" v-on:click="editUser" role="button">
                {{ user.institution }}
              </a>
            </p>
            <p v-if="user.location">
              <a v-if="!editing" title="Click to edit" v-on:click="editUser" role="button">
                {{ user.location }}
              </a>
            </p>
          </div>
          <div v-else>
            <div class="form-group row">
              <div class="col-md-4 col-md-offset-4">
                <input type="text" class="form-control" id="title"
                    placeholder="Title" v-model="userInformation.title">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-4 col-md-offset-4">
                <input type="text" class="form-control" id="institution"
                    placeholder="Institution" v-model="userInformation.institution">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-4 col-md-offset-4">
                <input type="text" class="form-control" id="location"
                    placeholder="Location" v-model="userInformation.location">
              </div>
            </div>
            <submitCancelBtns :saving="saving" submitTxt="Save" @cancel="cancel">
            </submitCancelBtns>
          </div>
        </div>
      </form>
    </div>
    <profileEntryList type="experience" :user="user"></profileEntryList>
    <profileEntryList type="education" :user="user"></profileEntryList>
    <profileEntryList type="certificates" :user="user"></profileEntryList>
    <profileEntryList type="affiliations" :user="user"></profileEntryList>
  </div>
</template>

<script>
import auth from '@/auth'
import ProfileEntryList from '@/components/dashboard/profile/ProfileEntryList'
import SubmitCancelBtns from '@/components/general/SubmitCancelBtns'
export default {
  name: 'profile',
  components: {
    ProfileEntryList, SubmitCancelBtns
  },
  data () {
    return {
      user: auth.user,
      editing: false,
      loading: false,
      saving: false,
      userInformation: {
        firstName: '',
        lastName: '',
        title: '',
        institution: '',
        location: '',
        setUserInformation (user) {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.title = user.title
          this.institution = user.institution
          this.location = user.location
        }
      }
    }
  },
  methods: {
    editUser () {
      this.editing = true
    },
    cancel () {
      this.editing = false
      this.userInformation.setUserInformation(this.user)
    },
    save (e) {
      e.preventDefault()
      this.saving = true
      var data = {
        first_name: this.userInformation.firstName,
        last_name: this.userInformation.lastName,
        title: this.userInformation.title,
        location: this.userInformation.location,
        institution: this.userInformation.institution,
        date_of_birth: this.user.dateOfBirth,
        phone_number: this.user.phoneNumber
      }

      auth.updateUser(this, this.user.id, data, (response) => {
        auth.user.updateUser(data)
        localStorage.setItem('user', JSON.stringify(this.user))
        this.saving = false
        this.editing = false
        this.error = ''
        this.successMsg = 'Account information saved successfully.'
      }, (response) => {
        this.saving = false
      })
    }
  },
  computed: {
    fullName () {
      return this.user.firstName + ' ' + this.user.lastName
    },
    profilePicture () {
      return '/static/user-md.png'
    }
  },
  mounted () {
    this.userInformation.setUserInformation(this.user)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    text-align: center;
  }
</style>
