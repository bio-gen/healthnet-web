<template>
  <div class="education-entry">
    <alertComponent type="danger" v-if="error" :msg="error">
    </alertComponent>
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
              <label for="degree" class="sr-only" :class="{'control-label' : entryType !== 'read'}">Degree</label>
              <strong v-if="entryType === 'read'">{{ entry.attributes.degree }}</strong>
              <input v-else type="text" class="form-control" id="degree"
                placeholder="Degree" v-model="thisEntry.attributes.degree" required>
            </div>
  				</h4>
  		  </div>
				<div class="panel-body">
				  <ul class="list-group">
            <li class="list-group-item row">
              <div class="col-sm-6">
                <div class="form-group form-inline required">
                  <label for="school" :class="{'control-label' : entryType !== 'read'}">Institution</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.school }}
                  </span>
                  <input v-else type="text" class="form-control" id="school"
                    placeholder="Institution name" v-model="thisEntry.attributes.school" required>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group form-inline required">
                  <label for="location" :class="{'control-label' : entryType !== 'read'}">Field</label>
                  <span v-if="entryType === 'read'">
                    {{ entry.attributes.field }}
                  </span>
                  <input v-else type="text" class="form-control" id="field"
                    placeholder="Field of study" v-model="thisEntry.attributes.field" required>
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
import AlertComponent from '@/components/general/AlertComponent'
export default {
  name: 'educationEntry',
  components: {
    AlertComponent
  },
  mixins: [
    EntryMixin
  ],
  data () {
    return {
      thisEntry: {
        id: -1,
        type: 'educations',
        attributes: {
          degree: '',
          school: '',
          field: '',
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
