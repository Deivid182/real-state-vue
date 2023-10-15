import { collection, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { computed, ref } from 'vue'
import { useCollection, useFirebaseStorage, useFirestore } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  const storage = useFirebaseStorage()
  const properties = useCollection(collection(db, 'properties'))
  const swimmingPool = ref(false)

  const deleteProperty = async (id, url) => {
    
    if(confirm('Are you sure you want to delete this property?')) {
      const docRef = doc(db, 'properties', id)
    
      const imageRef = storageRef(storage, url)

      const promises = [
        deleteDoc(docRef),
        deleteObject(imageRef)
      ]

      await Promise.all(promises)

    }
  }

  const filteredProperties = computed(() => {
    return swimmingPool.value
      ? properties.value.filter((property) => property.swimmingPool)
      : properties.value
  })

  return {
    properties,
    swimmingPool,
    filteredProperties,
    deleteProperty
  }
}
