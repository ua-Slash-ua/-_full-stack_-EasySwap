import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePageHook: CollectionAfterChangeHook = async ({ doc }) => {
  revalidatePath('/')
  return doc
}