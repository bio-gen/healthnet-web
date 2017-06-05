<template>
  <div class="experience-entry">
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form @keyup.esc="cancel" @submit="saveEntry">
      <div class="panel" :class="entryType === 'read' ? 'panel-default' : 'panel-primary'">
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
					  <div class="form-group required">
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
                  <label for="company" :class="{'control-label' : entryType !== 'read'}">Organization</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.company }}
                  </span>
                  <input v-else type="text" class="form-control" id="company"
                    placeholder="Organization name" v-model="thisEntry.attributes.company" required>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group form-inline required">
                  <label for="location" :class="{'control-label' : entryType !== 'read'}">Location</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.location }}
                  </span>
                  <input v-else type="text" class="form-control" id="location"
                    placeholder="City/Country" v-model="thisEntry.attributes.location" required>
                </div>
              </div>
            </li>
            <li class="list-group-item row">
              <div class="col-sm-6">
                <div class="form-group form-inline">
                  <label for="startYear" :class="{'control-label' : entryType !== 'read'}">From</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.start_year }}
                  </span>
                  <div v-else class="form-group">
                    <select class="form-control" id="startYear"
                      v-model="thisEntry.attributes.start_year" required>
                      <option v-for="year in years" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group form-inline">
                  <label for="endYear" :class="{'control-label' : entryType !== 'read'}">To</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.end_year }}
                  </span>
                  <div v-else class="form-group">
                    <select class="form-control" id="endYear"
                      v-model="thisEntry.attributes.end_year" required>
                      <option v-for="year in years" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div class="checkbox">
                    <label>
                      <input v-if="entryType === 'read'" type="checkbox"
                        v-model="entry.attributes.current" ref="current" disabled />
                      <input v-else type="checkbox"
                        v-model="thisEntry.attributes.current" ref="current" />
                      Current
                    </label>
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group required">
                <label for="location" :class="{'control-label' : entryType !== 'read'}">Description</label>
                <span v-if="entryType === 'read'">
                  {{ entry.attributes.description }}
                </span>
                <textarea v-else class="form-control" id="description" rows="3"
                  placeholder="Description" v-model="thisEntry.attributes.description" required>
                </textarea>
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
import EntryMixin from '@/mixins/entry'
export default {
  name: 'experienceEntry',
  mixins: [
    EntryMixin
  ],
  data () {
    return {
      thisEntry: {
        id: -1,
        type: 'work_experiences',
        attributes: {
          title: '',
          company: '',
          location: '',
          start_year: util.currentYear(),
          end_year: util.currentYear(),
          current: false,
          description: ''
        }
      },
      years: util.range(util.currentYear(100), 110)
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
