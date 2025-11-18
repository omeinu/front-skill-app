import { db } from '~~/server/utils/db';
import { getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    
    const id = Number(getRouterParam(event, 'id'));

    return db.users.find((u) => u.id === id);
});