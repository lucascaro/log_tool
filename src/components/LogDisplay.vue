<template>
  <div class="log-display" :style="dynamicStyle">
  Include: <input :value="include" @change="updateInclude" />
  Exclude: <input :value="exclude" @change="updateExclude" />
  Types:
  <input type="checkbox" id="always" value="always" v-model="checkedTypes">
  <label for="always">Always</label>
  <input type="checkbox" id="okay" value="okay" v-model="checkedTypes">
  <label for="okay">Okay</label>
  <input type="checkbox" id="error" value="error" v-model="checkedTypes">
  <label for="error">Error</label>
  <input type="checkbox" id="warn" value="warn" v-model="checkedTypes">
  <label for="warn">Warn</label>
    <ul>
      <li v-for="item of logItems" :class="item.type" v-show="item.show">
        <log-item-display :item="item" />
      </li>
    </ul>
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

  ul {
    list-style: none;
    padding:0;

    li {
      padding: 2px 0;
      border-bottom: 1px solid #ddd;

      &.error {
        background: #faa;
      }

      &.warn {
        background: #ffa;
      }

      &.okay {
        background: #afa;
      }

      &.always {
        background: #eee;
      }
    }
  }
}
</style>
