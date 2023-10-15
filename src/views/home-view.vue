<script setup>
import Property from '../components/property.vue';
import useProperties from '../composables/useProperties';

const { swimmingPool, filteredProperties } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 my-5 font-weight-bold">Our Properties</h1>
  <v-card
    flat
    class="py-10"
  >
    <v-card-title class="text-h5 px-0" tag="h5">
      Search by swimming pool
      <v-checkbox v-model="swimmingPool" />
    </v-card-title>

    <v-row>
      <Property
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
      />
    </v-row>
  </v-card>
</template>
