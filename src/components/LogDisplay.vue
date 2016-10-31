<template>
  <div class="log-display" :style="dynamicStyle">
  Include: <input :value="include" @change="updateInclude" />
  Exclude: <input :value="exclude" @change="updateExclude" />
  Plugin: <input v-model.lazy="pluginMatch" />
  Types:
  <input type="checkbox" id="always" value="always" v-model="checkedTypes">
  <label for="always">Always</label>
  <input type="checkbox" id="okay" value="okay" v-model="checkedTypes">
  <label for="okay">Okay</label>
  <input type="checkbox" id="error" value="error" v-model="checkedTypes">
  <label for="error">Error</label>
  <input type="checkbox" id="warn" value="warn" v-model="checkedTypes">
  <label for="warn">Warn</label>
  <div class="log-items">
    <log-item-display v-for="item of logItems" :key="item.id" :item="item" />
  </div>
  </div>
</template>

<script>
  import LogItemDisplay from './LogItemDisplay'

  export default {
    name: 'log-display',
    components: {
      LogItemDisplay
    },
    data () {
      return {
      }
    },
    computed: {
      include () {
        return this.$store.state.filterInclude
      },
      exclude () {
        return this.$store.state.filterExclude
      },
      logItems () {
        return this.$store.getters.filteredLogs
      },
      dynamicStyle () {
        return {
          fontSize: '12px'
        }
      },
      pluginMatch: {
        get () {
          return this.$store.state.filterPlugin
        },
        set (str) {
          this.$store.commit('updatePluginMatch', {str})
        }
      },
      checkedTypes: {
        get () {
          return this.$store.state.filterTypes
        },
        set (types) {
          this.$store.commit('updateTypeFilters', {types})
        }
      }
    },
    methods: {
      updateInclude (e) {
        this.$store.commit('updateInclude', {include: e.target.value})
      },

      updateExclude (e) {
        this.$store.commit('updateExclude', {exclude: e.target.value})
      }
    }
  }
</script>

<style lang="stylus" scoped>
.log-display {
  font-family: monospace;
  text-align: left;
}
</style>
