import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import Triangle from '../views/Triangle';
import Calendar from '../views/Calendar';
import Telecom from '../views/Telecom';
import UnitTest from '../views/UnitTest';
import Layout from '../components/Layout';
import ComputerSalesSystem from '../views/ComputerSalesSystem';
import IntegrationTest from '../views/IntegrationTest';
import RegressionTest from '../views/RegressionTest';
import Sales from '../views/Sales';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Layout,
      children: [{
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/triangle',
        name: 'Triangle',
        component: Triangle
      },
      {
        path: '/telecom',
        name: 'Telecom',
        component: Telecom
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: '/computer',
        name: 'ComputerSalesSystem',
        component: ComputerSalesSystem
      },
      {
        path: '/unittest',
        name: 'UnitTest',
        component: UnitTest
      },
      {
        path: '/integrationtest',
        name: 'IntegrationTest',
        component: IntegrationTest,
      },
      {
        path: '/regressiontest',
        name: 'RegressionTest',
        component: RegressionTest,
      },
      {
        path: '/sales',
        name: 'Sales',
        component: Sales,
      }
      ],
      meta: {
        index: 1
      }
    },
  ]
})

export default router
