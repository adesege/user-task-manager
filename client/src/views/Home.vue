<template>
  <v-layout>
    <v-flex>
      <view-task-modal
        v-if="isOpenViewTaskModal"
        v-model="isOpenViewTaskModal"
        :user-id="selectedUserId"
      />
      <user-modal
        v-if="isOpenUserModal"
        v-model="isOpenUserModal"
        :user-id="selectedUserId"
      />
      <delete-alert
        v-if="isOpenDeleteAlert"
        v-model="isOpenDeleteAlert"
        :is-loading="getIsDeletingUser"
        @onDelete="onDeleteUser"
      />
      <v-data-table
        :headers="headers"
        :items="getUsers"
        :items-per-page="20"
        :loading="getIsLoading"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>User's List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onOpenAddUserModal">Add user</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <span class="text-cursor" @click="onOpenViewTaskModal(item.id)">{{
            item.name
          }}</span>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ dateWithoutYear(item.createdAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn text icon @click="onOpenViewTaskModal(item.id)"
            ><v-icon>mdi-format-list-checks</v-icon></v-btn
          >
          <v-btn text icon @click="onOpenEditUser(item.id)"
            ><v-icon>mdi-account-edit</v-icon></v-btn
          >
          <v-btn text icon @click="onOpenDeleteAlert(item.id)"
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import UserModal from "@/components/modal/UserModal.vue";
import DeleteAlert from "@/components/modal/DeleteAlert.vue";
import ViewTaskModal from "@/components/task/ViewTaskModal.vue";
import helperMixin from "@/mixins/helper.mixin";

export default {
  components: {
    UserModal,
    DeleteAlert,
    ViewTaskModal
  },
  mixins: [helperMixin],
  data() {
    return {
      selectedUserId: "",
      isOpenUserModal: false,
      isOpenDeleteAlert: false,
      isOpenViewTaskModal: false,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Added on",
          align: "left",
          sortable: false,
          value: "createdAt"
        },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getIsDeletingUser: "user/getIsDeletingUser",
      getIsLoading: "user/getIsLoading"
    }),
    getUsers() {
      return this.$store.getters["user/getUsers"]();
    }
  },
  async mounted() {
    await this.$store.dispatch("user/getUsers");
  },
  methods: {
    onOpenEditUser(userId) {
      this.selectedUserId = userId;
      this.onOpenUserModal();
    },
    onOpenUserModal() {
      this.isOpenUserModal = true;
    },
    onOpenAddUserModal() {
      this.selectedUserId = "";
      this.onOpenUserModal();
    },
    onOpenViewTaskModal(userId) {
      this.selectedUserId = userId;
      this.isOpenViewTaskModal = true;
    },
    onOpenDeleteAlert(userId) {
      this.isOpenDeleteAlert = true;
      this.selectedUserId = userId;
    },
    async onDeleteUser() {
      try {
        await this.$store.dispatch("user/deleteUser", {
          userId: this.selectedUserId
        });
        this.isOpenDeleteAlert = false;
      } catch (error) {
        //
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-cursor {
  cursor: pointer;
}
</style>
