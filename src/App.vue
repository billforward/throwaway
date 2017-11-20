<template lang="pug">
  #app
    router-view
</template>

<script>
//  import * as _ from 'lodash'
  import api from './common/billforwardAPI'
  import {store} from './common/store'

  export default {
    name: 'app',

    created () {
      api.getAccounts()
        .then(accounts => {
          store.commit('setProjects', accounts.results)
          store.commit('setCurrentProject', 0)

          if (!accounts.results.length) {
            this.$router.push('/deploy-server')
          }
        })
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    display: flex;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  /* UI style */

  .form-element {
    margin: 0 4px;
  }

  .form-text-label {
    font-size: 14px;
  }

  .form-text {
    width: 250px;
    height: 32px;
    padding: 0 4px;
    display: block;
    box-sizing: border-box;
  }

  .form-text.long {
    width: 350px;
  }

  .form-text.short {
    width: 80px;
  }

  .form-select {
    -webkit-appearance: none;
    width: 250px;
    height: 32px;
    border-radius: 0;
    border: 1px solid #e3e3e3;
    padding: 0 8px;
    background: #fff;
    display: block;
  }

  .btn {
    min-width: 100px;
    padding: 3px 16px;
    margin: 0 4px;
    height: 32px;
    border-radius: 3px;
    border: none;
    text-transform: uppercase;
    text-align: center;
    background: #237AB8;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;;
    box-sizing: border-box;
    display: inline-block;
    line-height: 28px;
    text-decoration: none;
  }

  .btn-link {
    background: transparent;
    color: #237AB8;
  }

  .btn-icon {
    background: transparent;
    min-width: auto;
    height: 20px;
    padding: 0;
    margin: 0 8px;
    vertical-align: middle;
  }

  .border-block {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
  }

  .fieldset {
    display: flex;
    border: 1px solid #ccc;
    padding: 15px;
  }

  .link {
    color: #237AB8;
    text-decoration: none;
  }
</style>
