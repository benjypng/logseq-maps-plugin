import '@logseq/libs'

import { LatLngTuple, Marker as LeafletMarker } from 'leaflet'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup } from 'react-leaflet'

import { LocationProps } from '../utils/get-locations-from-page'
import { svgIcon } from '../utils/handle-icon'
import { FitBounds } from './map-handlers/fit-bounds'
import { RightClickAddMarker } from './map-handlers/right-click-add-marker'
import { SetViewOnClick } from './map-handlers/set-view-on-click'
import MapControl from './MapControl'
import SelectedTileLayer from './SelectedTileLayer'

const Map = ({
  zoom,
  centrePosition,
  uuid,
  locationsFromPage,
  defaultMarker,
}: {
  zoom: number
  centrePosition: LatLngTuple
  uuid: string
  locationsFromPage: LocationProps[]
  defaultMarker?: string
}) => {
  const [ready, setReady] = useState(false)
  const [locations, setLocations] = useState<LocationProps[]>(locationsFromPage)
  const [mapOption, setMapOption] = useState<string>('')
  const markersRef = useRef<(LeafletMarker | null)[]>([])

  const defaultMarkerOnMap = useMemo(() => {
    if (!defaultMarker) return null
    const parts = defaultMarker.split('|')
    if (parts.length !== 2) return null

    return [
      parseFloat(parts[0]!.trim()),
      parseFloat(parts[1]!.trim()),
    ] as LatLngTuple
  }, [defaultMarker])

  const host = logseq.Experiments.ensureHostScope()

  useEffect(() => {
    if (ready) return
    let mounted = true

    const load = async () => {
      if (!host.L) {
        await logseq.Experiments.loadScripts('../../leaflet/leaflet.js')
        await new Promise((r) => setTimeout(r, 50))
      }
       
      if (mounted) setReady(true)
    }

    load()
    return () => {
      mounted = false
    }
  }, [ready, host.L])

  if (!ready) {
    return <strong>Loading Leaflet...</strong>
  } else {
    return (
      <>
        <MapContainer
          zoom={zoom}
          center={centrePosition}
          scrollWheelZoom={false}
          dragging={true}
          style={{ height: '400px', width: '83vh', zIndex: 0 }}
        >
          <SelectedTileLayer mapOption={mapOption} />
          {defaultMarkerOnMap && (
            <Marker
              position={defaultMarkerOnMap}
              icon={svgIcon(host, 'blue', 30)}
            />
          )}
          {locations.map((location, index) => (
            <Marker
              key={location.id}
              position={location.coords}
              ref={(el) => {
                markersRef.current[index] = el
              }}
              icon={svgIcon(host, location['marker-color'], 30)}
            >
              <Popup autoClose={false}>{location.description}</Popup>
            </Marker>
          ))}
          <RightClickAddMarker uuid={uuid} setLocations={setLocations} />
          <FitBounds locations={locations} />
          <SetViewOnClick />
        </MapContainer>
        <MapControl
          setMapOption={setMapOption}
          markersRef={markersRef}
          setLocations={setLocations}
          uuid={uuid}
        />
      </>
    )
  }
}

export default Map
