import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue'
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    //options: { cor: "/my-app/" } //Optional options
}))
Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App),
}).$mount('#app')
