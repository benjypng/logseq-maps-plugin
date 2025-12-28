import { MAP_URL_KEY, MARKER_COLOR_KEY } from '../constants'
import { MarkerProps } from '../interfaces'
import { extractLatLngFromGoogleMapsLink } from './extract-lat-lng-from-gmaps'

export const dbGetLocationsFromPage = async (pageUuid: string) => {
  const pageBlockTrees = await logseq.Editor.getPageBlocksTree(pageUuid)
  if (!pageBlockTrees) return

  const markerArr: MarkerProps[] = []

  for (const block of pageBlockTrees) {
    const prop = await logseq.Editor.getBlockProperties(block.uuid)
    if (!prop) continue

    const url = prop[MAP_URL_KEY]
    if (!url) continue

    const markerColor = prop[MARKER_COLOR_KEY] ?? 'blue'

    const latlng = extractLatLngFromGoogleMapsLink(url)

    markerArr.push({
      id: block.uuid,
      latlng: latlng,
      description: block.title,
      markerColor: markerColor,
    })
  }

  return markerArr
}
