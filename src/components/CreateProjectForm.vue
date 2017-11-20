<template lang="pug">
  .content

    .project-name
      .title Name Your Project
      .form-element
        input.form-text(v-model="projectName")

    hr.hr

    .title Payment Method
    .subtitle We won't charge you until you deploy servers. If you'd like, you can delegate billing to another contact after you create the project.

    .payment-method

      .border-block
        .form-element
          input.form-checkbox(type="checkbox" id="use-payment-method")
          label.form-label(for="use-payment-method") Use Existing Payment Method
        .form-element
          select.form-select(v-model="currentPaymentMethod")
            option(v-for="method in paymentMethods" v-bind:value="method.name")
              | {{method.title}}

      .border-block
        .form-element
          input.form-checkbox(type="checkbox" id="add-payment-method")
          label.form-label(for="add-payment-method") Add Payment Method
        .tabs
          .tab-item.active Use Credit Card
          .tab-item Use PayPal
        .form-element.card
          input.form-text.long(type="text" placeholder="Describe this card for future use")
          input.form-text.long(type="text" placeholder="Name on Card")
          input.form-text.long(type="text" placeholder="**** **** **** ****")
          .card-date
            input.form-text.short(type="text" placeholder="Month")
            input.form-text.short(type="text" placeholder="Year")
            input.form-text.short(type="text" placeholder="CVV")
          .address
            select.form-select.country
              option(disabled selected) Country
            input.form-text.zipcode(type="text" placeholder="Name on Card")

    .actions
      a.btn.btn-link(v-bind:href="projectList ? '#/deploy-server' : '#/'") Cancel
      a.btn(href="#/deploy-server" v-on:click="createAccount()") Create project

</template>

<script>
  import {store} from '../common/store'
  import api from '../common/billforwardAPI'
  import {paymentMethods} from '../common/mockData'

  export default {
    name: 'create-project',

    data () {
      return {
        projectName: 'Project Name',
        currentPaymentMethod: 'credit1',
        paymentMethods
      }
    },

    computed: {
      projectList () {
        return store.state.projectList
      }
    },

    methods: {
      createAccount () {
        const accountBody = {
          profile: {
            companyName: this.projectName
          }
        }

        const creditBody = {
          description: 'Long term customer',
          currency: 'USD',
          value: 999999
        }

        api.createAccount(accountBody)
          .then(account => {
            store.commit('addProject', account.results[0])

            api.addCredit(account.results[0].id, creditBody)
          })
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    padding: 30px;
  }

  .hr {
    margin: 20px 0;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .payment-method {
    display: flex;
  }

  .card {
    width: 370px;
  }

  .tabs {
    display: flex;
  }

  .tab-item {
    margin-right: 8px;
    cursor: pointer;
  }

  .tab-item.active {
    border-bottom: 2px solid #237AB8;
  }

  .form-text {
    margin: 8px 0;
  }

  .card-date, .address {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
  }

  .border-block {
    margin-right: 20px;
  }

  .country {
    width: 150px;
  }

  .zipcode {
    width: 150px;
  }

  .actions {
    padding: 30px 35px;
    display: flex;
    justify-content: flex-end;
  }
</style>
