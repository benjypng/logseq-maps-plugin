import '@logseq/libs'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import { MarkerProps } from '../interfaces'
import { dbGetLocationsFromPage, getPageUuidFromBlockUuid } from '../utils'
import { FitBounds, MapMarker } from '.'
import { SetViewOnClick } from './map-handlers/set-view-on-click'

export const DBMap = ({
  pageUuid,
  blockUuid,
}: {
  pageUuid: string
  blockUuid: string
}) => {
  const [ready, setReady] = useState(false)
  const [markerArr, setMarkerArr] = useState<MarkerProps[]>()

  // Load leaflet
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
  }, [ready])

  // Load page locations
  useEffect(() => {
    const renderMarkers = async () => {
      const locationArr = await dbGetLocationsFromPage(pageUuid)
      if (!locationArr) return
      setMarkerArr(locationArr)
    }
    renderMarkers()
  }, [])

  useEffect(() => {
    let unsubscribe: any
    const setupListener = async () => {
      const pageUuid = await getPageUuidFromBlockUuid(blockUuid)
      if (!pageUuid) return

      unsubscribe = logseq.DB.onBlockChanged(pageUuid, async () => {
        const locationArr = await dbGetLocationsFromPage(pageUuid)
        if (!locationArr) return
        setMarkerArr(locationArr)
      })
    }
    setupListener()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [blockUuid])

  if (!ready) {
    return <strong>Loading Leaflet...</strong>
  } else {
    return (
      <>
        <MapContainer
          center={[1.35, 103.82]}
          zoom={15}
          scrollWheelZoom={false}
          dragging={true}
          style={{ height: '400px', width: '83vh', zIndex: 0 }}
        >
          {markerArr && <FitBounds markers={markerArr} />}
          {markerArr &&
            markerArr.map((marker: MarkerProps) => (
              <MapMarker key={marker.id} marker={marker} host={host} />
            ))}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={logseq.settings!.defaultMapUrl as string}
          />
          <SetViewOnClick />
        </MapContainer>
      </>
    )
  }
}
