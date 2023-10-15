import { ref } from 'vue';

export default function useLocation() {

  const zoom = ref(13)
  const center = ref([25.761681, -80.191788])


  const onMove = (e) => {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    onMove
  }
}