<template>
  <div class="log-display" :style="dynamicStyle">
    <div class="filter-row">
      <fieldset>
        <legend>Filter logs:</legend>
          <div class="filter-group">
            <label for="includeFilter">Include:</label>
            <input id="includeFilter" :value="include" @change="updateInclude" placeholder="use a regex to filter" />
            <div class="filter-case">
              <label for="includeCaseless">/i</label>
              <input type="checkbox" id="includeCaseless" v-model="includeCaseless">
            </div>
          </div>
          <div class="filter-group">
            <label for="excludeFilter">Exclude:</label>
            <input id="excludeFilter" :value="exclude" @change="updateExclude" placeholder="use a regex to filter" />
            <div class="filter-case">
              <label for="excludeCaseless">/i</label>
              <input type="checkbox" id="excludeCaseless" v-model="excludeCaseless">
            </div>
          </div>
          <div class="filter-group">
            <label for="pluginFilter">Plugin:</label>
            <input id="pluginFilter" v-model.lazy="pluginMatch" placeholder="all plugins" />
            <div class="filter-case">
              <label for="pluginCaseless">/i</label>
              <input type="checkbox" id="pluginCaseless" v-model="pluginCaseless">
            </div>
          </div>

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
    </div>
    <div class="item-count">
      Displaying: {{lineCount}} of {{totalLines}} lines.
    </div>
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
      },
      includeCaseless: {
        get () {
          return this.$store.state.includeCaseless
        },
        set (value) {
          this.$store.commit('updateIncludeCaseless', {value})
        }
      },
      excludeCaseless: {
        get () {
          return this.$store.state.excludeCaseless
        },
        set (value) {
          this.$store.commit('updateExcludeCaseless', {value})
        }
      },
      pluginCaseless: {
        get () {
          return this.$store.state.pluginCaseless
        },
        set (value) {
          this.$store.commit('updatePluginCaseless', {value})
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

<style lang="stylus">
.log-display {
  font-family: monospace;
  text-align: left;
  .filter-row {
    display: flex;
    justify-content: space-between;
  }

  fieldset {
    display: inline-block;
    .filter-group {
      display: inline-flex;
      align-items: center;

      .filter-case {
        display: inline-flex;
        align-items: center;

      }
    }
  }

  .log-items {
    margin-top: 5px;
  }
}
</style>
