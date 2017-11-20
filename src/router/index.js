import Vue from 'vue'
import Router from 'vue-router'
import CreateProject from '../components/CreateProject.vue'
import CreateProjectForm from '../components/CreateProjectForm.vue'
import DeployServer from '../components/DeployServer.vue'
import DeployServerForm from '../components/DeployServerForm.vue'
import Billing from '../components/Billing.vue'
import Paying from '../components/Paying.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/create-project-form',
      name: 'CreateProjectForm',
      component: CreateProjectForm
    },
    {
      path: '/deploy-server',
      name: 'DeployServer',
      component: DeployServer
    },
    {
      path: '/deploy-server-form',
      name: 'DeployServerForm',
      component: DeployServerForm
    },
    {
      path: '/billing',
      name: 'Billing',
      component: Billing
    },
    {
      path: '/paying/:id',
      name: 'Paying',
      component: Paying
    }
  ]
})
