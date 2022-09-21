import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App);
app.mount('#app')


app.component('my-comp', {
  template: `
    <div> my Name: {{name}} </div>
  `,
  data() {
    return {
      name: 'zenchen',
    };
  },
})


