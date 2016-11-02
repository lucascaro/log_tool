<template>
  <div class="log-input">
    <textarea
      v-show="shown"
      v-model="src"
      placeholder="paste logs here or drag and drop a file anywhere"
      @change="updateLogSource"
      ></textarea>
    <button class="hide" v-show="shown" @click="hide()">Hide input</button>
    <button class="show" v-show="!shown" @click="show()">Show log input</button>
  </div>
</template>

<script>
  export default {
    name: 'log-input',
    data () {
      return {
        shown: true,
        buttonShow: 'V',
        buttonHide: '^',
        src: this.$store.state.logSource
      }
    },
    computed: {

    },
    methods: {
      show () {
        this.shown = true
      },
      hide () {
        this.shown = false
      },
      updateLogSource () {
        this.$store.commit('updateSource', {src: this.src})
        this.src = this.$store.state.sourceLogs
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
