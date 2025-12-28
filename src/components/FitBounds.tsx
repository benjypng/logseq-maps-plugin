import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { MarkerProps } from '../interfaces'

export const FitBounds = ({
  markers,
}: {
  markers: MarkerProps[] | undefined
}) => {
  const map = useMap()
  useEffect(() => {
    if (!markers || markers.length === 0) return
    const coordinates = markers.map((marker) => marker.latlng)
    map.fitBounds(coordinates, {
      padding: [50, 50],
      maxZoom: 15,
    })
  }, [markers, map])
  return null
}
