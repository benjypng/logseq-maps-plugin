import { useEffect, useState } from 'react'

import { MarkerProps } from '../../interfaces'
import { dbGetLocationsFromPage } from '../../utils'

export const usePageMarkers = (pageUuid: string) => {
  const [markerArr, setMarkerArr] = useState<MarkerProps[]>()

  useEffect(() => {
    if (!pageUuid) return
    const fetchMarkers = async () => {
      const locationArr = await dbGetLocationsFromPage(pageUuid)
      if (locationArr) setMarkerArr(locationArr)
    }
    fetchMarkers()
    const unsubscribe = logseq.DB.onBlockChanged(pageUuid, fetchMarkers)
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [pageUuid])

  return markerArr
}
