import type { User } from '~/types/user';


const initialUsers: User[] = [
    { id: 1, name: 'アーノルド・シュワルツェネッガー', age: 73 },
    { id: 2, name: 'シルヴェスター・スタローン', age: 74 },
    { id: 3, name: 'ドウェイン・ジョンソン', age: 49 },
    { id: 4, name: 'ヒロミ・フジワラ', age: 33 }
]

declare global {
    var __db: {
        users: User[]
        initialUsers: User[]
    } | undefined;
}

if (!global.__db) {
    globalThis.__db = {
        users: structuredClone(initialUsers),
        initialUsers: structuredClone(initialUsers),
    };
}

export const db = globalThis.__db!
