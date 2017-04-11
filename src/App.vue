<template>
  <div id="app"
    @dragenter="dragging = true"
    :class="{dragging}"
    >
    <div class="ui">
      <a href="https://github.com/lucascaro/log_tool">Code and feedback on github</a>
      <br>
      <img src="./assets/logo.png">
      <log-input></log-input>
      <log-display></log-display>
    </div>
    <file-dropper v-if="dragging" ></file-dropper>
  </div>
</template>

<script>
import LogInput from './components/LogInput'
import LogDisplay from './components/LogDisplay'
import FileDropper from './components/FileDropper'
import store from './store'

export default {
  name: 'app',
  store,
  computed: {
    dragging: {
      get () {
        return store.state.dragging
      },
      set (value) {
        return store.commit('updateDragging', {value})
      }
    }
  },
  components: {
    LogInput,
    LogDisplay,
    FileDropper
  }
}

</script>

<style lang="stylus">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  background: #fff;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  img {
    margin-top: 10px;
    height: 20px;
  }

  &.dragging ui * {
    pointer-events: none;
  }
}
</style>
