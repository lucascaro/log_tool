<template>
  <div class="item-count">
    Displaying: {{lineCount}} of {{totalLines}} lines.
  </div>
</template>

<script>
export default {
  name: 'item-count',
  computed: {
    lineCount () {
      return this.$store.getters.lineCount
    },
    totalLines () {
      return this.$store.state.totalLines
    }
  }
}
</script>

<style lang="stylus">
  .item-count {
    flex: 1 100%;
    text-align: center;
  }
</style>
