import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/element'
import './styles/base.scss'
// 带入request.js
import './utils/request'
import './utils/filter'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
