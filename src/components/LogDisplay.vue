<template>
  <div class="log-display">
    <div class="filter-row">
      <filter-logs />
      <filter-types />
    </div>
    <item-count />
    <div class="log-items">
      <log-item-display v-for="item of logItems" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
  import FilterLogs from './FilterLogs'
  import FilterTypes from './FilterTypes'
  import ItemCount from './ItemCount'
  import LogItemDisplay from './LogItemDisplay'

  export default {
    name: 'log-display',
    components: {
      FilterLogs,
      FilterTypes,
      ItemCount,
      LogItemDisplay
    },
    computed: {
      logItems () {
        return this.$store.getters.filteredLogs
      }
    }
  }
</script>

<style lang="stylus">
.log-display {
  font-size: 12px;
  font-family: monospace;
  text-align: left;

  .filter-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .log-items {
    margin-top: 5px;
  }
}
</style>
