<template>
  <fieldset>
    <legend>Filter logs:</legend>
      <filter-regex-input filterName="include" />
      <filter-regex-input filterName="exclude" />
      <filter-regex-input filterName="plugin" />
  </fieldset>
</template>

<script>
  import FilterRegexInput from './FilterRegexInput'

  export default {
    name: 'filter-logs',
    components: {
      FilterRegexInput
    }
  }
</script>
