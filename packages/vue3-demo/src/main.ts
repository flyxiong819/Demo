import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App);
app.mount('#app')


app.component('MyComp', {
  data() {
    return {
      name: 'zenchen',
    };
  },
  template: `
    <div> my Name: {{name}} </div>
  `,
})


