import { Marker, Popup, useMap } from 'react-leaflet'

import { MarkerProps } from '../interfaces'
import { svgIcon } from '../utils'

export const MapMarker = ({
  marker,
  host,
}: {
  marker: MarkerProps
  host: any
}) => {
  const map = useMap()
  return (
    <Marker
      position={marker.latlng}
      icon={svgIcon(host, 'red', 30)}
      eventHandlers={{
        click: () => {
          map.flyTo(marker.latlng, 18, {
            duration: 1.5,
          })
        },
      }}
    >
      <Popup autoClose={false}>{marker.description}</Popup>
    </Marker>
  )
}
