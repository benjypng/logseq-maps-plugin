import { BlockIdentity } from '@logseq/libs/dist/LSPlugin.user'

export const getPageUuidFromBlockUuid = async (blockUuid: BlockIdentity) => {
  const block = await logseq.Editor.getBlock(blockUuid)
  if (!block || !block.page) return

  const page = await logseq.Editor.getPage(block.page.id)
  if (!page) return

  return page.uuid
}
