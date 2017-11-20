<template lang="pug">
  .component(v-click-outside="hide")
    .user(@click="show")
      img.icon(:src="icons.user")
    .drop-down(v-if="isShow")
      h2.title Personal Setting
      ul.menu
        li.menu-item Profile
        li.menu-item Security
        li.menu-item Notification

      hr.hr

      h2.title Organization Settings
      ul.menu
        li.menu-item Generals
        li.menu-item Users
        li.menu-item Teams
        li.menu-item Licences
        li.menu-item
          a.link(href="#/billing") Billing

      hr.hr

      ul.menu
        li.menu-item Switch Organizations
        li.menu-item New Organization

      hr.hr

      .actions
        a.btn Logout
</template>

<script>
  import {user} from '../assets/icons'
  import clickOutside from '../directives/clickOutside'

  export default {
    name: 'drop-down',

    data () {
      return {
        icons: {
          user
        },
        isShow: false
      }
    },

    directives: {
      'click-outside': clickOutside
    },

    methods: {
      hide () {
        this.isShow = false
      },
      show () {
        this.isShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .component {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .drop-down {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 10;
    min-width: 200px;
    min-height: 200px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 25px 15px;
  }

  .title {
    font-size: 16px;
  }

  .menu {
    list-style-type: none;
    margin: 10px 0;
    padding-left: 15px;
  }

  .menu-item {
    margin: 4px 0;
    cursor: pointer;

    &:hover {
      color: #237AB8;
    }
  }

  .actions {
    padding-top: 10px;
    text-align: center;
  }

  .link {
    color: #2c3e50;

    &:hover {
      color: #237AB8;
    }
  }

  .hr {
    background: #ccc;
  }
</style>
