import '@logseq/libs'

import { MapContainer, TileLayer } from 'react-leaflet'

import { MarkerProps } from '../interfaces'
import { FitBounds, MapMarker } from '.'
import { useLeaflet } from './hooks/useLeaflet'
import { usePageMarkers } from './hooks/usePageMarkers'
import { SetViewOnClick } from './map-handlers/set-view-on-click'

export const DBMap = ({ pageUuid }: { pageUuid: string }) => {
  const host = logseq.Experiments.ensureHostScope()
  const ready = useLeaflet(host)
  const markerArr = usePageMarkers(pageUuid)

  if (!ready) {
    return <strong>Loading Leaflet...</strong>
  }

  return (
    <MapContainer
      center={[1.35, 103.82]}
      zoom={15}
      scrollWheelZoom={false}
      dragging={true}
      style={{ height: '400px', width: '83vh', zIndex: 0 }}
    >
      {markerArr && <FitBounds markers={markerArr} />}
      {markerArr?.map((marker: MarkerProps) => (
        <MapMarker
          key={marker.id}
          marker={marker}
          host={host}
          markerColor={marker.markerColor}
        />
      ))}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={
          (logseq.settings?.defaultMapUrl as string) ||
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      />
      <SetViewOnClick />
    </MapContainer>
  )
}
