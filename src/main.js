import Vue from 'vue'
import App from './App.vue'
import router from './worldcup/router'
import store from './worldcup/store'

Vue.config.productionTip = false
try {
  window.$ = window.jQuery = require('jquery');
} catch (e) {
}
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
tizen.tvinputdevice.getSupportedKeys().forEach(function (k) {
  //console.log(k.name + ' - ' + k.code);
  if ([37, 38, 39, 40, 48, 49, 50, 51, 13, 8, 52, 53, 54, 55, 56, 57, 10190, 10009, 10182, 46, 65376, 65385, 412, 413, 415, 417, 19, 427, 428
  ].indexOf(k.code) > -1) {
    tizen.tvinputdevice.registerKey(k.name);
  }
});
