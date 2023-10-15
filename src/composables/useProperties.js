import { collection } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  const properties = useCollection(collection(db, 'properties'))
  const swimmingPool = ref(false)

  const filteredProperties = computed(() => {
    return swimmingPool.value
      ? properties.value.filter((property) => property.swimmingPool)
      : properties.value
  })

  return {
    properties,
    swimmingPool,
    filteredProperties
  }
}
