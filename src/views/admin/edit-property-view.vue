<script setup>
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { doc, updateDoc } from 'firebase/firestore'
import 'leaflet/dist/leaflet.css'
import { useField, useForm } from 'vee-validate'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import useImage from '../../composables/useImage'
import useLocation from '../../composables/useLocation'
import { validationSchema } from '../../validations/property-schema'

const items = [1, 2, 3, 4, 5]

const router = useRouter()
const route = useRoute()
const { imageUrl, uploadImage, url } = useImage()
const { zoom, center, onMove } = useLocation()

const { handleSubmit } = useForm({ validationSchema })

const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

const title = useField('title')
const image = useField('image')
const description = useField('description')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const parking = useField('parking')
const swimmingPool = useField('swimmingPool')

watch(property, (property) => {
  title.value.value = property.title
  description.value.value = property.description
  price.value.value = property.price
  rooms.value.value = property.rooms
  bathrooms.value.value = property.bathrooms
  parking.value.value = property.parking
  swimmingPool.value.value = property.swimmingPool
  center.value = property.location
})

const onSubmit = handleSubmit(async (values) => {
  // eslint-disable-next-line no-unused-vars
  const { image, ...rest } = values

  if(imageUrl.value) {
    const data = {
      ...rest,
      image: url.value,
      location: center.value,
    }

    await updateDoc(docRef, data)
  } else {
    const data = {
      ...rest,
      location: center.value,
    }

    await updateDoc(docRef, data)
  }

  router.push({ name: 'properties' })
})

</script>
<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h4 px-0" tag="h4"> Edit Property </v-card-title>
    <v-card-subtitle class="text-h5 px-0 py-4" tag="h5">
      Edit a property by filling out the form below
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
        @change="uploadImage"
      />

      <div class="my-5">
        <p class="font-weight-bold">Current image:</p>
        <img class="w-50" :src="imageUrl ? imageUrl : property?.image" alt="property image" />
      </div>

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

      <v-checkbox v-model="swimmingPool.value.value" label="Swimming Pool" />

      <div class="pt-2 pb-6 map-container">
        <h2>Location</h2>
        <div style="height: 600px; width: 800px">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker @moveend="onMove" :lat-lng="center" draggable />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn @click="onSubmit" color="pink-accent-3" block> Save changes </v-btn>
    </v-form>
  </v-card>
</template>

<style>
.map-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
