<template>
  <div class="submit-cancel-btns">
    <div class="form-group form-inline">
      <button type="submit" class="btn btn-primary form-control pull-right"
        id="submitBtn">
        <i v-if="saving" class="fa fa-spinner fa-spin"></i>
        <span v-else>{{ submitTxt }}</span>
      </button>
      <button class="btn btn-primary form-control pull-right" v-on:click="cancel">
    	  Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitCancelBtns',
  props: {
    saving: {
      type: Boolean,
      required: true
    },
    submitTxt: {
      type: String,
      required: true
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #submitBtn {
    margin-left: 20px;
  }
</style>
