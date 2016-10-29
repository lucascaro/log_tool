import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sourceLogs: '',
    filterInclude: '',
    filterExclude: '',
    filterPlugin: '',
    filterTypes: [],
    settings: {

    }
  },
  getters: {
    parsedLogs: (state) => {
      let block = []
      return state.sourceLogs.split('\n').reduce((p, c, i, a) => {
        if (block.length === 0) {
          if (!isBlockMarker(c)) {
            p.push(parseSingleLine(c))
          } else {
            block.push(c)
          }
        } else {
          block.push(c)
          if (isBlockMarker(c)) {
            // Block finished
            p.push(parseMultiLine(block))
            block = []
          }
        }
        return p
      }, [])
      // return state.sourceLogs.split('\n').map(m => {
      //   return parseSingleLine(m)
      // })
    },
    filteredLogs: (state, getters) => {
      const reInclude = new RegExp(state.filterInclude)
      const reExclude = new RegExp(state.filterExclude)
      const rePlugin = new RegExp(state.filterPlugin)
      const filtered = getters.parsedLogs.filter(l => {
        return (state.filterTypes.length === 0 || state.filterTypes.includes(l.type)) &&
          (!state.filterPlugin || l.plugin.match(rePlugin)) &&
          (!state.filterInclude || l.message.match(reInclude)) &&
          (!state.filterExclude || !l.message.match(reExclude))
      })
      return filtered
    }
  },
  mutations: {
    updateSource: (state, {src}) => {
      state.sourceLogs = src || ''
    },
    updateInclude: (state, {include}) => {
      state.filterInclude = include
    },
    updatePluginMatch: (state, {str}) => {
      state.filterPlugin = str
    },
    updateTypeFilters: (state, {types}) => {
      state.filterTypes = types
    },
    updateExclude: (state, {exclude}) => {
      state.filterExclude = exclude
    }
  }
})

function isBlockMarker (line) {
  return line.match(/--- (Begin|End) Multiline/)
}

function parseMultiLine (block) {
  const item = parseSingleLine(block.shift())
  const children = block.slice(0, -1).map(parseSingleLine)
  const parent = children[0]
  parent.children = [item].concat(children)
  return parent
}

function parseSingleLine (line) {
  const [time, logType, plugin, message] = line.split('|')
  return {
    time: time || '',
    plugin: message ? plugin : '',
    type: logType ? logType.trim().toLowerCase() : '',
    message: message || plugin || line,
    show: true,
    children: false
  }
}

export default store
