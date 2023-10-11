<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <v-card
    max-width="1440px"
    class="mx-auto"
  >
    <v-layout>
      <v-app-bar
        class="px-4"
        color="blue-darken-1"
      >
        <template v-slot:prepend>
          <v-btn
            :to="{ name: 'home' }"
          >
            Real Estate
          </v-btn>
        </template>
        <template v-slot:append>
          <v-btn
            :to="{ name: 'home' }"
            class="mr-4"
          >
            Home
          </v-btn>
          <v-btn
            :to="{ name: 'login' }"
          >
            Log in
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>