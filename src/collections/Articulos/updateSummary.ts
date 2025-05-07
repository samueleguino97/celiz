import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const updateSummary: CollectionAfterReadHook = async ({ doc }) => {
  if (doc?.content) {
    doc.summary = doc.content.root.children[0].children?.map((c: any) => c.text).join(' ')

    return doc
  }
}
