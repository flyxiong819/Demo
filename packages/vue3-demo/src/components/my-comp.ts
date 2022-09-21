import { ref } from 'vue';
import { useAdd } from '../business';

export default {
  setup() {
    const count = ref(99);
    const mysum = useAdd(count, 1);
    return {
      count,
      mysum,
    }
  },
  template:
    `<button @click="count++">
      You clicked me {{ count }} times.
    </button>
    <div>mysum: {{mysum}}</div>
    `,
}

