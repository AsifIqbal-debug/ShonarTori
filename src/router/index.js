import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TrackOrderPage from '../views/TrackOrderPage.vue'
import ShippingInfoPage from '../views/ShippingInfoPage.vue'
import ReturnPolicyPage from '../views/ReturnPolicyPage.vue'
import SizeGuidePage from '../views/SizeGuidePage.vue'
import FaqPage from '../views/FaqPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/track-order',
    name: 'TrackOrder',
    component: TrackOrderPage
  },
  {
    path: '/shipping-info',
    name: 'ShippingInfo',
    component: ShippingInfoPage
  },
  {
    path: '/return-policy',
    name: 'ReturnPolicy',
    component: ReturnPolicyPage
  },
  {
    path: '/size-guide',
    name: 'SizeGuide',
    component: SizeGuidePage
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FaqPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
