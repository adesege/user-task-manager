export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    openModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.onToggleModal(value);
      }
    }
  },
  methods: {
    onToggleModal(value) {
      this.$emit("input", value);
    }
  }
};
