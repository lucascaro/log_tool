<template>
  <div class="log-item" @click="showToggle()" v-show="item.show" :class="[{open: showChildren, multi: !!item.children }, item.type]">
    <template v-if="item.type">
      <span class="time">{{item.time}}</span>
      <span class="type">{{item.type}}</span>
      <span class="plugin">{{item.plugin}}</span>
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


<style lang="stylus">
  .log-item {
    position: relative;
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

    span {
      padding: 2px 5px;
    }
    &.multi:after {
      position: absolute;
      top: 0;
      right: 3px;
      content: "+";
    }

    &.multi.open:after {
      content: "-";
    }

    .children {
      border: 1px solid #ddd;

      .message {
        padding-left: 50px;
      }
    }
  }
</style>
