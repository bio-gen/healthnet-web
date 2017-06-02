<template>
  <div class="certificate-entry">
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
              <label for="title" class="sr-only" :class="{'control-label' : entryType !== 'read'}">Title</label>
              <strong v-if="entryType === 'read'">{{ entry.attributes.title }}</strong>
              <input v-else type="text" class="form-control" id="title"
                placeholder="Title" v-model="thisEntry.attributes.title" required>
            </div>
  				</h4>
  		  </div>
				<div class="panel-body">
				  <ul class="list-group">
				    <li class="list-group-item row">
              <div class="col-sm-6">
                <div class="form-group form-inline required">
                  <label for="grantedBy" :class="{'control-label' : entryType !== 'read'}">Granted by</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.granted_by }}
                  </span>
                  <input v-else type="text" class="form-control" id="grantedBy"
                    placeholder="Organization name" v-model="thisEntry.attributes.granted_by" required>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group form-inline">
                  <label for="year" :class="{'control-label' : entryType !== 'read'}">Year granted</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.year }}
                  </span>
                  <div v-else class="form-group">
                    <select class="form-control" id="year"
                      v-model="thisEntry.attributes.year" required>
                      <option v-for="year in years" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li v-if="entryType !== 'read'" class="list-group-item">
              <submitCancelBtns :saving="saving" submitTxt="Save" @cancel="cancel">
              </submitCancelBtns>
            </li>
          </ul>
				</div>
  		</div>
		</form>
  </div>
</template>

<script>
import util from '@/util'
import SubmitCancelBtns from '@/components/general/SubmitCancelBtns'
export default {
  name: 'certificateEntry',
  components: {
    SubmitCancelBtns
  },
  data () {
    return {
      thisEntry: {
        id: -1,
        type: 'certificates',
        attributes: {
          title: '',
          granted_by: '',
          year: util.currentYear()
        }
      },
      years: util.range(util.currentYear(100), 110)
    }
  },
  props: {
    entryType: {  // create, read, update
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
    },
    deleting: {
      type: Boolean,
      required: false
    },
    saving: {
      type: Boolean,
      required: true
    },
    error: {
      type: String,
      required: false
    }
  },
  methods: {
    deleteEntry () {
      this.$emit('delete')
    },
    editEntry () {
      this.$emit('edit')
      this.thisEntry = this.entry
    },
    saveEntry (e) {
      e.preventDefault()
      if (this.entryType === 'create') {
        this.$emit('create', this.thisEntry.attributes)
      } else { // update
        this.$emit('update', this.thisEntry.id, this.thisEntry.attributes)
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel-body {
    padding-top: 0;

  }

  .form-group {
    margin-bottom: 0;
  }
</style>
