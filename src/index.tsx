import '@logseq/libs'

import { createRoot } from 'react-dom/client'

import { DBMap } from './components/DBMap'
import Map from './components/Map'
import css from './leaflet.css?raw'
import { settings } from './settings'
import { getPageUuidFromBlockUuid } from './utils'
import { getCentrePosition } from './utils/get-centre-position'
import { getLocationsFromPage } from './utils/get-locations-from-page'

const main = async () => {
  await logseq.UI.showMsg('logseq-maps-plugin loaded')
  logseq.provideStyle(css)

  const isDbGraph = await logseq.App.checkCurrentIsDbGraph()

  if (isDbGraph) {
    logseq.App.registerCommandPalette(
      {
        key: 'logseq-maps-plugin-create-required-tag-and-props',
        label: 'logseq-maps-plugin: Create required tag and props',
      },
      async () => {
        const tag = await logseq.Editor.createTag(
          logseq.settings?.locationTag as string,
        )
        const mapUrlPropPage = await logseq.Editor.getProperty('map-url')
        if (!mapUrlPropPage) {
          await logseq.Editor.upsertProperty('map-url', {
            type: 'url',
            cardinality: 'one',
            hide: false,
            public: true,
          })
        }
        const markerColorPropPage =
          await logseq.Editor.getProperty('marker-color')
        if (!markerColorPropPage) {
          await logseq.Editor.upsertProperty('marker-color', {
            type: 'default',
            cardinality: 'one',
            hide: false,
            public: true,
          })
        }
        if (tag && mapUrlPropPage && markerColorPropPage) {
          await logseq.Editor.addTagProperty(tag.uuid, mapUrlPropPage.uuid)
          await logseq.Editor.addTagProperty(tag.uuid, markerColorPropPage.uuid)
        }
      },
    )

    logseq.Editor.registerSlashCommand('Map: Add map container', async (e) => {
      await logseq.Editor.insertAtEditingCursor(`{{renderer :dbmap_${e.uuid}}}`)
    })

    const getStableMapId = (uuid: string, slot: string): string => {
      const slotEl = parent.document.getElementById(slot)
      if (slotEl?.closest('#right-sidebar')) {
        return `map_${uuid}_sidebar`
      }
      return `map_${uuid}_main`
    }

    logseq.App.onMacroRendererSlotted(
      async ({ slot, payload: { uuid, arguments: args } }) => {
        const [type] = args
        if (!type || !type.startsWith(':dbmap_')) return
        // slot is not used in id to prevent flickering. however this means that the map cannot load in the sidebar
        const mapId = getStableMapId(uuid, slot)
        const existingEl = parent.document.getElementById(mapId)
        if (!existingEl) {
          logseq.provideUI({
            key: mapId,
            slot,
            reset: true,
            template: `<div id="${mapId}" style="width: 100%; height: 400px;"></div>`,
          })
        }
        const pageUuid = await getPageUuidFromBlockUuid(uuid)
        if (!pageUuid) return

        setTimeout(async () => {
          const el = parent.document.getElementById(mapId)
          if (!el || !el.isConnected) return
          let root = (el as any)._reactRoot
          if (!root) {
            root = createRoot(el)
            ;(el as any)._reactRoot = root
          }
          root.render(<DBMap pageUuid={pageUuid} />)
        }, 0)
      },
    )
  } else {
    logseq.Editor.registerSlashCommand('Add map', async (e) => {
      await logseq.Editor.insertAtEditingCursor(
        `{{renderer :map_${e.uuid}, ${logseq.settings?.defaultZoom}, ${logseq.settings?.defaultLocation}}}`,
      )
    })

    logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
      const uuid = payload.uuid
      const [type, zoom, defaultLocation, defaultMarker] = payload.arguments
      if (!type || !type.startsWith(':map') || !zoom || !defaultLocation) return

      // Note:
      // defaultMarker is optional
      // defaultLocation is either a place, or latlng separated by a pipe
      const centrePosition = await getCentrePosition(defaultLocation)

      const mapId = `map_${uuid}`

      const locationsFromPage = await getLocationsFromPage(uuid)

      const existingEl = parent.document.getElementById(mapId)

      if (!existingEl) {
        logseq.provideUI({
          key: mapId,
          slot,
          reset: true,
          template: `<div id="${mapId}"></div>`,
        })
      }

      setTimeout(() => {
        const el = parent.document.getElementById(mapId)
        if (!el || !el.isConnected) return
        let root = (el as any)._reactRoot
        if (!root) {
          root = createRoot(el)
          ;(el as any)._reactRoot = root
        }
        root.render(
          <Map
            zoom={parseFloat(zoom)}
            centrePosition={centrePosition}
            uuid={uuid}
            locationsFromPage={locationsFromPage}
            defaultMarker={defaultMarker}
          />,
        )
      }, 0)
    })
  }
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
