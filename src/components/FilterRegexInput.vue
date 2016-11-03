<template>
  <div class="filter-group">
    <label :for="filterId">{{capName}}:</label>
    <input :id="filterId" :value="filterName" v-model.lazy="filterValue" placeholder="use a regex to filter" />
    <div class="filter-case">
      <label :for="caselessId">/i</label>
      <input type="checkbox" :id="caselessId" v-model="isCaseless">
    </div>
  </div>
</template>


<script>
export default {
  name: 'filter-regex-input',
  props: [
    'filterName'
  ],
  computed: {
    filterId () {
      return 'filter-' + this.filterName
    },
    caselessId () {
      return 'filter-caseless-' + this.filterName
    },
    capName () {
      return this.filterName.charAt(0).toUpperCase() + this.filterName.slice(1)
    },
    filterValue: {
      get () {
        return this.$store.state[`filter${this.capName}`]
      },
      set (value) {
        this.$store.commit(`update${this.capName}`, {value})
      }
    },
    isCaseless: {
      get () {
        return this.$store.state[`${this.filterName}Caseless`]
      },
      set (value) {
        this.$store.commit(`update${this.capName}Caseless`, {value})
      }
    }
  }
}
</script>

<style lang="stylus">
  .filter-group {
    display: inline-flex;
    align-items: center;

    .filter-case {
      display: inline-flex;
      align-items: center;

    }
  }
</style>
