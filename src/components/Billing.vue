<template lang="pug">
  .container
    navigate
    .content
      h1.title Organization
      .content-block
        ul.menu
          li.menu-item General
          li.menu-item Users
          li.menu-item Reserved Hardware
          li.menu-item Billing
          li.menu-item Payment Methods
          li.menu-item Logout

        .billing
          .info
            .past-day
              .subtitle 30 Days Past Due
              .sum 0$
              .subtitle 60 Days Past Due
              .sum 0$
            .payment-method
              .info-header
                .subtitle Payment Method
                .options
                  .btn.btn-icon
                    img(:src="icons.cog")
              .card-number
                | **** **** **** 1111
            .billing-contact
              .info-header
                .subtitle Billing Contact
                .options
                  .btn.btn-icon
                    img(:src="icons.cog")
              .info-contact
                .contact-title Scrooge McDuck
                .contact-mail smcduck@xmascarol.net
                .contact-vat VAT: 1111

          .recent-invoice
            .title Recent Invoices

            table.table
              tr
                th.hr-cell Issue date
                th.hr-cell Total
                th.hr-cell Outstanding balance
                th.hr-cell
              tr.row(v-for="(invoice, index) in invoiceList" v-if="invoiceList.length !== 0")
                td.cell
                  | {{invoice.created}}
                td.cell
                  | {{invoice.invoiceCost}}
                td.cell
                  | {{invoice.invoiceCost - invoice.invoicePaid}}
                td.cell
                  .btn(v-if="invoice.state === 'Pending'" v-on:click="payInvoice(index)") Pay
                  .status.status_paid(v-if="invoice.state === 'Paid'") Paid
                  a.btn.btn-icon(:href="invoiceHTML(index)" target="_blank")
                    img(:src="icons.eye")
                  a.btn.btn-icon(:href="invoicePDF(index)")
                    img(:src="icons.download")
</template>

<script>
  import {store} from '../common/store'
  import api from '../common/billforwardAPI'
  import {cog, eye, download} from '../assets/icons'
  import Navigate from './Navigate.vue'

  export default {
    name: 'billing',

    data () {
      return {
        icons: {
          cog,
          eye,
          download
        }
      }
    },

    computed: {
      invoiceList () {
        return store.state.invoiceList
      },

      currentProject () {
        return store.state.currentProject
      }
    },

    created () {
      api.getAccounts().then(() => {
        const accountID = store.state.projectList[this.currentProject].profile.accountID

        api.getInvoice(accountID)
          .then(invoices => {
            store.commit('setInvoices', invoices.results)
          })
      })
    },

    methods: {
      payInvoice (index) {
        const invoiceID = store.state.invoiceList[index].id

        api.payInvoice(invoiceID).then(() => {
          store.commit('payInvoice', index)
        })
      },

      invoiceHTML (index) {
        const invoiceID = store.state.invoiceList[index].id

        return `https://api-packet.billforward.net/v1/invoices/${invoiceID}.html?access_token=59b72a25-3c7c-4b28-bb05-758a00aef86d`
      },

      invoicePDF (index) {
        const invoiceID = store.state.invoiceList[index].id

        return `https://api-packet.billforward.net/v1/invoices/${invoiceID}.pdf?access_token=59b72a25-3c7c-4b28-bb05-758a00aef86d`
      }
    },

    components: {
      Navigate
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 30px;
  }

  .content-block {
    display: flex;
    justify-content: flex-start;
  }

  .billing {
    border: 1px solid #ccc;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .subtitle {
    display: block;
    font-size: 18px;
    font-weight: 500;
  }

  .menu {
    min-width: 250px;
    display: flex;
    flex-direction: column;
    list-style-type: none;

    .menu-item {
      padding: 4px 0;
      cursor: pointer;
    }
  }

  .past-day,
  .payment-method,
  .billing-contact {
    padding: 15px;
    border: 1px solid #ccc;
    width: 200px;
    margin: 10px;
  }

  .card-number {
    background: #ddd;
    padding: 5px 10px;
    font-weight: 600;
  }

  .recent-invoice {
    padding: 0 20px;
  }

  .table {
    width: 100%;
    margin: 15px 0;

    .cell {
      text-align: left;
      padding-bottom: 5px;
    }

    .hr-cell {
      text-align: left;
      padding-bottom: 10px;
    }
  }

  .status {
    display: inline-block;
    text-align: center;
    margin: 0 4px;

    &_paid {
      min-width: 100px;
      color: green  ;
    }
  }
</style>
