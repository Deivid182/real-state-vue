import { collection } from 'firebase/firestore'
import { computed } from 'vue'
import { useCollection, useFirestore } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  const properties = useCollection(collection(db, 'properties'))

  const price = computed(() => {
    return (price) =>
      Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
  })

  return {
    properties,
    price
  }
}
