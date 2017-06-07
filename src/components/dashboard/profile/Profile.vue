<template>
  <div class="profile">

    <alertComponent type="success" v-if="successMsg" :msg="successMsg"
        @faded="successMsg = ''">
    </alertComponent>

    <div class="jumbotron">
      <form @keyup.esc="cancel" @submit="save">
        <div class="container text-center">
          <img id="profilePicture" class="img-rounded" width="20%"
             :alt="fullName" :src="profilePicture"/>
          <h1 v-if="!editing">
            <a class="cool" v-if="!editing" title="Click to edit" v-on:click="editUser('firstName')" role="button">
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
              <a v-if="!editing" title="Click to edit" v-on:click="editUser('title')" role="button">
                {{ user.title }}
              </a>
            </p>
            <p v-if="user.institution">
              <a v-if="!editing" title="Click to edit" v-on:click="editUser('institution')" role="button">
                {{ user.institution }}
              </a>
            </p>
            <p v-if="user.location">
              <a v-if="!editing" title="Click to edit" v-on:click="editUser('location')" role="button">
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

    <profileEntryList v-for="entryList in entryLists" :key="entryList.type" :type="entryList.type"
        :user="user" :newEntry="entryList.newEntry" @addEntry="addEntry(entryList)" @editEntry="editEntry"
        @createEntry="entryList.newEntry = false" @cancelEntry="cancelEntry">
    </profileEntryList>
    <!--
    <profileEntryList type="education" :user="user" @addEntry="addEntry('education')"></profileEntryList>
    <profileEntryList type="certificates" :user="user" @addEntry="addEntry('certificates')"></profileEntryList>
    <profileEntryList type="affiliations" :user="user" @addEntry="addEntry('affiliations')"></profileEntryList>
    -->
  </div>
</template>

<script>
import auth from '@/auth'
import util from '@/util'
import ProfileEntryList from '@/components/dashboard/profile/ProfileEntryList'
import SubmitCancelBtns from '@/components/general/SubmitCancelBtns'
import AlertComponent from '@/components/general/AlertComponent'
export default {
  name: 'profile',
  components: {
    ProfileEntryList, SubmitCancelBtns, AlertComponent
  },
  data () {
    return {
      user: auth.user,
      editing: false,
      loading: false,
      saving: false,
      successMsg: '',
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
      },
      entryLists: [
        {
          type: 'experience',
          newEntry: false
        },
        {
          type: 'education',
          newEntry: false
        },
        {
          type: 'certificates',
          newEntry: false
        },
        {
          type: 'affiliations',
          newEntry: false
        }
      ]
    }
  },
  methods: {
    editUser (elementId) {
      this.editing = true
      util.setFocus(this, elementId)
      this.cancelEntry()  // Close new entries
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
        this.saving = false
        this.editing = false
        this.error = ''
        this.successMsg = 'Account information saved successfully.'
      }, (response) => {
        this.saving = false
      })
    },
    addEntry (entryList) {
      for (var i = 0; i < this.entryLists.length; i++) {
        var otherEntryList = this.entryLists[i]
        otherEntryList.newEntry = false
      }
      entryList.newEntry = true
      this.cancel()  // Close edit user info
    },
    editEntry () {
      for (var i = 0; i < this.entryLists.length; i++) {
        var entryList = this.entryLists[i]
        entryList.newEntry = false
      }
      this.cancel()  // Close edit user info
    },
    cancelEntry () {
      for (var i = 0; i < this.entryLists.length; i++) {
        var entryList = this.entryLists[i]
        entryList.newEntry = false
      }
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
