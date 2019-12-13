<template>
  <v-card height="100%">
    <v-card-text>
      <div :class="['caption', getStateClass]">
        {{ item.state }} - {{ dateWithoutYear(item.updatedAt) }}
      </div>
      <div class="text--primary">{{ item.description }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text size="16" icon color="primary" @click="onOpenEditTaskModal">
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn text size="16" icon color="error" @click="onOpenDeleteTaskModal">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import helperMixin from "@/mixins/helper.mixin";

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [helperMixin],
  computed: {
    getStateClass() {
      const color = {
        todo: "secondary",
        done: "success"
      };
      return `${color[this.item.state]}--text`;
    }
  },
  methods: {
    onOpenEditTaskModal() {
      this.$emit("editTask", this.item.id);
    },
    onOpenDeleteTaskModal() {
      this.$emit("deleteTask", this.item.id);
    }
  }
};
</script>
