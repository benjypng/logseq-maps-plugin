import { defineConfig } from 'vite'
import logseqDevPlugin from 'vite-plugin-logseq'

export default defineConfig(async () => {
  return {
    plugins: [logseqDevPlugin()],
  }
})
