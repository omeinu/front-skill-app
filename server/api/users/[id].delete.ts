import { db } from '~~/server/utils/db';
import { getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));

    db.users = db.users.filter((u) => u.id !== id);

    return { success: true };
});