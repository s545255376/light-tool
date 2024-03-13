import Vue from 'vue'
import App from './App.vue'
import lightTable from"light-table"

Vue.use(lightTable)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
