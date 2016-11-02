<template>
  <div class="log-display" :style="dynamicStyle">
    <fieldset>
      <legend>Filter logs:</legend>
        Include: <input :value="include" @change="updateInclude" placeholder="use a regex to filter" />
        Exclude: <input :value="exclude" @change="updateExclude" placeholder="use a regex to filter" />
        Plugin: <input v-model.lazy="pluginMatch" placeholder="all plugins" />
    </fieldset>
    <fieldset>
      <legend>Show only logs of these types:</legend>
      <input type="checkbox" id="always" value="always" v-model="checkedTypes">
      <label for="always">Always</label>
      <input type="checkbox" id="okay" value="okay" v-model="checkedTypes">
      <label for="okay">Okay</label>
      <input type="checkbox" id="error" value="error" v-model="checkedTypes">
      <label for="error">Error</label>
      <input type="checkbox" id="warn" value="warn" v-model="checkedTypes">
      <label for="warn">Warn</label>
    </fieldset>
    Displaying: {{lineCount}} of {{totalLines}} lines.
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
      lineCount () {
        return this.$store.getters.lineCount
      },
      totalLines () {
        return this.$store.state.totalLines
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

  fieldset {
    display: inline-block;
  }

  .log-items {
    margin-top: 5px;
  }
}
</style>
