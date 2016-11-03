<template>
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
</template>

<script>
  export default {
    name: 'filter-types',
    computed: {
      checkedTypes: {
        get () {
          return this.$store.state.filterTypes
        },
        set (types) {
          this.$store.commit('updateTypeFilters', {types})
        }
      }
    }
  }
</script>

<style lang="stylus">

</style>
