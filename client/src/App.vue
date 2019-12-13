<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon width="auto" text>
        <app-logo></app-logo>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <v-container fill-height>
        <router-view />
        <notification />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppLogo from "@/components/app/AppLogo.vue";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    Notification,
    AppLogo
  }
};
</script>
