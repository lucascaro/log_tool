<template>
  <div id="app">
    <img src="./assets/logo.png">
    <log-input></log-input>
    <log-display></log-display>
  </div>
</template>

<script>
import LogInput from './components/LogInput'
import LogDisplay from './components/LogDisplay'
import store from './store'

export default {
  name: 'app',
  store,
  components: {
    LogInput,
    LogDisplay
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;

  img {
    height: 20px;
  }
}
</style>
