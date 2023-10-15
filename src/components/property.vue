<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { price } from '../helpers';

defineProps({
  property: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <v-col cols="12" sm="6" md="4" lg="3">
    <v-card>
      <v-img
        :src="property.image"
      />
      <v-card-title class="text-h6">
        {{ property.title }}
      </v-card-title>
      <v-card-text
        class="text-truncate"
      >
        {{ property.description }}
      </v-card-text>
      <v-card-text
        class="text-h5 font-weight-bold"
      >
        Price: {{ price(property.price) }}
      </v-card-text>
      <template v-slot:actions>
        <v-btn
          style="cursor: pointer;"
          block
          color="info"
          variant="outlined"
          :to="{ name: 'property', params: { id: property.id } }"
        >
          View details
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>


<style scoped>

</style>