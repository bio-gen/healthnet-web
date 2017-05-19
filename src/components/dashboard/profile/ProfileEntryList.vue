<template>
  <div class="profile-entry-list">
    <div class="container-fluid bg-3">
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-success alert-dismissable" v-if="successMsg">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Success!</strong> {{ successMsg }}
      </div>
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <a class="h3 accordion-toggle" data-toggle="collapse"
                 title="Toggle hide/show" :href="'#' + type + 'List'"
                  :class="{'collapsed': entries.length == 0}">
                <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                <i v-else class="fa" :class="headingIcon"></i>
                &nbsp;
                {{ heading }}
              </a>
            </h3>
            <a title="New entry" role="button" v-on:click="addEntry"
             data-toggle="collapse" class="add">
              Add
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
          <div :id="type + 'List'" class="panel-collapse collapse in">
            <ul class="list-group">
              <li class="list-group-item" v-if="newEntry">
                <experienceEntry v-if="type === 'experience'" entryTypeProp="create"
                  :user="user" @cancel="newEntry = false" @save="saveEntry">
                </experienceEntry>
                <educationEntry v-else-if="type === 'education'" entryTypeProp="create"
                  :user="user" @cancel="newEntry = false" @save="saveEntry">
                </educationEntry>
              </li>
              <li v-for="(entry, key) in entries" class="list-group-item">
          			<experienceEntry v-if="type === 'experience'" entryTypeProp="read" :entry="entry"
          			  :user="user" @delete="deleteEntry(key)" @update="updateEntry">
          			</experienceEntry>
          			<educationEntry v-else-if="type === 'education'" entryTypeProp="read" :entry="entry"
          			  :user="user" @delete="deleteEntry(key)" @update="updateEntry">
          			</educationEntry>
        		  </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profile from '@/api/dashboard/profile'
import ExperienceEntry from '@/components/dashboard/profile/ExperienceEntry'
import EducationEntry from '@/components/dashboard/profile/EducationEntry'
export default {
  name: 'profileEntryList',
  components: {
    ExperienceEntry, EducationEntry
  },
  data () {
    return {
      entries: [],
      error: '',
      successMsg: '',
      loading: false,
      newEntry: false
    }
  },
  props: {
    type: {  // experience, education, certificates, affiliations
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    addEntry () {
      this.newEntry = true
    },
    deleteEntry (key) {
      this.entries.splice(key, 1)
      this.successMsg = 'Entry deleted successfully.'
    },
    saveEntry (entry) {
      this.entries.unshift(entry)
      this.newEntry = false
      this.successMsg = 'Entry added successfully.'
    },
    updateEntry () {
      this.successMsg = 'Entry updated successfully.'
    }
  },
  computed: {
    heading () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1)
    },
    headingIcon () {
      switch (this.type) {
        case 'experience':
          return 'fa-briefcase'
        case 'education':
          return 'fa-graduation-cap'
        case 'certificates':
          return 'fa-certificate'
        case 'affiliations':
          return 'fa-globe'
      }
    }
  },
  mounted () {
    switch (this.type) {
      case 'experience':
        profile.getExperienceList(this, this.user.id, (response) => {
          for (const item of response.body.data) {
            this.entries.push(item)
          }
          this.loading = false
        })
        break
      case 'education':
        profile.getEducationList(this, this.user.id, (response) => {
          for (const item of response.body.data) {
            this.entries.push(item)
          }
          this.loading = false
        })
        break
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel-heading .accordion-toggle:after {
    /* symbol for "opening" panels */
    font-family: 'Glyphicons Halflings';  /* essential for enabling glyphicon */
    content: "\e114";    /* adjust as needed, taken from bootstrap.css */
    float: right;        /* adjust as needed */
    color: grey;         /* adjust as needed */
  }

  .panel-heading .accordion-toggle.collapsed:after {
    /* symbol for "collapsed" panels */
    content: "\e080";    /* adjust as needed, taken from bootstrap.css */
  }

  .panel-title {
    margin-bottom: 7px;
  }

  .add {
    border-top: 1px solid #D3D3D3;
    padding-top: 5px;
  }
</style>
