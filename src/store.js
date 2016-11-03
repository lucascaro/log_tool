import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sourceLogs: '',
    filterInclude: '',
    includeCaseless: false,
    filterExclude: '',
    excludeCaseless: false,
    filterPlugin: '',
    pluginCaseless: false,
    totalLines: 0,
    filterTypes: [],
    dragging: false,
    settings: {

    }
  },
  getters: {
    parsedLogs: (state) => {
      let block = []
      console.time('parsedLogs')
      const logs = state.sourceLogs.split('\n').reduce((p, c, i, a) => {
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
        state.totalLines = p.length
        return p
      }, [])
      .map((item, i) => {
        return Object.assign({id: i}, item)
      })
      console.timeEnd('parsedLogs')
      return logs
    },
    lineCount: (state, getters) => {
      return getters.filteredLogs.filter(l => l.show).length
    },
    filteredLogs: (state, getters) => {
      console.time('filteredLogs')
      const reInclude = new RegExp(state.filterInclude, state.includeCaseless ? 'i' : '')
      const reExclude = new RegExp(state.filterExclude, state.excludeCaseless ? 'i' : '')
      const rePlugin = new RegExp(state.filterPlugin, state.pluginCaseless ? 'i' : '')
      const filtered = getters.parsedLogs.map(l => {
        const show = (state.filterTypes.length === 0 || state.filterTypes.includes(l.type)) &&
          (!state.filterPlugin || l.plugin.match(rePlugin)) &&
          (!state.filterInclude || l.message.match(reInclude)) &&
          (!state.filterExclude || !l.message.match(reExclude))
        l.show = show
        return Object.assign({show}, l)
      })
      console.timeEnd('filteredLogs')
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
    updateIncludeCaseless: (state, {value}) => {
      state.includeCaseless = value
    },
    updateExcludeCaseless: (state, {value}) => {
      state.excludeCaseless = value
    },
    updatePluginCaseless: (state, {value}) => {
      state.pluginCaseless = value
    },
    updatePluginMatch: (state, {str}) => {
      state.filterPlugin = str
    },
    updateTypeFilters: (state, {types}) => {
      state.filterTypes = types
    },
    updateExclude: (state, {exclude}) => {
      state.filterExclude = exclude
    },
    updateDragging: (state, {value}) => {
      state.dragging = value
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
