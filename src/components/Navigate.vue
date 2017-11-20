<template lang="pug">
  .navigate

    select.form-select.country(v-model="current" v-on:change="setCurrentProject(current)")
      option(v-for="(project, index) in projectList" v-bind:value="index" v-bind:selected="index === currentProject")
        | {{project.profile.companyName}}

    a.btn(href="#/create-project-form") New Project

    ul.menu
      li.menu-item(v-bind:class="{active: path === '/deploy-server' || path === '/deploy-server-form'}")
        router-link(to="/deploy-server") Servers
      li.menu-item IPs & Networks
      li.menu-item Storage
      li.menu-item Project Settings

    drop-down
</template>

<script>
  import {store} from '../common/store'
  import DropDown from './DropDown.vue'
  import clickOutside from '../directives/clickOutside'

  export default {
    name: 'navigate',

    data () {
      return {
        path: this.$route.path,
        current: 0
      }
    },

    created () {
      this.current = store.state.currentProject
    },

    computed: {
      projectList () {
        return store.state.projectList
      },

      currentProject () {
        return store.state.currentProject
      }
    },

    methods: {
      setCurrentProject (index) {
        store.commit('setCurrentProject', index)
      }
    },

    components: {
      DropDown
    },

    directives: {
      'click-outside': clickOutside
    }
  }
</script>

<style scoped>
  .navigate {
    display: -webkit-box;
    padding: 20px 35px;
    align-items: center;
    background: #16293e;
  }

  .menu {
    display: flex;
    list-style-type: none;
    margin: 0;
  }

  .menu-item, .menu-item a {
    color: #fff;
    padding: 3px 0;
    margin: 0 10px;
    cursor: pointer;
    text-decoration: none;
  }

  .menu-item.active {
    border-bottom: 2px solid #fff;
  }

  .user.icon {

  }
</style>
