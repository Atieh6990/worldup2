import Vue from 'vue'
import './worldcup/styles/styles.css'
import './worldcup/styles/webview.css'
import App from './App.vue'
import router from './worldcup/router'
import store from './worldcup/store'
import { ROAST_CONFIG } from './worldcup/js/config'
import { hydrateTokenFromCookie } from './worldcup/js/tokenCookie'
import { resolveTeamImageUrl } from './worldcup/js/wImgUrl'
import { initWebViewShell, repaintWebViewPanel } from './worldcup/js/webviewShell'
import routePageLayout from './worldcup/components/layout/routePageLayout'

initWebViewShell()

router.afterEach(() => {
  repaintWebViewPanel()
})

hydrateTokenFromCookie()

Vue.config.productionTip = false
Vue.component('routePageLayout', routePageLayout)
Vue.prototype.wImg = function (fileName) {
  return ROAST_CONFIG.resolveWImg(fileName)
}
Vue.prototype.teamImg = function (path) {
  return resolveTeamImageUrl(path, ROAST_CONFIG.TEAM_IMAGE_BASE_URL)
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
