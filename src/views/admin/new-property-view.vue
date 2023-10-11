<script setup>
import { useField, useForm } from 'vee-validate';
import { imageSchema, validationSchema } from '../../validations/property-schema';

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const title = useField('title')
const image = useField('image')
const description = useField('description')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parking = useField('parking')
const swimmingPool = useField('swimmingPool')

const submit = handleSubmit((values) => {
  console.log(values)
})

const items = [1, 2, 3, 4, 5]
</script>
<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h4 px-0" tag="h4"> New Property </v-card-title>
    <v-card-subtitle class="text-h5 px-0 py-4" tag="h5">
      Create a new property by filling out the form below
    </v-card-subtitle>

    <v-form class="my-10">
      <v-text-field
        class="mb-5"
        label="Title"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />

      <v-file-input
        accept="image/png, image/jpeg, image/jpg"
        label="Photo"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
      />

      <v-text-field
        class="mb-5"
        label="Price"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
            class="mb-5"
            :items="items"
            label="Rooms"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="bathrooms.value.value"
            :error-messages="bathrooms.errorMessage.value"
            class="mb-5"
            label="Bathrooms"
            :items="items"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="parking.value.value"
            :error-messages="parking.errorMessage.value"
            class="mb-5"
            label="Parking Spaces"
            :items="items"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        class="mb-5"
        label="Description"
      ></v-textarea>

      <v-checkbox 
        v-model="swimmingPool.value.value"
        label="Swimming Pool" />

      <v-btn 
        @click="submit"
        color="pink-accent-3" block> Add Property </v-btn>
    </v-form>
  </v-card>
</template>
