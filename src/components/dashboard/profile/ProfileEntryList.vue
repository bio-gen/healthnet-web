<template>
  <div class="profile-entry-list">
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
              <experienceEntry v-if="type === 'experience'" entryType="create"
                :user="user" :saving="newEntrySaving" :error="newEntryError" firstField="title"
                @cancel="cancelEntry()" @create="createEntry">
              </experienceEntry>
              <educationEntry v-else-if="type === 'education'" entryType="create"
                :user="user" :saving="newEntrySaving" :error="newEntryError" firstField="degree"
                @cancel="cancelEntry()" @create="createEntry">
              </educationEntry>
              <certificateEntry v-else-if="type === 'certificates'" entryType="create"
                :user="user" :saving="newEntrySaving" :error="newEntryError" firstField="title"
                @cancel="cancelEntry()" @create="createEntry">
              </certificateEntry>
            </li>
            <li v-for="(entry, key) in entries" class="list-group-item">
        			<experienceEntry v-if="type === 'experience'" :entryType="entry.entryType"
        			  :entry="entry" :user="user" :deleting="entry.deleting" :saving="entry.saving"
        			  :error="entry.error" firstField="title"
        			  @delete="deleteEntry(entry, key)" @update="updateEntry" @edit="editEntry(entry)"
        			  @cancel="cancelEntry(entry)">
        			</experienceEntry>
        			<educationEntry v-else-if="type === 'education'" :entryType="entry.entryType"
        			  :entry="entry" :user="user" :deleting="entry.deleting" :saving="entry.saving"
        			  :error="entry.error" firstField="degree"
        			  @delete="deleteEntry(entry, key)" @update="updateEntry" @edit="editEntry(entry)"
        			  @cancel="cancelEntry(entry)">
        			</educationEntry>
        			<certificateEntry v-else-if="type === 'certificates'" :entryType="entry.entryType"
        			  :entry="entry" :user="user" :deleting="entry.deleting" :saving="entry.saving"
        			  :error="entry.error" firstField="title"
        			  @delete="deleteEntry(entry, key)" @update="updateEntry" @edit="editEntry(entry)"
        			  @cancel="cancelEntry(entry)">
        			</certificateEntry>
      		  </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profile from '@/api/dashboard/profile'
import util from '@/util'
import ExperienceEntry from '@/components/dashboard/profile/ExperienceEntry'
import EducationEntry from '@/components/dashboard/profile/EducationEntry'
import CertificateEntry from '@/components/dashboard/profile/CertificateEntry'
export default {
  name: 'profileEntryList',
  components: {
    ExperienceEntry, EducationEntry, CertificateEntry
  },
  data () {
    return {
      entries: [],
      error: '',
      successMsg: '',
      loading: false,
      newEntry: false,
      newEntrySaving: false,
      newEntryError: ''
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
    loadList (data) {
      for (var entry of data) {
        entry.deleting = false
        entry.saving = false
        entry.entryType = 'read'
        this.entries.push(entry)
      }
      this.loading = false
    },
    getEntry (entryId) {
      for (var i = 0; i < this.entries.length; i++) {
        var entry = this.entries[i]
        if (entry.id === entryId) {
          return entry
        }
      }
    },
    addEntry () {
      this.newEntry = true
    },
    editEntry (entry) {
      entry.entryType = 'update'
    },
    cancelEntry (entry) {
      if (entry) {
        entry.entryType = 'read'
      } else {
        this.newEntry = false
      }
    },
    performDelete (key, entry) {
      this.entries.splice(key, 1)
      this.successMsg = 'Entry deleted successfully.'
      entry.error = ''
      entry.deleting = false
    },
    deleteEntry (entry, key) {
      util.confirmDialog('Delete Entry',
        'Are you sure you want to delete this entry?', 'small', () => {
          entry.deleting = true
          switch (this.type) {
            case 'experience':
              profile.deleteExperience(this, this.user.id, entry.id,
                  (response) => this.performDelete(key, entry))
              break
            case 'education':
              profile.deleteEducation(this, this.user.id, entry.id,
                  (response) => this.performDelete(key, entry))
              break
            case 'certificates':
              profile.deleteCertificate(this, this.user.id, entry.id,
                  (response) => this.performDelete(key, entry))
              break
            case 'affiliations':
              console.log('Not implemented...')
              break
          }
        }
      )
    },
    performCreate (response) {
      this.newEntry = false
      this.newEntryError = ''
      this.successMsg = 'Entry added successfully.'
      this.newEntrySaving = false
      var entry = response.body.data
      entry.deleting = false
      entry.saving = false
      entry.entryType = 'read'
      this.entries.unshift(entry)
    },
    createEntry (data) {
      this.newEntrySaving = true
      switch (this.type) {
        case 'experience':
          profile.createExperience(this, this.user.id, data,
              this.performCreate, (response) => { this.newEntrySaving = false })
          break
        case 'education':
          profile.createEducation(this, this.user.id, data,
              this.performCreate, (response) => { this.newEntrySaving = false })
          break
        case 'certificates':
          profile.createCertificate(this, this.user.id, data,
              this.performCreate, (response) => { this.newEntrySaving = false })
          break
      }
    },
    performUpdate (entry) {
      entry.saving = false
      entry.error = ''
      entry.entryType = 'read'
      this.successMsg = 'Entry updated successfully.'
    },
    updateEntry (entryId, data) {
      var entry = this.getEntry(entryId)
      entry.saving = true
      switch (this.type) {
        case 'experience':
          profile.updateExperience(this, this.user.id, entryId, data,
              (response) => this.performUpdate(entry),
              (response) => { entry.saving = false })
          break
        case 'education':
          profile.updateEducation(this, this.user.id, entryId, data,
              (response) => this.performUpdate(entry),
              (response) => { entry.saving = false })
          break
        case 'certificates':
          profile.updateCertificate(this, this.user.id, entryId, data,
              (response) => this.performUpdate(entry),
              (response) => { entry.saving = false })
          break
      }
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
        profile.getExperienceList(this, this.user.id,
            (response) => this.loadList(response.body.data))
        break
      case 'education':
        profile.getEducationList(this, this.user.id,
            (response) => this.loadList(response.body.data))
        break
      case 'certificates':
        profile.getCertificatesList(this, this.user.id,
            (response) => this.loadList(response.body.data))
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
