<template>
  <div class="profile-entry">
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form @keyup.esc="cancel" @submit="saveEntry">
      <div class="panel" v-bind:class="entryType === 'read' ? 'panel-default' : 'panel-primary'">
  		  <div class="panel-heading">
  		    <a v-if="entryType === 'read'" title="Delete entry"
  		       v-on:click="deleteEntry" role="button">
  		      <i v-if="deleting" class="fa fa-spinner fa-spin pull-right"></i>
  		      <i v-else class="fa fa-trash pull-right"></i>
  		    </a>
  		    <a v-if="entryType === 'read'" title="Edit entry"
  		       v-on:click="editEntry" role="button">
  		      <i v-if="saving" class="fa fa-spinner fa-spin pull-right"></i>
  		      <i v-else class="fa fa-pencil pull-right"></i>
  		    </a>
  				<h4 class="panel-title">
					  <div class="form-group">
              <label for="title" class="sr-only">Title:</label>
              <strong v-if="entryType === 'read'">{{ entry.attributes.title }}</strong>
              <input v-else type="text" class="form-control" id="title"
                placeholder="Title" v-model="thisEntry.attributes.title" required>
            </div>
  				</h4>
  		  </div>
  		  <div>
  				<div class="panel-body">
  				  <ul class="list-group">
              <li class="list-group-item row">
                <div class="col-md-6">
                  <div class="form-group form-inline">
                    <label for="company">Organization:</label>
                    <span v-if="entryType === 'read'">
                      {{ entry.attributes.company }}
                    </span>
                    <input v-else type="text" class="form-control" id="company"
                      placeholder="Organization name" v-model="thisEntry.attributes.company" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-inline">
                    <label for="location">Location:</label>
                    <span v-if="entryType === 'read'">
                      {{ entry.attributes.location }}
                    </span>
                    <input v-else type="text" class="form-control" id="location"
                      placeholder="City/Country" v-model="thisEntry.attributes.location" required>
                  </div>
                </div>
              </li>
              <li class="list-group-item row">
                <div class="col-md-6">
                  <div class="form-group form-inline">
                    <label for="startDate">From:</label>
                    <span v-if="entryType === 'read'">
                      {{ entry.attributes.start_date }}
                    </span>
                    <input v-else type="text" class="form-control" id="startDate"
                      placeholder="yyyy-mm-dd" v-model="thisEntry.attributes.start_date" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-inline">
                    <label for="endDate">To:</label>
                    <span v-if="entryType === 'read'">
                      {{ getEndDate() }}
                    </span>
                    <div class="form-group" v-else>
                      <input type="text" class="form-control" id="endDate"
                        placeholder="yyyy-mm-dd" v-model="thisEntry.attributes.end_date" ref="endDate">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" v-model="thisEntry.attributes.current"
                            ref="current" v-on:change="makeCurrent()">
                          Current
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-group">
                  <label for="location" class="sr-only">Description:</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.description }}
                  </span>
                  <textarea v-else class="form-control" id="description" rows="3"
                    placeholder="Description" v-model="thisEntry.attributes.description" required>
                  </textarea>
                </div>
              </li>
            </ul>
  				</div>
  				<div v-if="entryType !== 'read'" class="panel-footer">
  				  <div class="row">
  				    <div class="col-md-offset-9 col-md-1">
                <div class="btn btn-primary" v-on:click="cancel">
                  Cancel
                </div>
              </div>
  				    <div class="col-md-1">
                <button type="submit" class="btn btn-primary">
                  <i v-if="saving" class="fa fa-spinner fa-spin"></i>
                  <span v-else>Save</span>
                </button>
              </div>
            </div>
  				</div>
  		  </div>
  		</div>
		</form>
  </div>
</template>
'
<script>
import profile from '@/api/dashboard/profile'
import util from '@/util'
export default {
  name: 'profileEntry',
  components: {

  },
  data () {
    return {
      deleting: false,
      saving: false,
      entryType: this.entryTypeProp,  // create, read, update
      thisEntry: {
        id: -1,
        type: 'work_experiences',
        attributes: {
          title: '',
          company: '',
          location: '',
          start_date: '',
          end_date: '',
          current: false,
          description: ''
        }
      },
      error: ''
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    entryTypeProp: {  // create, read
      type: String,
      required: true
    },
    entry: {
      type: Object,
      required: false
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    getEndDate () {
      return this.entry.attributes.current || this.entry.attributes.end_date == null
          ? 'Present' : this.entry.attributes.end_date
    },
    deleteEntry () {
      util.confirmDialog('Delete Entry',
        'Are you sure you want to delete this entry?', 'small',
        () => {
          this.deleting = true
          switch (this.type) {
            case 'experience':
              profile.deleteExperience(this, this.user.id, this.entry.id, (response) => {
                this.error = ''
                this.deleting = false
                this.$emit('delete', true)
              })
              break
          }
        }
      )
    },
    editEntry () {
      this.entryType = 'update'
      this.thisEntry = this.entry
    },
    saveEntry (e) {
      e.preventDefault()
      this.saving = true
      switch (this.type) {
        case 'experience':
          if (this.entryType === 'create') {
            profile.createExperience(this, this.user.id, this.thisEntry.attributes, (response) => {
              this.saving = false
              this.error = ''
              var newEntry = response.body.data
              this.$emit('save', newEntry)
            }, (response) => {
              this.saving = false
              if (response.status === 422) {
                this.error = 'Incorrect data input.'
              } else {
                this.error = 'Server error (' + response.status + ').'
              }
            })
          } else { // update
            profile.updateExperience(this, this.user.id, this.thisEntry.id, this.thisEntry.attributes, (response) => {
              this.saving = false
              this.error = ''
              this.entryType = 'read'
              this.$emit('update')
            }, (response) => {
              this.saving = false
              if (response.status === 422) {
                this.error = 'Incorrect data input.'
              } else {
                this.error = 'Server error (' + response.status + ').'
              }
            })
          }
          break
      }
    },
    cancel () {
      if (this.entryType === 'create') {
        this.$emit('cancel', true)
      } else {
        this.entryType = 'read'
      }
    },
    makeCurrent () {
      var checkbox = this.$refs.current
      var endDate = this.$refs.endDate
      if (checkbox.checked) {
        endDate.disabled = true
        endDate.placeholder = ''
      } else {
        endDate.disabled = false
        endDate.required = true
        endDate.placeholder = 'yyyy-mm-dd'
      }
    }
  },
  computed: {
    heading () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .form-group {
    margin-bottom: 0;
  }

  i {
    color: navy;
  }
</style>
