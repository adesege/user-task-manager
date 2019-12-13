import AppProgressCircular from "@/components/app/AppProgressCircular.vue";
import axios from "./axios";

export default Vue => {
  Vue.use(axios);
  Vue.component("app-progress-circular", AppProgressCircular);
};
