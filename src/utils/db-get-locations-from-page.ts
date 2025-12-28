import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'

import { MarkerProps } from '../interfaces'
import { extractLatLngFromGoogleMapsLink } from './extract-lat-lng-from-gmaps'

export const dbGetLocationsFromPage = async (pageUuid: string) => {
  const pageBlockTrees = await logseq.Editor.getPageBlocksTree(pageUuid)
  if (!pageBlockTrees) return

  const markerArr: MarkerProps[] = []

  for (const block of pageBlockTrees) {
    if (!block.children) continue
    if (block.children && block.children.length === 0) continue
    const blockChildren = block.children as BlockEntity[]
    const url = blockChildren[0]?.title
    if (!url) continue
    const latlng = extractLatLngFromGoogleMapsLink(url)
    markerArr.push({
      id: block.uuid,
      latlng: latlng,
      description: block.title,
    })
  }

  return markerArr
}
