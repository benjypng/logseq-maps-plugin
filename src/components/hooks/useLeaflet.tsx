import { useEffect, useState } from 'react'

export const useLeaflet = (host: any) => {
  const [ready, setReady] = useState(!!host.L)

  useEffect(() => {
    if (ready) return
    let mounted = true
    const load = async () => {
      if (!host.L) {
        await logseq.Experiments.loadScripts('../../../leaflet/leaflet.js')
        await new Promise((r) => setTimeout(r, 50))
      }
       
      if (mounted) setReady(true)
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return ready
}
