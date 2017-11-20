<template lang="pug">
  .container
    navigate
    .content-center(v-if="serverList.length === 0")
      h1.title There are no servers in this project.
      h2.subtitle Time to deploy some and get your hands dirty.
      a.btn(href="#/deploy-server-form") Deploy Server

    .content(v-if="serverList.length !== 0")
      h1.title Servers

      .action-panel
        input.form-text(type="text" placeholder="Search")
        a.btn(href="#/deploy-server-form") New Server

      table.table
        tr
          th.hr-cell Hostname
          th.hr-cell IPV4 Address
          th.hr-cell Config
          th.hr-cell Address
          th.hr-cell Location
          th.hr-cell Tags
          th.hr-cell
        tr.row(v-for="server in serverList")
          td.cell
            | {{ server.hostname }}
          td.cell
            | 11.111.11.111
          td.cell
            | {{ server.type }}
          td.cell
            | {{ server.os }}
          td.cell
            | {{ server.location }}
</template>

<script>
  import api from '../common/billforwardAPI'
  import {store} from '../common/store'
  import Navigate from './Navigate.vue'

  export default {
    name: 'deploy-server',

    created () {
      api.getAccounts()
        .then(accounts => {
          const accountID = accounts.results[this.currentProject].id
          const serversStorage = JSON.parse(localStorage.getItem(`serverProject-${accountID}`))

          store.commit('setServers', serversStorage || [])
        })
    },

    computed: {
      projectList () {
        return store.state.projectList
      },

      serverList () {
        return store.state.serverList
      },

      currentProject () {
        return store.state.currentProject
      }
    },

    components: {
      Navigate
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 30px;
  }

  .content-center {
    width: 500px;
    margin: auto;
    text-align: center;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .subtitle {
    display: block;
    font-size: 18px;
  }

  .action-panel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .table {
    width: 100%;
  }

  .cell {
    text-align: center;
  }
</style>
