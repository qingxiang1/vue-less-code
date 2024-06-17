// import.meta.env.VITE_API 
import { createApp } from 'vue';
import "/public/global.less";
import "/public/fonts/iconfont.css";
import "/public/fonts/demo.css";

import EventEmitter from 'eventemitter3';

import Router from './router';
import App from './App.vue';

window._EE_ = new EventEmitter(); // 通信

const app = createApp(App);

app.use(Router);

app.mount('#root');