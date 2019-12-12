<template>
  <v-dialog v-model="openModal" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ actionType === "edit" ? "Edit user" : "Add user" }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid" class="mt-5">
          <v-text-field
            label="Name"
            v-model="formData.name"
            :rules="[validationRule.required]"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          block
          :loading="getIsSavingUser"
          :disabled="!isFormValid || getIsSavingUser"
          @click="onSave"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import validationRuleMixin from "@/mixins/validationRule.mixin";
import modalMixin from "@/mixins/modal.mixin";

export default {
  props: {
    userId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFormValid: false,
      formData: {
        name: "",
        userId: ""
      }
    };
  },
  mixins: [validationRuleMixin, modalMixin],
  computed: {
    ...mapGetters({
      getIsSavingUser: "user/getIsSavingUser"
    }),
    getUser() {
      return this.$store.getters["user/getUsers"](this.userId);
    },
    actionType() {
      return this.userId ? "edit" : "add";
    }
  },
  mounted() {
    if (this.actionType === "edit") {
      this.formData.name = this.getUser.name;
      this.formData.userId = this.userId;
    }
  },
  methods: {
    async onSave() {
      try {
        await this.$store.dispatch("user/saveUser", {
          ...this.formData,
          actionType: this.actionType
        });
        this.onToggleModal(false);
      } catch (error) {
        //
      }
    }
  }
};
</script>
