<template lang="pug">
  .container
    navigate
    .content
      h1.title Pay Invoice
      .content-block
        .form-element
          label.form-label(for="ob") Outstanding Balance
          input.form-text(value="1000" type="text" id="ob")
        .form-element
          label.form-label(for="pa") Payment Amount
          input.form-text(value="50" type="text" id="pa")
        .form-element
          label.form-label Payment Method
          select.form-select(v-model="currentPaymentMethod" disabled)
            option(value="" selected) Payment Method 1

    .actions
      a.btn.btn-link(href="#/billing") Cancel
      a.btn(v-on:click="pay()") Pay now
</template>

<script>
  import Navigate from './Navigate.vue'
  import api from '../common/billforwardAPI'
  import {serverList} from '../common/store'

  export default {
    name: 'paying',

    data () {
      return {
        currentPaymentMethod: ''
      }
    },

    methods: {
      pay () {
        const invoiceId = this.$route.params.id

        // TODO: BillForward pay method
        api.pay(invoiceId).then(response => {
          console.log(response)
          serverList[invoiceId].invoice.isPaid = true

          this.$router.push('/billing')
        })
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
    flex-direction: column;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .form-element {
    margin-bottom: 15px;
  }

  .actions {
    padding: 30px 35px;
    display: flex;
    justify-content: flex-end;
  }
</style>
