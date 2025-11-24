import { db } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
    
    const newUser = await readBody(event);
    const newId = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
    newUser.id = newId;
    db.users.push(newUser);

    return { message: 'User created successfully' };
});