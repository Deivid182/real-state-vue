<script setup>
import useProperties from '../../composables/useProperties';

const { properties, price } = useProperties()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
  <v-btn
    variant="flat"
    color="blue"
    :to="{ name: 'new-property' }"
  >
    New Property
  </v-btn>
  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item
        v-for="property in properties"
        :key="property.id"
        class="my-5 border-b"
      >
        <template v-slot:prepend>
          <v-list-item-media start>
            <img 
              style="object-fit: contain;"
              width="200" height="200" :src="property.image" />
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ price(property.price) }}</v-list-item-subtitle>
        <template v-slot:append>
            <v-btn
              color="info"
              flat
              class="mr-2"
            >
              Edit
            </v-btn>
            <v-btn
              color="red-darken-1"
              flat
            >
              Delete
            </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>