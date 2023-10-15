<script setup>
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { doc } from 'firebase/firestore'
import 'leaflet/dist/leaflet.css'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import useLocation from '../composables/useLocation'
import { price } from '../helpers'

const db = useFirestore()
const route = useRoute()
const { zoom, center } = useLocation()

const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)
watch(property, (property) => {
  center.value = property.location
})

</script>

<template>
  <h1 v-if="!property" class="text-center text-h3 my-5 font-weight-bold">Property not found</h1>

  <v-card v-else flat>
    <v-card-title class="text-h4 px-0" tag="h4">
      {{ property.title }}
    </v-card-title>
    <v-img :src="property.image" width="100%" cover />
    <div class="bg-blue-grey-lighten-3 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Bathrooms:
        <strong>
          {{ property.bathrooms }}
        </strong>
      </v-card-text>
      <v-card-text>
        Parking:
        <strong>
          {{ property.parking }}
        </strong>
      </v-card-text>
      <v-card-text>
        Rooms:
        <strong>
          {{ property.rooms }}
        </strong>
      </v-card-text>
      <v-card-text>
        Price:
        <strong>
          {{ price(property.price) }}
        </strong>
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <p class="text-pre-wrap py-2">
          {{ property.description }}
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <div class="py-2" style="height: 400px">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>
                {{ property.title }}
              </LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
