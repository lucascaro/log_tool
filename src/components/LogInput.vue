<template>
  <div class="log-input">
    <textarea
      v-show="shown"
      v-model.lazy="src"
      placeholder="paste logs here or drag and drop a file anywhere"
      ></textarea>
    <button class="hide" v-show="shown" @click="hide()">Hide input</button>
    <span v-show="!shown">drag and drop a file anywhere or</span>
    <button class="show" v-show="!shown" @click="show()">Show log input</button>
  </div>
</template>

<script>
  export default {
    name: 'log-input',
    data () {
      return {
        shown: false,
        buttonShow: 'V',
        buttonHide: '^',
        src: this.$store.state.sourceLogs
      }
    },
    computed: {
      src: {
        get () {
          return this.$store.state.sourceLogs
        },
        set (src) {
          this.$store.commit('updateSource', {src})
        }
      }
    },
    methods: {
      show () {
        this.shown = true
      },
      hide () {
        this.shown = false
      }
    }
  }
</script>


<style scoped>
textarea {
  width: 99%;
  height: 200px;
}
</style>
