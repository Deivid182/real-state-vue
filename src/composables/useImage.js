import { ref as storageRef } from 'firebase/storage'
import { uid } from 'uid'
import { computed } from 'vue'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const useImage = () => {
  
  const storage = useFirebaseStorage()

  const imageRef = storageRef(storage, `images/${uid()}.jpg`)

  const { url, upload } = useStorageFile(imageRef)

  function uploadImage(e) {
    const data = e.target.files[0]

    if(data) {
      upload(data)
    }
  }

  const imageUrl = computed(() => {
    return url.value ? url.value : null
  })

  return {
    url,
    uploadImage,
    imageUrl
  }
}

export default useImage