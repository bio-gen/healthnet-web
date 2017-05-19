<template>
  <div class="education-entry">
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
              <label for="degree" class="sr-only">Degree:</label>
              <strong v-if="entryType === 'read'">{{ entry.attributes.degree }}</strong>
              <input v-else type="text" class="form-control" id="degree"
                placeholder="Degree" v-model="thisEntry.attributes.degree" required>
            </div>
  				</h4>
  		  </div>
				<div class="panel-body">
				  <ul class="list-group">
            <li class="list-group-item row">
              <div class="col-md-6">
                <div class="form-group form-inline">
                  <label for="school">Institution:</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.school }}
                  </span>
                  <input v-else type="text" class="form-control" id="school"
                    placeholder="Institution name" v-model="thisEntry.attributes.school" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-inline">
                  <label for="location">Field:</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.field }}
                  </span>
                  <input v-else type="text" class="form-control" id="field"
                    placeholder="Field of study" v-model="thisEntry.attributes.field" required>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="col-md-6">
                <div class="form-group form-inline">
                  <label for="from_year">From:</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.from_year }}
                  </span>
                  <input v-else type="text" class="form-control" id="from_year"
                    placeholder="yyyy" v-model="thisEntry.attributes.from_year" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-inline">
                  <label for="to_year">To:</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.to_year }}
                  </span>
                  <input v-else type="text" class="form-control" id="to_year"
                    placeholder="yyyy" v-model="thisEntry.attributes.to_year" required>
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
		</form>
  </div>
</template>

<script>
import profile from '@/api/dashboard/profile'
import util from '@/util'
export default {
  name: 'educationEntry',
  components: {

  },
  data () {
    return {
      deleting: false,
      saving: false,
      entryType: this.entryTypeProp,  // create, read, update
      thisEntry: {
        id: -1,
        type: 'educations',
        attributes: {
          degree: '',
          school: '',
          field: '',
          from_year: '',
          to_year: '',
          description: ''
        }
      },
      error: ''
    }
  },
  props: {
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
          profile.deleteEducation(this, this.user.id, this.entry.id, (response) => {
            this.error = ''
            this.deleting = false
            this.$emit('delete', true)
          })
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

      if (this.entryType === 'create') {
        profile.createEducation(this, this.user.id, this.thisEntry.attributes, (response) => {
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
        profile.updateEducation(this, this.user.id, this.thisEntry.id, this.thisEntry.attributes, (response) => {
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
    },
    cancel () {
      if (this.entryType === 'create') {
        this.$emit('cancel', true)
      } else {
        this.entryType = 'read'
      }
    }
  },
  computed: {

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
</style>
