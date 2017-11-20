import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://api-packet.billforward.net/v1'
Vue.http.headers.common['Authorization'] = 'Bearer 59b72a25-3c7c-4b28-bb05-758a00aef86d'

export default {

  getAccounts (id) {
    return Vue.http.get(`accounts/${id || ''}`).then(response => response.body)
  },

  createAccount (query) {
    return Vue.http.post('accounts', query || {}).then(response => response.body)
  },

  addCredit (accountID, query) {
    return Vue.http.post(`accounts/${accountID}/credit`, query || {})
  },

  deleteAccount (id) {
    return Vue.http.delete(`accounts/${id}`)
  },

  getSubscriptions (accountID) {
    return Vue.http.get(`https://api-packet.billforward.net/v2/subscriptions?account-id=${accountID}`).then(response => response.body)
  },

  setSubscriptions (query) {
    return Vue.http.post('https://api-packet.billforward.net/v2/subscriptions', query || {}).then(response => response.body)
  },

  addSubscription (subscriptionID, query) {
    return Vue.http.put(`https://api-packet.billforward.net/v2/subscriptions/${subscriptionID}`, query || {}).then(response => response.body)
  },

  getPlans (id) {
    return Vue.http.get('plans/**', id || {}).then(response => response.body)
  },

  getInvoice (accountID, query) {
    return Vue.http.get(`invoices/account/${accountID}`, query || {}).then(response => response.body)
  },

  payInvoice (invoiceID, query) {
    return Vue.http.post(`invoices/${invoiceID}/execute`, query || {}).then(response => response.body)
  }
}
