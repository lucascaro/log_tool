<template>
  <div class="log-item" @click="showToggle()" :class="{open: showChildren, multi: !!item.children }">
    <template v-if="item.type">
      <span class="time">{{item.time}}</span>
      <span class="type">{{item.type}}</span>
      <span class="message">{{item.message}}</span>
      <div class="children" v-show="showChildren" v-if="!!item.children">
        <div class="child" v-for="child in item.children">
          <span class="time">{{child.time}}</span>
          <span class="type">{{child.type}}</span>
          <span class="message">{{child.message}}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <span class="message">{{item.message}}</span>
    </template>
    <div class="toggle-icon"></div>
  </div>
</template>

<script>
  export default {
    name: 'log-item-display',
    props: ['item'],
    data () {
      return {
        showChildren: false
      }
    },
    methods: {
      showToggle () {
        this.showChildren = !this.showChildren
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .log-item {
    position: relative;

    &.multi:after {
      position: absolute;
      top: 0;
      right: 3px;
      content: "+";
    }

    &.multi.open:after {
      content: "-";
    }
  }
</style>
