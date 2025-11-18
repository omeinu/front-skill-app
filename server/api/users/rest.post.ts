import { db } from '~~/server/utils/db';

export default defineEventHandler(() => {
  db.users = structuredClone(db.initialUsers)
  return { message: 'reset OK' }
})
