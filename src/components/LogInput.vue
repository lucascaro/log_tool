<template>
  <div class="log-input">
    <textarea
      v-if="shown"
      v-model="src"
      placeholder="paste logs here"
      @change="updateLogSource"
      ></textarea>
    <button class="hide" v-if="shown" @click="hide()" value="^" />
    <button class="show" v-else @click="show()" value="v" />
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
  width: 100%;
  height: 200px;
}
</style>
