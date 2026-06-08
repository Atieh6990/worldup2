import Vue from 'vue'
import './worldcup/styles/styles.css'
import './worldcup/styles/webview.css'
import App from './App.vue'
import router from './worldcup/router'
import store from './worldcup/store'
import { ROAST_CONFIG } from './worldcup/js/config'
import { initWebViewShell } from './worldcup/js/webviewShell'
import routePageLayout from './worldcup/components/layout/routePageLayout'

initWebViewShell()

try {
  localStorage.clear()
} catch (e) {}

Vue.config.productionTip = false
Vue.component('routePageLayout', routePageLayout)
Vue.prototype.wImg = function (fileName) {
  return ROAST_CONFIG.resolveWImg(fileName)
}
try {
  window.$ = window.jQuery = require('jquery');
} catch (e) {
}
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
