<template>
  <div class="file-dropper" @dragleave="dragging = false" >
    <div class="file-dropper-border">
      <span v-if="!loading">Drop files here.</span>
      <span v-else>Loading...</span>
      <input type="file" @change="onFileChange">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'file-dropper',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    dragging: {
      get () {
        return this.$store.state.dragging
      },
      set (value) {
        return this.$store.commit('updateDragging', {value})
      }
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.loading = true
      Vue.nextTick(() => {
        const file = files[0]
        /* global FileReader */
        const reader = new FileReader()
        // For some reason we need this to allow the ui to update...
        setTimeout(() => {
          reader.onload = (e) => {
            this.$store.commit('updateSource', {src: e.target.result})
            this.$store.commit('updateDragging', {value: false})
            this.loading = false
          }
          reader.readAsText(file)
        }, 100)
      })
    }
  }
}
</script>

<style lang="stylus">
  .file-dropper {
    // pointer-events: none;
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    background: rgba(255,255,255,.9);

    .file-dropper-border {
      border: 3px dashed grey;
      box-sizing: border-box;
      color: grey;
      text-align: center;
      display: table;
      width: 100%;
      height: 100%;

      span {
        display: table-cell;
        vertical-align: middle;
      }

      input {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
</style>
