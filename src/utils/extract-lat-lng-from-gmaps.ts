import { LatLngTuple } from 'leaflet'

export const extractLatLngFromGoogleMapsLink = (url: string): LatLngTuple => {
  const decodedUrl = decodeURIComponent(url)

  const entityRegex = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/
  const entityMatch = decodedUrl.match(entityRegex)

  if (entityMatch && entityMatch[1] && entityMatch[2]) {
    return [parseFloat(entityMatch[1]), parseFloat(entityMatch[2])]
  }

  const queryRegex = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/
  const queryMatch = decodedUrl.match(queryRegex)

  if (queryMatch && queryMatch[1] && queryMatch[2]) {
    return [parseFloat(queryMatch[1]), parseFloat(queryMatch[2])]
  }

  const viewportRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
  const viewportMatch = decodedUrl.match(viewportRegex)

  if (viewportMatch && viewportMatch[1] && viewportMatch[2]) {
    return [parseFloat(viewportMatch[1]), parseFloat(viewportMatch[2])]
  }

  return [0, 0]
}
