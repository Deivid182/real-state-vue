<script setup>
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '../stores/auth';
import { loginSchema } from '../validations/login-schema';

const { handleSubmit } = useForm({ validationSchema: loginSchema })
const email = useField('email')
const password = useField('password')
const authStore = useAuthStore()

const onSubmit = handleSubmit((values) => {
  authStore.login({ email: values.email, password: values.password })
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto">
    <v-card-title class="text-h4 px-0" tag="h4"> Login </v-card-title>
    <v-card-subtitle class="text-h5 px-0 py-4" tag="h5"> to your account </v-card-subtitle>
    <v-alert
      v-if="authStore.hasError"
      class="my-5"
      type="error"
      :title="authStore.errorMsg"
    ></v-alert>
    <v-form class="py-4">
      <v-text-field
        v-model="email.value.value"
        label="Email"
        type="email"
        class="mb-4"
        placeholder="john@example.com"
        bg-color="blue-grey-darken-1"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        v-model="password.value.value"
        label="Password"
        type="password"
        class="mb-4"
        bg-color="blue-grey-darken-1"
        :error-messages="password.errorMessage.value"
      />
      <v-btn @click="onSubmit" block color="pink-accent-3"> Login </v-btn>
    </v-form>
  </v-card>
</template>
