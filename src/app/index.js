import Vue from 'vue';
import App from './components/App.vue';

new Vue({
    render: h => h(App)       //render App component
}) .$mount('#app');           // # is for div this mount say <div id:app>