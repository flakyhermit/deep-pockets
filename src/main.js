import Vue from 'vue'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/js/all.js'
import App from './App.vue'
import Buefy from 'buefy'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
