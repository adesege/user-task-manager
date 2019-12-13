<template>
  <v-dialog v-model="openModal" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ actionType === "edit" ? "Edit task" : "Add task" }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid" class="mt-5">
          <v-textarea
            label="Description"
            v-model="formData.description"
            :rules="[validationRule.required]"
          />
          <v-switch
            v-model="formData.state"
            label="done"
            false-value="todo"
            true-value="done"
            color="success"
            :rules="[validationRule.required]"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary"
          block
          :loading="getIsSavingTask"
          :disabled="!isFormValid || getIsSavingTask"
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
    },
    taskId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFormValid: false,
      formData: {
        description: "",
        state: "todo",
        userId: "",
        taskId: ""
      }
    };
  },
  mixins: [validationRuleMixin, modalMixin],
  computed: {
    ...mapGetters({
      getIsSavingTask: "task/getIsSavingTask"
    }),
    getTask() {
      return this.$store.getters["task/getTasks"](this.taskId);
    },
    actionType() {
      return this.taskId ? "edit" : "add";
    }
  },
  mounted() {
    if (this.actionType === "edit") {
      this.formData.description = this.getTask.description;
      this.formData.state = this.getTask.state;
      this.formData.userId = this.userId;
      this.formData.taskId = this.taskId;
    }
  },
  methods: {
    async onSave() {
      try {
        await this.$store.dispatch("task/saveTask", {
          ...this.formData,
          userId: this.userId,
          taskId: this.taskId,
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
