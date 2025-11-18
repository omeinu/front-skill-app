import { db } from '~~/server/utils/db';
import { getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    
    const id = Number(getRouterParam(event, 'id'));

    const user = db.users.find((u) => u.id === id);

    const updateUser = await readBody(event);

    if (user) {
        user.name = updateUser.name;
        user.age = updateUser.age;
    }

    return { message: 'User updated successfully' };
});