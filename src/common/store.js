// import * as _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    projectList: [],
    serverList: [],
    typeList: [],
    invoiceList: [],
    currentProject: 0
  },
  mutations: {
    setProjects (state, projects) {
      state.projectList = projects
    },

    addProject (state, project) {
      state.projectList.unshift(project)
    },

    setCurrentProject (state, index) {
      state.currentProject = index
    },

    setServers (state, servers) {
      state.serverList = servers
    },

    addServer (state, server) {
      state.serverList = state.serverList.concat(server)
    },

    setTypes (state, types) {
      state.typeList = types
    },

    setInvoices (state, invoices) {
      state.invoiceList = invoices
    }
  }
})

/**
 {
   hostname: string,
   type: string,
   os: string,
   location: string,
   invoice: {
     issueDate: string,
     total: string,
     balance: string,
     isPaid: boolean
   }
 }
 * */
export const serverList = []
export const projectList = []
