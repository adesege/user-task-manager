export default {
  computed: {
    validationRule() {
      return {
        required: value =>
          (value && String(value) && !!String(value).length) || "Required"
      };
    }
  }
};
