<template>
  <div class="profile-entry-list">
    <div class="container-fluid bg-3">
      <div class="alert alert-danger fade" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-success alert-dismissable fade" v-if="successMsg">
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
                {{ heading }}
              </a>
              <a title="New entry" role="button" v-on:click="addEntry">
                <i class="fa fa-plus-circle"></i>
              </a>
              <i v-if="loading" class="fa fa-spinner fa-spin"></i>
            </h3>
          </div>
          <div :id="type + 'List'" class="panel-collapse collapse in">
            <ul class="list-group">
              <li class="list-group-item" v-if="newEntry">
                <profileEntry :type="type" entryType="create" :user="user"
                  @cancel="newEntry = false" @saveEntry="saveEntry">
                </profileEntry>
              </li>
              <li v-for="(entry, key) in entries" class="list-group-item">
          			<profileEntry :type="type" entryType="read" :entry="entry" :entryKey="key"
          			  :user="user" @delete="deleteEntry(key)">
          			</profileEntry>
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
import ProfileEntry from '@/components/dashboard/ProfileEntry'
export default {
  name: 'profileEntryList',
  components: {
    ProfileEntry
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
    type: {
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
    }
  },
  computed: {
    heading () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1)
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

  i {
    color: grey;
  }
</style>
