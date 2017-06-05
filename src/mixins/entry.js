import util from '@/util'
import SubmitCancelBtns from '@/components/general/SubmitCancelBtns'

export default {
  components: {
    SubmitCancelBtns
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
    },
    firstField: {
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
  },
  watch: {
    entryType (value) {
      if (value === 'update') {
        util.setFocus(this, this.firstField)
      }
    }
  },
  mounted () {
    if (this.entryType === 'create') {
      util.setFocus(this, this.firstField)
    }
  }
}
