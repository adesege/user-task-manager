<template>
  <v-snackbar v-model="getNotification.isOpen" :type="getNotification.type">
    {{ getNotification.message }}
    <v-btn color="primary" text @click="onClose">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getNotification: "notification/getNotification"
    })
  },
  methods: {
    onClose() {
      this.$store.dispatch("notification/clearNotification");
    }
  }
};
</script>
