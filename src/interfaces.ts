import { LatLngTuple } from 'leaflet'

export interface MarkerProps {
  id: string
  description: string
  latlng: LatLngTuple
  markerColor: string
}
