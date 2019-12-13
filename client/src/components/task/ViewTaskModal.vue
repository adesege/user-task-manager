<template>
  <v-dialog v-model="openModal" width="960">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title
        >{{ getUser.name }}'s tasks</v-card-title
      >

      <v-card-text>
        <task-modal
          v-if="isOpenManageTaskModal"
          v-model="isOpenManageTaskModal"
          :userId="userId"
          :taskId="selectedTaskId"
        />
        <delete-alert
          v-if="isOpenDeleteAlert"
          v-model="isOpenDeleteAlert"
          :is-loading="getIsDeletingTask"
          @onDelete="onDeleteTask"
        />

        <v-btn color="primary" text class="mt-5" @click="onOpenManageTaskModal"
          >Add Task</v-btn
        >
        <v-row v-if="!getIsLoading && getTasks.length">
          <v-col v-for="item in getTasks" :key="item.key" cols="4">
            <task-list
              :item="item"
              @editTask="onOpenManageTaskModal"
              @deleteTask="onOpenDeleteAlert"
            />
          </v-col>
        </v-row>
        <v-alert v-else-if="!getTasks.length"
          >{{ getUser.name }} does not have an assigned task.</v-alert
        >
        <div class="text-center" v-else>
          <app-progress-circular color="primary" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import modalMixin from "@/mixins/modal.mixin";
import TaskList from "@/components/task/TaskList.vue";
import TaskModal from "@/components/task/TaskModal.vue";
import DeleteAlert from "@/components/modal/DeleteAlert.vue";

export default {
  props: {
    userId: {
      type: String,
      default: ""
    }
  },
  components: {
    TaskList,
    TaskModal,
    DeleteAlert
  },
  data() {
    return {
      selectedTaskId: "",
      isOpenManageTaskModal: false,
      isOpenDeleteAlert: false
    };
  },
  mixins: [modalMixin],
  computed: {
    ...mapGetters({
      getIsDeletingTask: "task/getIsDeletingTask",
      getIsLoading: "task/getIsLoading"
    }),
    getTasks() {
      return this.$store.getters["task/getTasks"]();
    },
    getUser() {
      return this.$store.getters["user/getUsers"](this.userId);
    }
  },
  async mounted() {
    await this.$store.dispatch("task/getTasks", { userId: this.userId });
  },
  methods: {
    onOpenManageTaskModal(taskId) {
      if (typeof taskId === "string") {
        this.selectedTaskId = taskId;
      } else {
        this.selectedTaskId = "";
      }
      this.isOpenManageTaskModal = true;
    },
    onOpenDeleteAlert(taskId) {
      this.selectedTaskId = taskId;
      this.isOpenDeleteAlert = true;
    },
    async onDeleteTask() {
      try {
        await this.$store.dispatch("task/deleteTask", {
          taskId: this.selectedTaskId,
          userId: this.userId
        });
        this.isOpenDeleteAlert = false;
      } catch (error) {
        //
      }
    }
  }
};
</script>
