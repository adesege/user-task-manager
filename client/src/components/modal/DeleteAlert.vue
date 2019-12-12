<template>
  <v-dialog v-model="openModal" width="500">
    <v-card>
      <v-card-text class="pa-10 text-center">
        <p class="title warning--text mb-0">
          Are you sure you want to delete this item?
        </p>
        <p class="subtitle-1">This action cannot be undone.</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-layout>
          <v-flex>
            <v-btn
              color="error"
              block
              text
              :loading="isLoading"
              :disabled="isLoading"
              @click="onDelete"
              >Delete</v-btn
            >
          </v-flex>
          <v-flex>
            <v-btn color="secondary" block text @click="onToggleModal(false)"
              >Cancel</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import modalMixin from "@/mixins/modal.mixin";

export default {
  props: {
    userId: {
      type: String,
      default: ""
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  mixins: [modalMixin],
  methods: {
    async onDelete() {
      this.$emit("onDelete");
    }
  }
};
</script>
