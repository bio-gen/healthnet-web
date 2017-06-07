<template>
  <div class="alert-component">
    <div class="alert" :class="'alert-' + type" id="alert">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import util from '@/util'
export default {
  name: 'alertComponent',
  data () {
    return {

    }
  },
  props: {
    type: {  // success, danger
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: false
    }
  },
  methods: {

  },
  mounted () {
    if (this.type !== 'danger') {
      util.elementFadeOut('alert', () => { this.$emit('faded') })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
