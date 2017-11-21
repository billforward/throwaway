<template lang="pug">
  .container
    navigate
    .content
      fieldset.fieldset
        legend Reserved
        .line-block(v-for="(server, index) in servers")
          .form-element
            label.form-text-label(for="hostname") Hostname
            input.form-text(type="text" id="hostname" v-model="server.hostname")
          .form-element
            label.form-text-label
              | Type &nbsp;
              a(href="") View Server Specs
            select.form-select(v-model="server.type")
              option(value="" disabled hidden) Select
              option(v-for="type in typesList" v-bind:value="type.name")
                | {{type.name}}
          .form-element
            label.form-text-label OS
            select.form-select(v-model="server.os")
              option(value="" disabled hidden) Select a Type first
              option(v-for="type in os" v-bind:value="type.title")
                | {{type.title}}
          .form-element
            label.form-text-label Location
            select.form-select(v-model="server.location")
              option(value="" disabled hidden) Select
              option(v-for="location in locations" v-bind:value="location.title")
                | {{location.title}}
          .options
            .btn.btn-icon
              img(:src="icons.cog")
            .btn.btn-icon(v-on:click="addServer(index)")
              img(:src="icons.fileAdd")

    .actions
      a.btn.btn-link(href="#/deploy-server") Cancel
      a.btn(href="#/deploy-server" v-on:click="deploy()") Deploy
</template>

<script>
  import * as _ from 'lodash'
  import {store} from '../common/store'
  import api from '../common/billforwardAPI'
  import {os, locations} from '../common/mockData'
  import {cog, fileAdd} from '../assets/icons'
  import Navigate from './Navigate.vue'

  export default {
    name: 'deploy-server-form',

    data () {
      return {
        icons: {
          cog,
          fileAdd
        },
        servers: [],
        os,
        locations
      }
    },

    computed: {
      serverList () {
        return store.state.serverList
      },

      typesList () {
        return store.state.typeList
      },

      projectList () {
        return store.state.projectList
      },

      currentProject () {
        return store.state.currentProject
      }
    },

    created () {
      api.getPlans()
        .then(plans => {
          store.commit('setTypes', plans.results)
        })

      const newServer = {
        hostname: '',
        type: '',
        os: '',
        location: ''
      }

      _.assignIn(this.servers, [newServer])
    },

    methods: {
      addServer (index) {
        this.servers.push(_.assignIn({}, this.servers[index]))
      },

      deploy () {
        const accountID = this.projectList[this.currentProject].id
        const subscription = this.getSubscription()

        if (!this.serverList.length) {
          api.setSubscriptions(subscription).then(() => {
            store.commit('setServers', this.servers)

            localStorage.setItem(`serverProject-${accountID}`, JSON.stringify(this.servers))
          })
        } else {
          api.getSubscriptions(accountID).then(subscriptions => {
            const subscriptionID = subscriptions.results[0].id

            api.addSubscription(subscriptionID, subscription).then(() => {
              store.commit('addServer', this.servers)

              localStorage.setItem(`serverProject-${accountID}`, JSON.stringify(store.state.serverList))
            })
          })
        }
      },

      getSubscription () {
        const {accountID, companyName = ''} = store.state.projectList[this.currentProject].profile

        return {
          accountID,
          name: 'Subsc',
          currency: 'USD',
          groups: [
            {
              name: companyName,
              plans: this.getPlan()
            }
          ],
          state: 'AwaitingPayment'
        }
      },

      getPlan () {
        const types = []
        const servers = this.serverList.concat(this.servers)

        servers.forEach(server => {
          const typePath = _.find(this.typesList, {name: server.type}).path

          if (_.find(types, {typePath})) {
            _.find(types, {typePath}).count += 1
          } else {
            types.push({typePath, count: 1})
          }
        })

        return types.map(type => {
          return {
            planPath: type.typePath,
            quantities: {
              Servers: type.count
            }
          }
        })
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

  .options {
    padding-top: 28px;
    margin: 0 8px;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .line-block {
    display: flex;
  }

  .actions {
    padding: 30px 35px;
    display: flex;
    justify-content: flex-end;
  }
</style>
